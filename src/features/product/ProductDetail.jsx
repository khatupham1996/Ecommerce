import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES, INIT_REVIEWS } from "../../data/constants";
import { disc } from "../../utils/helpers";
import { useAppContext } from "../../ui/AppContext";
import ProductHero from "./ProductHero";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

/* ── Mock initial reviews ── */

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  // ── Shared state lifted here so Hero and Tabs stay in sync ──
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  // Seed mock reviews and reset UI whenever the product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setReviews(INIT_REVIEWS[Number(id)] || []);
    setActiveTab("description");
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">😢</span>
        <p className="text-gray-500 font-semibold">Product not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-rose-500 text-white border-none rounded-2xl py-3 px-6 font-bold text-sm cursor-pointer"
        >
          ← Back to shop
        </button>
      </div>
    );
  }

  // Breadcrumb category
  const category = CATEGORIES.find((c) => c.id === product.category_id);

  // Related products (same category, excluding current)
  const related = PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link
            to="/"
            className="hover:text-rose-500 transition-colors no-underline text-gray-400"
          >
            Home
          </Link>
          <span>/</span>
          <button
            onClick={() => navigate("/")}
            className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-rose-500 transition-colors text-xs p-0"
          >
            {category?.name}
          </button>
          <span>/</span>
          <span className="text-gray-600 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-10">
        {/* Hero: image gallery + product info */}
        <ProductHero
          product={product}
          reviews={reviews}
          setActiveTab={setActiveTab}
        />

        {/* Tabs: Description / Reviews / Shipping */}
        <ProductTabs
          product={product}
          reviews={reviews}
          setReviews={setReviews}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Related products */}
        {related.length > 0 && <RelatedProducts related={related} />}
      </div>
    </div>
  );
}

export default ProductDetail;
