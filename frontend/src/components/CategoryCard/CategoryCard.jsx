import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="block rounded-lg border bg-white p-5 shadow-sm"
    >
      <h3 className="text-lg font-semibold">
        {category.name}
      </h3>

      {category.description && (
        <p className="mt-2 text-sm text-gray-600">
          {category.description}
        </p>
      )}
    </Link>
  );
}

export default CategoryCard;