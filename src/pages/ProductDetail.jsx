import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/constants";
import { useState } from "react";
import { disc, fmt } from "../utils/helpers";
import Stars from "../components/Stars";
import { useAppContext } from "../ui/AppContext";
/* ── Rating distribution bar ── */
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
      <svg width="12" height="12" viewBox="0 0 20 20" fill="#fbbf24">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-6">{count}</span>
    </div>
  );
}
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setShowCart } = useAppContext();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [selectedImg, setSelectedImg] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const pct = disc(product.price, product.originalPrice);
  const category = CATEGORIES.find((c) => c.id === product.category_id);

  /* ── review helpers ── */
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
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  function handleAddToCart() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 pb-10">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image gallery */}
            <div className="bg-gray-50 p-5 md:p-8">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-white mb-4">
                <img
                  src={images[selectedImg]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80";
                  }}
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full ">
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
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 p-0 ${selectedImg === i ? "border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,.2)]" : "border-gray-200 opacity-60 hover:opacity-100"}`}
                    key={i}
                    onClick={() => setSelectedImg(i)}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Right: Product info */}
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
                <span>
                  {avgRating} ({totalReviews} reviews)
                </span>
                <button
                  className="text-xs text-rose-500 font-bold bg-transparent border-none cursor-pointer hover:underline p-0"
                  onClick={() => setActiveTab("reviews")}
                >
                  See all reviews
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
              <p className="text-sm text-gray-500 leading-relaxed mb-5 ">
                {product.description}
              </p>

              {/* Shipping infor */}
              <div className="bg-amber-50 rounded-2xl px-4 py-3 text-sm text-amber-800 mb-6 flex items-start gap-2">
                <span className="text-lg">🚢</span>
                <div>
                  <p className="font-semibold">
                    Delivery from USA to VietNam within 7–14 days
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    Free shipping on orders over 3,000,000đ · {product.stock}{" "}
                    items in stock
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
                    -
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

              {/* Action button */}
              <div className="flex gap-3 mt-auto">
                <button
                  className={`flex-1 ${added ? "bg-emerald-500" : "bg-rose-500 hover:bg-rose-600"} text-white border-none rounded-2xl py-4 font-extrabold text-[15px] cursor-pointer transition-all duration-300`}
                  onClick={handleAddToCart}
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
        {/* Description/reviews */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Tab headers */}
          <div className="flex border-b border-gray-100">
            {[
              ["description", "📝 Description"],
              ["reviews", `⭐ Reviews (${reviews.length || totalReviews})`],
              ["shipping", "🚢 Shipping"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-4 text-sm font-bold border-none cursor-pointer transition-all ${activeTab === key ? "text-rose-500 bg-rose-50/50 border-b-2 border-rose-500" : "text-gray-400 bg-transparent hover:text-gray-600 hover:bg-gray-50"}`}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Tab content */}
          <div>
            {/* Description tab */}
            {activeTab === "description" && (
              <div className="max-w-3xl ">
                <h3 className="font-extrabold text-gray-900 mb-4">
                  Product Details
                </h3>
                <p className="text-sx text-gray-500 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    ["Brand", product.name.split(" ")[0]],
                    ["Category", category?.name],
                    ["Stock", `${product.stock} items`],
                    ["Origin", "USA 🇺🇸"],
                    ["Rating", `${product.rating}/5`],
                    ["Reviews", `${product.reviews} reviews`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2.5 px-3 rounded-xl bg-gray-50 text-sm"
                    >
                      <span className="text-gray-400">{label}</span>
                      <span className="font-semibold text-gray-700">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* reviews tab */}
            {activeTab === "reviews" && (
              <div>
                {/* Review Summary + write button */}
                <div className="flex flex-col gap-6 mb-8">
                  {/* Left:average */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 min-w-[180px]">
                    <p className="text-4xl font-black text-gray-900">
                      {avgRating}
                    </p>
                    <Stars r={Math.floor(Number(avgRating))} />
                    <p className="text-xs text-gray-400 mt-1.5">
                      {reviews.length} reviews
                    </p>
                  </div>
                  {/* Middle: distribution */}
                  <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    {ratingDist.map(({ star, count }) => (
                      <RatingBar
                        key={star}
                        star={star}
                        count={count}
                        total={reviews.length}
                      />
                    ))}
                  </div>
                  {/* Right CTA */}
                  <div className="flex flex-col items-center justify-center gap-3 ">
                    <p className="text-sm text-gray-500 text-center">
                      Have this product?
                    </p>
                    <button
                      className="bg-rose-500 hover:bg-rose-600 text-white border-none rounded-2xl py-3 px-6 font-bold text-sm cursor-pointer transition-colors"
                      onClick={() => setShowReviewForm(true)}
                    >
                      ✍️ Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
