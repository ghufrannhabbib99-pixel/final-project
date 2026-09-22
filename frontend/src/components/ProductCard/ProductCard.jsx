import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="mb-4 h-48 w-full rounded-md object-cover"
      />

      <h3 className="text-lg font-semibold">
        {product.name}
      </h3>

      <p className="mt-2 text-gray-600">
        {product.price} IQD
      </p>

      <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white"
      >
        View Product
      </Link>
    </div>
  );
}

export default ProductCard;