import "./HomeCTA.css";
import { Link } from "react-router-dom";

function HomeCTA() {
  return (
    <section
      className="home-cta bg-[#FDF0D5]"
      dir="rtl"
    >
      <div className="home-cta__container mx-auto">

        <div className="home-cta__box relative overflow-hidden bg-[#003049]">

          {/* Decorative Cuneiform Frame */}
          <div className="home-cta__frame pointer-events-none absolute inset-5 rounded-[20px] border border-[#FDF0D5]/25">

            <svg
              className="h-full w-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="#FDF0D5"
                strokeWidth="2"
                opacity="0.45"
              >
                {/* Top */}
                <path d="M70 35 L85 52 L100 35 L115 52 L130 35" />
                <path d="M870 35 L885 52 L900 35 L915 52 L930 35" />

                {/* Bottom */}
                <path d="M70 465 L85 448 L100 465 L115 448 L130 465" />
                <path d="M870 465 L885 448 L900 465 L915 448 L930 465" />

                {/* Left */}
                <path d="M35 155 L52 170 L35 185 L52 200 L35 215" />
                <path d="M35 285 L52 300 L35 315 L52 330 L35 345" />

                {/* Right */}
                <path d="M965 155 L948 170 L965 185 L948 200 L965 215" />
                <path d="M965 285 L948 300 L965 315 L948 330 L965 345" />

                {/* Center ornaments */}
                <path d="M465 35 L500 58 L535 35" />
                <path d="M465 465 L500 442 L535 465" />
              </g>
            </svg>

          </div>

          {/* Small Burgundy Detail */}
          <div className="home-cta__accent absolute left-1/2 top-0 -translate-x-1/2 bg-[#780000]" />

          {/* Content */}
          <div className="home-cta__content relative z-10 mx-auto text-center">

            <span className="text-sm font-bold tracking-[0.3em] text-[#FDF0D5]/60">
              الحِرفة العراقية
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-relaxed text-[#FDF0D5] md:text-5xl">
              احمل قطعةً من العراق
              <br />
              <span className="text-[#FDF0D5]/75">
                إلى عالمك
              </span>
            </h2>

            <p className="home-cta__description mx-auto mt-6 max-w-2xl text-base leading-8 text-[#FDF0D5]/65 md:text-lg">
              اكتشف منتجات صنعت بأيادٍ عراقية，
              واحفظ جزءًا من حكاية هذا التراث.
            </p>

            <div className="home-cta__button-wrapper">
              <Link
  to="/products"
  className="group inline-flex items-center gap-3 rounded-full bg-[#FDF0D5] px-8 py-4 text-base font-bold text-[#003049] transition-all duration-300 hover:bg-[#780000] hover:text-[#FDF0D5]"
>
  <span>ابدأ الاستكشاف</span>

  <span className="text-xl transition-transform duration-300 group-hover:-translate-x-1">
    ←
  </span>
</Link>
            </div>

          </div>

          {/* Bottom Signature */}
          <div className="home-cta__signature absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center text-[#FDF0D5]/40">

            <span className="text-xs font-medium tracking-widest">
              تراث
            </span>

            <span className="mx-3 text-[#780000]">
              ◆
            </span>

            <span className="text-xs font-medium tracking-widest">
              حِرفة
            </span>

            <span className="mx-3 text-[#780000]">
              ◆
            </span>

            <span className="text-xs font-medium tracking-widest">
              حكاية
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HomeCTA;