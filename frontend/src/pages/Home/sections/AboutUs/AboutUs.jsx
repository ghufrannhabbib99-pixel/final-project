import "./AboutUs.css";

function AboutUs() {
  return (
    <section
      id="about-us"
      className="about-us bg-[#FDF0D5] text-[#003049]"
      dir="rtl"
    >
      <div className="about-us__container mx-auto">

        {/* Main Frame */}
        <div className="about-us__frame relative overflow-hidden bg-[#780000]">

          {/* Cuneiform Border */}
          <div className="about-us__ornament pointer-events-none absolute inset-5 rounded-[18px] border border-[#FDF0D5]/30">
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="#FDF0D5"
                strokeWidth="2"
                opacity="0.45"
              >
                {/* Top pattern */}
                <path d="M80 35 L95 52 L110 35 L125 52 L140 35" />
                <path d="M860 35 L875 52 L890 35 L905 52 L920 35" />

                {/* Bottom pattern */}
                <path d="M80 565 L95 548 L110 565 L125 548 L140 565" />
                <path d="M860 565 L875 548 L890 565 L905 548 L920 565" />

                {/* Side patterns */}
                <path d="M35 180 L52 195 L35 210 L52 225 L35 240" />
                <path d="M965 180 L948 195 L965 210 L948 225 L965 240" />

                <path d="M35 360 L52 375 L35 390 L52 405 L35 420" />
                <path d="M965 360 L948 375 L965 390 L948 405 L965 420" />

                {/* Small central ornaments */}
                <path d="M470 35 L500 55 L530 35" />
                <path d="M470 565 L500 545 L530 565" />
              </g>
            </svg>
          </div>

          <div className="about-us__content relative z-10 mx-auto">

            {/* Heading */}
            <div className="about-us__heading text-center">

              <span className="text-sm font-bold tracking-[0.3em] text-[#FDF0D5]/70">
                حكايتنا
              </span>

              <h2 className="mt-4 text-4xl font-extrabold text-[#FDF0D5] md:text-5xl">
                من نحن؟
              </h2>

              <div className="about-us__heading-line mx-auto mt-5 h-px bg-[#FDF0D5]/40" />

            </div>

            {/* Main Text */}
            <div className="about-us__intro text-center">

              <h3 className="text-3xl font-extrabold leading-relaxed text-[#FDF0D5] md:text-4xl">
                نحفظ الحِرفة،
                <br />
                <span className="text-[#FDF0D5]/75">
                  ونروي حكايتها.
                </span>
              </h3>

            <p className="about-us__description mx-auto mt-6 max-w-2xl text-[25px] leading-8 text-[#FDF0D5]/70 md:text-[25px]">
  الحِرفة هي منصة عراقية تهدف إلى توثيق الحِرف اليدوية
  العراقية ودعم الحرفيين المحليين، من خلال مساحة تجمع
  منتجاتهم وقصصهم ومهاراتهم في مكان واحد.
            </p>

            <p className="about-us__description mx-auto mt-4 max-w-2xl text-[25px] leading-8 text-[#FDF0D5]/70 md:text-[25px]">
  نؤمن أن كل قطعة يدوية تحمل أكثر من شكل جميل؛
  تحمل حكاية حرفي، وذاكرة مكان، وجزءاً من تراث العراق.
            </p>
            </div>

            {/* Values */}
            <div className="about-us__values grid md:grid-cols-3">

              <div className="about-us__value rounded-xl border border-[#FDF0D5]/20 bg-[#003049]/20 text-center">
            

                <h4 className="mt-3 text-[20px] font-bold text-[#FDF0D5]">
                  نوثّق
                </h4>

                <p className="mt-2 text-[20px] leading-6 text-[#FDF0D5]/60">
                  نحفظ قصص الحرفيين وأساليبهم.
                </p>
              </div>

              <div className="about-us__value rounded-xl border border-[#FDF0D5]/20 bg-[#003049]/20 text-center">
                

                <h4 className="mt-3 text-[20px] font-bold text-[#FDF0D5]">
                  ندعم
                </h4>

                <p className="mt-2 text-[20px] leading-6 text-[#FDF0D5]/60">
                  نمنح الحرفي مساحة لعرض أعماله.
                </p>
              </div>

              <div className="about-us__value rounded-xl border border-[#FDF0D5]/20 bg-[#003049]/20 text-center gap-9">
               

                <h4 className="mt-3 text-[20px] font-bold text-[#FDF0D5]">
                  نُعرّف
                </h4>

                <p className="mt-2 text-[20px] leading-6 text-[#FDF0D5]/60">
                  نقرّب الناس من الحِرفة العراقية.
                </p>
              </div>

            </div>

            {/* Bottom Signature */}
            <div className="about-us__signature text-center">

              <div className="about-us__signature-line mx-auto h-px bg-[#FDF0D5]/25" />

              <div className="about-us__signature-content flex items-center justify-center">
                <span className="text-sm font-bold tracking-widest text-[#FDF0D5]/70">
                  من أيادي العراق
                </span>

                <span className="mx-4 text-[#FDF0D5]/50">
                  ✦
                </span>

                <span className="text-sm font-bold tracking-widest text-[#FDF0D5]/70">
                  إلى كل مكان
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;