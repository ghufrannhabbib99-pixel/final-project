import { Link } from "react-router-dom";
import BlurText from "../../components/BlurText/BlurText";
import heroImage from "../../assets/images/Hero.jpg";

function Home() {
  return (
    <main className="overflow-hidden bg-[#FDF0D5]">
      
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-76px)] items-center px-12 py-20">
        
        {/* Decorative Cuneiform */}
        <div className="pointer-events-none absolute right-20 top-4 text-6xl text-[#780000]/20 select-none">
          𒀭 𒂗 𒆠
        </div>

        <div className="pointer-events-none absolute bottom-10 left-10 text-5xl text-[#003049]/20 select-none">
          𒆠 𒀭
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 pl-60">
          
          {/* Text */}
          <div className="animate-[fadeIn_0.8s_ease-out]">
            
            <span className="mx-auto inline-block text-sm font-semibold uppercase tracking-[0.3em] text-[#780000]">
              Made in Iraq · Crafted by Hand
            </span>

            <BlurText
              text="Discover the Soul of Iraqi Handcrafts."
              delay={120}
              animateBy="words"
              direction="top"
              className="max-w-3xl text-5xl font-bold leading-tight text-[#003049] md:text-6xl lg:text-7xl"
           />

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#003049]/70">
              Discover unique handmade products and the stories
              behind the Iraqi artisans who keep our heritage alive.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-[#780000] px-7 py-3.5 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#5f0000] hover:shadow-xl"
              >
                Explore Products
              </Link>

              <Link
                to="/artisans"
                className="rounded-full border border-[#003049] px-7 py-3.5 font-medium text-[#003049] transition-all duration-300 hover:bg-[#003049] hover:text-[#FDF0D5]"
              >
                Meet the Artisans
              </Link>
            </div>
          </div>

           {/* Visual Area */}
           <div className="relative flex min-h-[420px] translate-x-90">
           <img
           src={heroImage}
           alt="Iraqi artisan creating traditional handmade crafts"
           className="ml-auto w-full max-w-[520px] rounded-[40px] object-cover shadow-2xl"
  />
          </div>

          </div>
  
      </section>


    </main>
  );
}

export default Home;