import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, PRODUCTS, BADGE_CLS } from "../../data/constants";
import { disc, fmt } from "../../utils/helpers";
import { useAppContext } from "../../ui/AppContext";
import Stars from "../../ui/Stars";

function ProductHero({ product, reviews, setActiveTab }) {
  const navigate = useNavigate();
  const { addToCart, setShowCart } = useAppContext();

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const pct = disc(product.price, product.originalPrice);
  const category = CATEGORIES.find((c) => c.id === product.category_id);

  // Derive avg rating from the shared reviews prop passed down from ProductDetail
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : product.rating;

  const totalReviews = reviews.length || product.reviews;

  const images = [
    product.image,
    product.image.replace("&q=85", "&q=70") + "&sat=-30",
    product.image.replace("&q=85", "&q=75") + "&flip=h",
    product.image.replace("&q=85", "&q=80") + "&blur=1",
  ];

  function handleAddToCart() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ── Left: Image gallery ── */}
        <div className="bg-gray-50 p-5 md:p-8">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
            <img
              src={images[selectedImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80";
              }}
            />
            {/* Fix: restore badge background color via BADGE_CLS */}
            {product.badge && (
              <span
                className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: BADGE_CLS[product.badge] || "#666" }}
              >
                {product.badge}
              </span>
            )}
            <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{pct}%
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2.5">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 p-0 ${
                  selectedImg === i
                    ? "border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,.2)]"
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Product info ── */}
        <div className="flex flex-col p-5 md:p-8">
          {/* Category tag */}
          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-500 text-[11px] font-bold px-3 py-1 rounded-full self-start mb-3">
            {category?.icon} {category?.name}
          </span>

          {/* Name */}
          <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating summary */}
          <div className="flex items-center gap-3 mb-4">
            <Stars r={Math.floor(Number(avgRating))} />
            <span className="text-sm text-gray-500 font-medium">
              {avgRating} ({totalReviews} reviews)
            </span>
            <button
              className="text-xs text-rose-500 font-bold bg-transparent border-none cursor-pointer hover:underline p-0"
              onClick={() => {
                setActiveTab("reviews");
                // Scroll to the tabs section smoothly
                setTimeout(() => {
                  document.getElementById("product-tabs")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 50);
              }}
            >
              See all reviews →
            </button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-rose-500 font-black text-3xl">
              {fmt(product.price)}
            </span>
            <span className="text-gray-300 line-through text-lg">
              {fmt(product.originalPrice)}
            </span>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg">
              Save {pct}%
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Shipping info */}
          <div className="bg-amber-50 rounded-2xl px-4 py-3 text-sm text-amber-800 mb-6 flex items-start gap-2">
            <span className="text-lg">🚢</span>
            <div>
              <p className="font-semibold">
                Delivery from USA to VietNam within 7–14 days
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Free shipping on orders over 3,000,000đ · {product.stock} items
                in stock
              </p>
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm text-gray-700 font-semibold">
              Quantity
            </span>
            <div className="flex items-center bg-gray-100 rounded-2xl p-1">
              <button
                className="w-10 h-10 rounded-xl border-none bg-white cursor-pointer font-bold text-lg shadow-sm hover:bg-gray-50 transition-colors"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-base">
                {qty}
              </span>
              <button
                className="w-10 h-10 rounded-xl border-none bg-white cursor-pointer font-bold text-lg shadow-sm hover:bg-gray-50 transition-colors"
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400">
              {product.stock} available
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={handleAddToCart}
              className={`flex-1 ${
                added ? "bg-emerald-500" : "bg-rose-500 hover:bg-rose-600"
              } text-white border-none rounded-2xl py-4 font-extrabold text-[15px] cursor-pointer transition-all duration-300`}
            >
              {added ? "✓ Added to cart!" : "🛒 Add to Cart"}
            </button>
            <button
              onClick={() => {
                addToCart(product, qty);
                setShowCart(false);
                navigate("/checkout");
              }}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white border-none rounded-2xl py-4 font-extrabold text-[15px] cursor-pointer transition-colors"
            >
              Buy Now →
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-gray-100">
            {[
              ["🔐", "SSL Secure"],
              ["🇺🇸", "100% US Genuine"],
              ["↩️", "30-day Return"],
              ["💳", "Multi-payment"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-xs text-gray-400"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;
