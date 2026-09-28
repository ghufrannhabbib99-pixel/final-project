const { GoogleGenAI } = require("@google/genai");

const productService = require("../products/product.service");
const artisanService = require("../artisans/artisan.service");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

/*
========================================
PRODUCT CONTEXT
========================================
*/

const buildProductContext = (products) => {
  if (!products || products.length === 0) {
    return "لا توجد منتجات مطابقة حاليًا.";
  }

  return products
    .map((product) => {
      return `
- رقم المنتج: ${product.id}
- اسم المنتج: ${product.name || "غير محدد"}
- الوصف: ${product.description || "لا يوجد وصف"}
- السعر: ${product.price ?? "غير محدد"}
- المخزون: ${product.stock_quantity ?? "غير محدد"}
- الحرفي: ${product.craft_name || "غير محدد"}
- التصنيف: ${product.category_name || "غير محدد"}
`;
    })
    .join("\n");
};

/*
========================================
ARTISAN CONTEXT
========================================
*/

const buildArtisanContext = (artisans) => {
  if (!artisans || artisans.length === 0) {
    return "لا يوجد حرفيون مطابقون حاليًا.";
  }

  return artisans
    .map((artisan) => {
      return `
- رقم الحرفي: ${artisan.id}
- اسم الحرفي: ${artisan.artisan_name || "غير محدد"}
- نوع الحرفة: ${artisan.craft_name || "غير محدد"}
- المدينة: ${artisan.city || "غير محددة"}
- سنوات الخبرة: ${artisan.experience_years ?? "غير محددة"}
- النبذة: ${artisan.bio || "لا توجد نبذة"}
- القصة: ${artisan.story || "لا توجد قصة"}
- التخصصات: ${artisan.specialties || "غير محددة"}
- أسلوب العمل: ${artisan.work_style || "غير محدد"}
`;
    })
    .join("\n");
};

/*
========================================
PRODUCT SEARCH FILTERS
========================================
*/

const extractSearchFilters = (message) => {
  const filters = {
    search: undefined,
    maxPrice: undefined,
    category: undefined,
  };

  /*
  استخراج الميزانية

  أمثلة:
  50000
  ميزانية 50000
  أقل من 50000
  بحدود 50 ألف
  عندي 50 ألف
  */

  const priceMatch = message.match(
    /(?:أقل من|اقل من|بحدود|حدود|ميزانيتي|ميزانية|بسعر|سعر|عندي)\s*(\d+(?:[.,]\d+)?)\s*(ألف|الف|دينار|د\.ع)?/i
  );

  if (priceMatch) {
    let price = Number(
      priceMatch[1].replace(",", ".")
    );

    const unit = priceMatch[2];

    if (unit === "ألف" || unit === "الف") {
      price *= 1000;
    }

    filters.maxPrice = price;
  }

  /*
  إزالة جملة الميزانية من النص
  */

  let cleanedMessage = message;

  cleanedMessage = cleanedMessage.replace(
    /(?:أقل من|اقل من|بحدود|حدود|ميزانيتي|ميزانية|بسعر|سعر|عندي)\s*\d+(?:[.,]\d+)?\s*(?:ألف|الف|دينار|د\.ع)?/gi,
    ""
  );

  /*
  الكلمات العامة التي لا نريد البحث عنها
  */

  const ignoredWords = [
    "أريد",
    "اريد",
    "أريدلي",
    "اريدلي",
    "أريد أن",
    "اريد ان",
    "شي",
    "شيء",
    "منتج",
    "منتجات",
    "هدية",
    "هديه",
    "هدايا",
    "مميز",
    "مميزة",
    "مناسب",
    "مناسبة",
    "مناسبه",
    "حلو",
    "حلوة",
    "حلوه",
    "جيد",
    "زين",
    "رخيص",
    "غالي",
    "عراقي",
    "عراقية",
    "عراقيه",
    "تراثي",
    "تراثية",
    "تراثيه",
    "من",
    "في",
    "بـ",
    "ب",
    "حسب",
    "ضمن",
    "إلى",
    "الى",
    "عندي",
    "ميزانية",
    "ميزانيتي",
  ];

  let words = cleanedMessage
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  words = words.filter((word) => {
    const normalizedWord = word
      .replace(/[؟?!.,،]/g, "")
      .trim();

    return (
      normalizedWord.length > 1 &&
      !ignoredWords.includes(normalizedWord)
    );
  });

  if (words.length > 0) {
    filters.search = words.join(" ");
  }

  if (
    !filters.search ||
    filters.search.trim().length < 2
  ) {
    filters.search = undefined;
  }

  return filters;
};

