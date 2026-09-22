import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return (
    <main className="px-6 py-10">
      <Link
        to="/products"
        className="text-sm text-gray-600 hover:text-black"
      >
        ← Back to Products
      </Link>

      <section className="mt-8">
        <h1 className="text-3xl font-bold">Product Details</h1>

        <p className="mt-4 text-gray-600">
          Product ID: {id}
        </p>

        <p className="mt-4 text-gray-600">
          Product information will be loaded here from the API.
        </p>
      </section>
    </main>
  );
}

export default ProductDetails;