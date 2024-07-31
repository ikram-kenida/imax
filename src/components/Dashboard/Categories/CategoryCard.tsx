import { ProductCategory } from "@/types/Dashboard";
import { Link } from "react-router-dom";

export const CategoryCard = ({
  category,
}: {
  category: ProductCategory;
}) => {
  return (
    <div className="w-full py-5 bg-white shadow rounded-xl flex flex-col items-center justify-center gap-6">
      <img
        src={category.image}
        alt={category.category_en}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-center">
        <h4 className="text-stone-950 text-base font-semibold font-['Lato']">
          <Link to={"/dashboard/categories/" + category.id}>
            {category.category_en}
          </Link>
        </h4>
        <span className="text-stone-950 text-sm font-medium font-['Lato'] mt-2">
          {category.product_length} Products
        </span>
      </div>
    </div>
  );
};