/*
========================================
ARTISAN SEARCH FILTERS
========================================
*/

const extractArtisanFilters = (message) => {
  const filters = {
    search: undefined,
    city: undefined,
    craft: undefined,
  };

  /*
  المدن المدعومة
  */

  const cities = [
    "البصرة",
    "بغداد",
    "الموصل",
    "أربيل",
    "النجف",
    "كربلاء",
    "كركوك",
    "الحلة",
    "الناصرية",
    "السماوة",
    "العمارة",
    "الديوانية",
    "دهوك",
    "السليمانية",
    "الأنبار",
  ];

  const foundCity = cities.find((city) =>
    message.includes(city)
  );

  if (foundCity) {
    filters.city = foundCity;
  }

  /*
  أنواع الحرف
  */

  const craftKeywords = [
    "نجار",
    "نجارة",
    "خشب",
    "خياطة",
    "خياط",
    "نسيج",
    "فخار",
    "فخاري",
    "سعف",
    "نحاس",
    "حداد",
    "جلد",
    "جلود",
    "فضة",
    "صياغة",
    "صائغ",
    "سجاد",
    "تطريز",
    "حياكة",
    "خزف",
  ];

  const foundCraft = craftKeywords.find((craft) =>
    message.includes(craft)
  );

  if (foundCraft) {
    filters.craft = foundCraft;
  }

  /*
  كلمات لا نريد إرسالها كبحث
  */

  const ignoredWords = [
    "أريد",
    "اريد",
    "أريدلي",
    "اريدلي",
    "حرفي",
    "حرفيين",
    "حرفية",
    "صانع",
    "صناع",
    "فنان",
    "فنانين",
    "مناسب",
    "مناسبة",
    "من",
    "في",
    "عن",
    "أبحث",
    "ابحث",
    "أدور",
    "ادور",
    "لي",
    "إلي",
    "الي",
    "مدينة",
    "مدينه",
  ];

  let words = message
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  words = words.filter((word) => {
    const normalizedWord = word
      .replace(/[؟?!.,،]/g, "")
      .trim();

    return (
      normalizedWord.length > 1 &&
      !ignoredWords.includes(normalizedWord) &&
      !cities.includes(normalizedWord) &&
      !craftKeywords.includes(normalizedWord)
    );
  });

  if (words.length > 0) {
    filters.search = words.join(" ");
  }

  return filters;
};

/*
========================================
AI CHAT
========================================
*/

