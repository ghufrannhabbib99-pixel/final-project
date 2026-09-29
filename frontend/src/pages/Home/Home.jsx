import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlurText from "../../components/BlurText/BlurText";
import heroImage from "../../assets/images/Hero.jpg";

function Home() {
  const imageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;

    if (!hero || !image) return;

    const handleMouseMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 4;
      const rotateX = ((centerY - y) / centerY) * 4;

      image.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
        scale(1.02)
      `;
    };

    const handleMouseLeave = () => {
      image.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
      `;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#FDF0D5]">

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-76px)] overflow-hidden px-6 py-16 md:px-10 lg:px-16"
      >

        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#780000]/5 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#003049]/5 blur-3xl" />

        {/* Decorative Cuneiform */}
        <div className="pointer-events-none absolute right-8 top-8 select-none text-5xl text-[#780000]/15 md:right-20 md:text-6xl">
          𒀭 𒂗 𒆠
        </div>

        <div className="pointer-events-none absolute bottom-12 left-8 select-none text-4xl text-[#003049]/15 md:left-16 md:text-6xl">
          𒆠 𒀭
        </div>

        {/* Main content */}
        <div className="relative mx-auto grid min-h-[calc(100vh-108px)] max-w-7xl items-center gap-14 lg:grid-cols-2">

          {/* ================= TEXT ================= */}
          <div className="relative z-10 max-w-2xl">

            <div className="mb-5 animate-[fadeInUp_0.7s_ease-out]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#780000]/15 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#780000] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#780000] animate-pulse" />
                Made in Iraq · Crafted by Hand
              </span>
            </div>

            <BlurText
              text="Discover the Soul of Iraqi Handcrafts."
              delay={100}
              animateBy="words"
              direction="top"
              className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-[#003049] md:text-6xl lg:text-7xl"
            />

            <p className="mt-7 max-w-xl animate-[fadeInUp_1s_ease-out] text-base leading-8 text-[#003049]/70 md:text-lg">
              Discover unique handmade products and the stories behind
              the Iraqi artisans who keep our heritage alive.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4 animate-[fadeInUp_1.15s_ease-out]">

              <Link
                to="/products"
                className="group rounded-full bg-[#780000] px-7 py-3.5 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5f0000] hover:shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  Explore Products
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              <Link
                to="/artisans"
                className="group rounded-full border border-[#003049]/30 bg-white/20 px-7 py-3.5 font-medium text-[#003049] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#003049] hover:text-[#FDF0D5]"
              >
                <span className="flex items-center gap-2">
                  Meet the Artisans
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

            </div>

            {/* Small stats */}
            <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-[#003049]/10 pt-7">

              <div>
                <p className="text-2xl font-bold text-[#780000]">
                  100%
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#003049]/55">
                  Handmade
                </p>
              </div>

              <div className="h-10 w-px bg-[#003049]/10" />

              <div>
                <p className="text-2xl font-bold text-[#003049]">
                  Iraqi
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#003049]/55">
                  Heritage
                </p>
              </div>

              <div className="h-10 w-px bg-[#003049]/10" />

              <div>
                <p className="text-2xl font-bold text-[#780000]">
                  Local
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#003049]/55">
                  Artisans
                </p>
              </div>

            </div>
          </div>

          {/* ================= IMAGE ================= */}
          <div className="relative flex min-h-[400px] items-center justify-center lg:min-h-[560px]">

            {/* Rotating decorative ring */}
            <div className="absolute h-[330px] w-[330px] rounded-full border border-dashed border-[#780000]/20 animate-[spin_30s_linear_infinite] md:h-[480px] md:w-[480px]" />

            {/* Background shape */}
            <div className="absolute h-[330px] w-[280px] rotate-6 rounded-[60px] bg-[#780000]/10 blur-sm md:h-[480px] md:w-[390px]" />

            {/* Floating symbol */}
            <div className="absolute -right-2 top-8 z-20 flex h-16 w-16 animate-[float_4s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-white/40 bg-white/50 text-2xl text-[#780000] shadow-xl backdrop-blur-md md:right-4 md:top-10">
              𒀭
            </div>

            {/* Floating symbol */}
            <div className="absolute -left-2 bottom-10 z-20 flex h-14 w-14 animate-[float_5s_ease-in-out_infinite_reverse] items-center justify-center rounded-2xl border border-white/40 bg-white/50 text-xl text-[#003049] shadow-xl backdrop-blur-md md:left-4">
              𒆠
            </div>

            {/* Image */}
            <div className="relative z-10 w-full max-w-[520px] [transform-style:preserve-3d]">

              <div className="absolute -inset-3 rounded-[42px] bg-[#780000]/10 blur-xl" />

              <img
                ref={imageRef}
                src={heroImage}
                alt="Iraqi artisan creating traditional handmade crafts"
                className="relative ml-auto h-[430px] w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-300 ease-out md:h-[540px]"
              />

              {/* Image caption */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-black/20 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Iraqi Craftsmanship
                </p>

                <p className="mt-1 text-sm font-medium">
                  Tradition shaped by human hands.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#003049]/40 md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Explore
          </span>

          <span className="h-8 w-px bg-[#003049]/30 animate-pulse" />
        </div>

      </section>

    </main>
  );
}

export default Home;