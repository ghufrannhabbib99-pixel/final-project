import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">
          Discover Iraqi Handcrafts
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Discover unique handmade products and learn the stories
          behind the Iraqi artisans who create them.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/products"
            className="rounded-md bg-black px-6 py-3 text-white"
          >
            Explore Products
          </Link>

          <Link
            to="/artisans"
            className="rounded-md border px-6 py-3"
          >
            Meet the Artisans
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;