async function chatWithAI(message, history = []) {
  /*
  استخراج فلاتر المنتجات
  */

  const filters = extractSearchFilters(message);

  console.log("AI Search Filters:", filters);

  /*
  ========================================
  SEARCH PRODUCTS
  ========================================
  */

  let products = [];

  try {
    products =
      await productService.searchProductsForAI({
        search: filters.search,
        maxPrice: filters.maxPrice,
        category: filters.category,
        limit: 10,
      });
  } catch (error) {
    console.error(
      "AI Product Search Error:",
      error.message
    );

    products = [];
  }

  /*
  ========================================
  SEARCH ARTISANS
  ========================================
  */

  let artisans = [];

  const artisanKeywords = [
    "حرفي",
    "حرفيين",
    "حرفية",
    "صانع",
    "صناع",
    "فنان",
    "فنانين",
    "نجار",
    "نجارة",
    "خياط",
    "خياطة",
    "فخار",
    "نسيج",
    "سجاد",
    "تطريز",
    "حياكة",
    "سعف",
    "نحاس",
    "حداد",
    "جلد",
    "فضة",
    "صائغ",
    "حرف",
  ];

  const asksAboutArtisans =
    artisanKeywords.some((keyword) =>
      message.includes(keyword)
    );

  if (asksAboutArtisans) {
    try {
      const artisanFilters =
        extractArtisanFilters(message);

      console.log(
        "AI Artisan Filters:",
        artisanFilters
      );

      artisans =
        await artisanService.searchArtisansForAI({
          search: artisanFilters.search,
          city: artisanFilters.city,
          craft: artisanFilters.craft,
          limit: 10,
        });
    } catch (error) {
      console.error(
        "AI Artisan Search Error:",
        error.message
      );

      artisans = [];
    }
  }

  /*
  ========================================
  BUILD CONTEXT
  ========================================
  */

  const productContext =
    buildProductContext(products);

  const artisanContext =
    buildArtisanContext(artisans);

  /*
  ========================================
  SYSTEM INSTRUCTION
  ========================================
  */

  const systemInstruction = `
أنت مساعد الذكاء الاصطناعي الرسمي لمنصة "الحرفا" العراقية.

أنت تساعد المستخدم في:
- اكتشاف المنتجات الحرفية.
- اقتراح الهدايا.
- البحث حسب الميزانية.
- البحث حسب نوع الحرفة.
- البحث عن الحرفيين.
- معرفة المدن والتخصصات والخبرات.
- مساعدة المستخدم في اختيار منتج مناسب.

========================
نتائج المنتجات
========================

${productContext}

========================
نتائج الحرفيين
========================

${artisanContext}

========================
القواعد
========================

1. اعتمد على بيانات المنتجات والحرفيين الموجودة أعلاه.

2. لا تخترع منتجًا أو حرفيًا أو سعرًا أو مدينة أو خبرة غير موجودة.

3. إذا لم توجد منتجات مناسبة، قل:
"ما لكيت حاليًا شيء مطابق ضمن المنتجات المتوفرة بالحرفا."

4. إذا طلب المستخدم هدية ولم يحدد ميزانية، يمكنك سؤاله عن الميزانية.

5. إذا حدد المستخدم ميزانية، اقترح المنتجات الموجودة ضمن هذه الميزانية فقط.

6. لا تقترح منتجًا مخزونه صفر.

7. إذا سأل المستخدم عن حرفي، اعتمد على بيانات الحرفيين الموجودة.

8. إذا طلب المستخدم حرفيًا من مدينة أو حسب نوع حرفة، استخدم فقط الحرفيين المطابقين للبحث.

9. لا تعرض البريد الإلكتروني أو المعلومات الحساسة.

10. إذا كان السؤال عامًا عن التراث أو الحرف العراقية، يمكنك إعطاء معلومات عامة.

11. لا تنسب أي منتج أو حرفي إلى الحرفا إلا إذا كان موجودًا في البيانات.

12. استخدم اللغة العربية.

13. إذا كان المستخدم يتحدث باللهجة العراقية، يمكنك الرد باللهجة العراقية.

14. خلي الرد طبيعي ومختصر ومفيد.

15. إذا توجد عدة خيارات، اعرضها بنقاط واضحة.

16. لا تسرد قاعدة البيانات كاملة.

17. لا تشرح للمستخدم تفاصيل البحث الداخلي.

18. إذا لم تجد تطابقًا حقيقيًا، لا تخترع نتيجة.

19. إذا كانت نتائج المنتجات فارغة، أخبر المستخدم بذلك واسأله عن نوع الحرفة أو الميزانية أو نوع المنتج.

20. إذا كانت نتائج الحرفيين فارغة، أخبر المستخدم بأنه لا يوجد تطابق حاليًا ضمن الحرفيين المتوفرين.

21. عند عرض المنتجات، اذكر الاسم والسعر ونوع الحرفة أو التصنيف إذا كانت هذه المعلومات متوفرة.

22. عند عرض الحرفيين، اذكر الاسم ونوع الحرفة والمدينة وسنوات الخبرة إذا كانت متوفرة.

23. لا تعرض أرقام IDs للمستخدم.

24. لا تعرض البريد الإلكتروني للمستخدم.

25. لا تدّعي أنك نفذت عملية شراء أو حجز أو تواصلت مع الحرفي.

26. لا تستخدم Markdown المعقد. يمكنك استخدام نقاط بسيطة، لكن لا تستخدم جداول.

27. اجعل الإجابة سهلة القراءة على الهاتف.
`;

  /*
  ========================================
  CHAT HISTORY
  ========================================
  */

  const contents = [
    ...history.map((item) => ({
      role:
        item.role === "assistant"
          ? "model"
          : "user",
      parts: [
        {
          text: item.content,
        },
      ],
    })),

    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];

  /*
  ========================================
  GEMINI FALLBACK
  ========================================
  */

  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(
        `Trying Gemini model: ${model}`
      );

      const response =
        await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
          },
        });

      console.log(
        `Gemini model succeeded: ${model}`
      );

      return response.text;
    } catch (error) {
      lastError = error;

      console.error(
        `Gemini model failed: ${model}`,
        error.message
      );

      /*
      إذا النموذج مزدحم أو الطلبات كثيرة،
      نجرب النموذج التالي.
      */

      if (
        error.status === 503 ||
        error.status === 429
      ) {
        continue;
      }

      throw error;
    }
  }

  throw (
    lastError ||
    new Error("All Gemini models failed")
  );
}

module.exports = {
  chatWithAI,
};