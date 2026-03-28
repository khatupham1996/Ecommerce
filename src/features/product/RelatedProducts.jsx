import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useAppContext } from "../../ui/AppContext";

function RelatedProducts({ related }) {
  const navigate = useNavigate();
  const { addToCart, setShowCart } = useAppContext();
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-black text-gray-900">Related Product</h2>
        <button
          onClick={() => navigate("/")}
          className="text-xs font-bold text-rose-500 bg-transparent border-none cursor-pointer hover:underline"
        >
          View all →{" "}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            onAdd={(prod) => {
              addToCart(prod);
              setShowCart(true);
            }}
            onView={(prod) => navigate(`/product/${prod.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
