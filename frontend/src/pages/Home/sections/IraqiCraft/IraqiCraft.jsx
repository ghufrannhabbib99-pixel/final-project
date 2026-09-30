import "./IraqiCraft.css";
import craftImage from "../../../../assets/images/IraqiCraft.jpg";

function IraqiCraft() {
  return (
    <section
      dir="rtl"
      className="iraqi-craft bg-[#FDF0D5] text-[#003049]"
    >
{/* Iraqi Cuneiform Divider */}
<div className="iraqi-divider overflow-hidden bg-[#780000]">
  <svg
    viewBox="0 0 1200 55"
    className="h-full w-full"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="cuneiformPattern"
        width="120"
        height="55"
        patternUnits="userSpaceOnUse"
      >
        <g
          fill="none"
          stroke="#FDF0D5"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {/* Central diamond */}
          <path d="M60 10 L72 27.5 L60 45 L48 27.5 Z" />

          {/* Cuneiform-like wedges */}
          <path d="M15 19 L28 19 L21.5 27.5 Z" />
          <path d="M105 19 L92 19 L98.5 27.5 Z" />

          <path d="M15 36 L28 36 L21.5 27.5 Z" />
          <path d="M105 36 L92 36 L98.5 27.5 Z" />

          {/* Horizontal cuneiform marks */}
          <path d="M0 27.5 H15" />
          <path d="M105 27.5 H120" />

          {/* Small vertical wedges */}
          <path d="M38 12 L45 19 L38 26 Z" />
          <path d="M82 12 L75 19 L82 26 Z" />

          <path d="M38 29 L45 36 L38 43 Z" />
          <path d="M82 29 L75 36 L82 43 Z" />
        </g>
      </pattern>
    </defs>

    <rect
      width="1200"
      height="55"
      fill="url(#cuneiformPattern)"
    />
  </svg>
</div>

      <div className="iraqi-craft__container">

        {/* Section Heading */}
        <header className="iraqi-craft__header text-center">
          <span className="text-sm font-bold tracking-widest text-[#780000]">
            الحِرفة العراقية
          </span>

          <h2 className="iraqi-craft__title text-5xl font-bold leading-tight">
            تراثٌ يُصنع باليد
          </h2>

          <p className="iraqi-craft__intro mx-auto max-w-2xl text-base leading-8 text-[#003049]/65">
            حكايةٌ تمتد عبر الأجيال، تحمل في تفاصيلها مهارة الحرفي
            وذاكرة المكان وروح العراق.
          </p>
        </header>

        {/* Wide Image */}
        <div className="iraqi-craft__visual relative overflow-hidden">
          <img
            src={craftImage}
            alt="حِرفة عراقية تقليدية"
            className="iraqi-craft__image h-full w-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-[#FDF0D5]/80"></div>

          {/* Text over Image */}
          <div className="iraqi-craft__image-content absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm pb-3 font-bold tracking-widest text-[#780000]">
              أكثر من مجرد قطعة
            </span>

            <h3 className="mt-4 text-4xl font-bold text-[#003049]">
              الحِرفة العراقية
            </h3>

            <p className="iraqi-craft__description max-w-2xl text-[30px] leading-8 text-[#003049]">
              ليست الحِرفة مجرد قطعة تُصنع باليد، بل قصة تحمل ملامح
              المكان وذاكرة الأجيال. من الفخار والنسيج إلى النحاس
              والخشب، بقيت هذه المهارات جزءاً من الهوية العراقية.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="iraqi-craft__values grid grid-cols-3">
          
          <div className="iraqi-craft__value border-l border-[#003049]/15 text-center">
            <span className="text-xs font-bold tracking-widest text-[#780000]">
              01
            </span>

            <h4 className="mt-3  text-[25px] font-bold ">
              تراث متوارث
            </h4>

            <p className="mt-2 text-[20px] leading-7 text-[#003049]/70">
              مهارات وقصص تنتقل من جيل إلى آخر.
            </p>
          </div>

          <div className="iraqi-craft__value border-l border-[#003049]/15 text-center">
            <span className="text-xs font-bold tracking-widest text-[#780000]">
              02
            </span>

            <h4 className="mt-3 text-[25px] font-bold">
              صناعة يدوية
            </h4>

            <p className="mt-2 text-[20px] leading-7 text-[#003049]/70">
              تفاصيل تصنع بعناية على يد الحرفي.
            </p>
          </div>

          <div className="iraqi-craft__value text-center">
            <span className="text-xs font-bold tracking-widest text-[#780000]">
              03
            </span>

            <h4 className="mt-3 text-[25px] font-bold">
              هوية عراقية
            </h4>

            <p className="mt-2 text-[20px] leading-7 text-[#003049]/70">
              جمال مستوحى من ثقافتنا وتراثنا.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default IraqiCraft;