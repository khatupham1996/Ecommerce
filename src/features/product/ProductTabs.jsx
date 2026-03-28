import { useState } from "react";
import { CATEGORIES, SHIPPING } from "../../data/constants";
import StarPicker from "../../ui/StarPicker";
import Stars from "../../ui/Stars";
import RatingBar from "../../ui/RatingBar";

function ProductTabs({
  product,
  reviews,
  setReviews,
  activeTab,
  setActiveTab,
}) {
  const category = CATEGORIES.find((c) => c.id === product.category_id);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    text: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Derive stats from the shared reviews prop
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : product.rating;

  const totalReviews = reviews.length || product.reviews;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

    const newReview = {
      id: Date.now(),
      user: reviewForm.name,
      rating: reviewForm.rating,
      date: new Date().toISOString().split("T")[0],
      text: reviewForm.text,
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ name: "", rating: 5, text: "" });
    setShowReviewForm(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r,
      ),
    );
  };

  return (
    <div
      id="product-tabs"
      className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden"
    >
      {/* Tab headers */}
      <div className="flex border-b border-gray-100">
        {[
          ["description", "📝 Description"],
          ["reviews", `⭐ Reviews (${totalReviews})`],
          ["shipping", "🚢 Shipping"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-4 text-sm font-bold border-none cursor-pointer transition-all ${
              activeTab === key
                ? "text-rose-500 bg-rose-50/50 border-b-2 border-rose-500"
                : "text-gray-400 bg-transparent hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 md:p-8">
        {/* ── Description tab ── */}
        {activeTab === "description" && (
          <div className="max-w-3xl">
            <h3 className="font-extrabold text-gray-900 mb-4">
              Product Details
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
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
                  <span className="font-semibold text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reviews tab ── */}
        {activeTab === "reviews" && (
          <div>
            {/* Summary row */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Average score */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 min-w-[180px]">
                <p className="text-4xl font-black text-gray-900">{avgRating}</p>
                <Stars r={Math.floor(Number(avgRating))} />
                <p className="text-xs text-gray-400 mt-1.5">
                  {reviews.length} reviews
                </p>
              </div>

              {/* Distribution bars */}
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

              {/* Write review CTA */}
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-sm text-gray-500 text-center">
                  Have this product?
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white border-none rounded-2xl py-3 px-6 font-bold text-sm cursor-pointer transition-colors"
                >
                  ✍️ Write a Review
                </button>
              </div>
            </div>

            {/* Success toast */}
            {submitSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <span className="text-xl">✅</span>
                <p className="text-sm text-emerald-700 font-semibold">
                  Your review has been submitted! Thank you.
                </p>
              </div>
            )}

            {/* Review form */}
            {showReviewForm && (
              <div className="bg-gray-50 rounded-2xl p-5 md:p-6 mb-8 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-extrabold text-gray-900">
                    Write your review
                  </h4>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="w-8 h-8 rounded-full bg-white border-none cursor-pointer text-gray-400 text-sm shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Star picker */}
                  <div>
                    <label className="text-xs text-gray-500 font-semibold block mb-2">
                      Your Rating
                    </label>
                    <StarPicker
                      value={reviewForm.rating}
                      onChange={(r) =>
                        setReviewForm({ ...reviewForm, rating: r })
                      }
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-xs text-gray-500 font-semibold block mb-2">
                      Your Name
                    </label>
                    <input
                      value={reviewForm.name}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, name: e.target.value })
                      }
                      placeholder="e.g. Nguyễn Văn A"
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none box-border focus:border-rose-300 transition-colors"
                    />
                  </div>

                  {/* Review text */}
                  <div>
                    <label className="text-xs text-gray-500 font-semibold block mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={reviewForm.text}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, text: e.target.value })
                      }
                      placeholder="Share your experience with this product..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none box-border resize-none focus:border-rose-300 transition-colors"
                    />
                  </div>

                  {/* Submit / Cancel */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReview}
                      disabled={
                        !reviewForm.name.trim() || !reviewForm.text.trim()
                      }
                      className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white border-none rounded-xl py-3 px-6 font-bold text-sm cursor-pointer transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="border border-gray-200 bg-white rounded-xl py-3 px-6 font-bold text-sm cursor-pointer text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Review list */}
            <div className="flex flex-col gap-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-5xl block mb-3">💬</span>
                  <p className="font-semibold mb-1">No reviews yet</p>
                  <p className="text-xs">
                    Be the first to review this product!
                  </p>
                </div>
              ) : (
                // Fix: use () not {} so JSX is returned from the arrow function
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                          {r.user[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">
                            {r.user}
                          </p>
                          <p className="text-[11px] text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <Stars r={r.rating} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                      {r.text}
                    </p>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                      <button
                        onClick={() => handleHelpful(r.id)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 bg-transparent border-none cursor-pointer hover:text-rose-500 transition-colors p-0"
                      >
                        👍 Helpful ({r.helpful})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── Shipping tab ── */}
        {activeTab === "shipping" && (
          <div className="max-w-3xl">
            <h3 className="font-extrabold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="flex flex-col gap-3">
              {SHIPPING.map(([icon, title, time, note]) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4"
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
