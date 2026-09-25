import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wider text-[#780000]">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 text-lg font-semibold text-[#003049] transition hover:text-[#780000]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">

          <p className="font-semibold text-[#003049]">
            {product.price} IQD
          </p>

          <Link
            to={`/products/${product.id}`}
            className="rounded-full bg-[#003049] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#780000]"
          >
            View
          </Link>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;