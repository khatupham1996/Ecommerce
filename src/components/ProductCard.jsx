import { useState } from "react";
import Stars from "./Stars";
import { CATEGORIES, BADGE_CLS } from "../data/constants.js";
import { fmt, disc } from "../utils/helpers.js";

export default function ProductCard({ p, onAdd, onView }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const pct = disc(p.price, p.originalPrice);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div
      onClick={() => onView(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`bg-white rounded-[20px] overflow-hidden border border-gray-100 cursor-pointer transition-all duration-[250ms] ${
        hover
          ? "-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
          : "shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80";
          }}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hover ? "scale-[1.07]" : "scale-100"
          }`}
        />
        {p.badge && (
          <span
            className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-[3px] rounded-full"
            style={{ background: BADGE_CLS[p.badge] || "#666" }}
          >
            {p.badge}
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[10px] font-bold px-[7px] py-[3px] rounded-full">
          -{pct}%
        </span>
        {hover && (
          <button
            onClick={handleAdd}
            className={`absolute bottom-2.5 left-2.5 right-2.5 ${
              added ? "bg-emerald-500" : "bg-gray-900"
            } text-white border-none rounded-xl py-[9px] text-xs font-bold cursor-pointer transition-colors duration-200`}
          >
            {added ? "✓ Added!" : "+ Add to cart"}
          </button>
        )}
      </div>

      <div className="px-3.5 pt-3.5 pb-4">
        <p className="text-[10px] text-gray-400 mb-1">
          {CATEGORIES.find((c) => c.id === p.category_id)?.name}
        </p>
        <p className="text-[13px] font-semibold text-gray-800 leading-[1.4] mb-2 overflow-hidden line-clamp-2">
          {p.name}
        </p>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars r={Math.floor(p.rating)} />
          <span className="text-[10px] text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-rose-500 font-extrabold text-[15px]">
            {fmt(p.price)}
          </span>
          <span className="text-gray-300 text-[11px] line-through">
            {fmt(p.originalPrice)}
          </span>
        </div>
        {p.stock <= 5 && (
          <p className="text-[10px] text-orange-500 mt-1 font-semibold">
            ⚠ {p.stock} items left
          </p>
        )}
      </div>
    </div>
  );
}
