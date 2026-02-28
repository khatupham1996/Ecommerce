import { useState } from "react";
import Stars from "./Stars";
import { CATEGORIES, BADGE_CLS } from "../data/constants.js";
import { fmt, disc } from "../utils/helpers.js";

export default function ProductModal({ p, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const pct = disc(p.price, p.originalPrice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"
      />
      <div className="relative bg-white rounded-[28px] max-w-[700px] w-full max-h-[90vh] overflow-auto grid grid-cols-2 shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
        {/* Left: Image */}
        <div className="bg-gray-50 rounded-l-[28px] p-8 flex flex-col items-center gap-3">
          <div className="relative w-full aspect-square rounded-[20px] overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover"
            />
            {p.badge && (
              <span
                className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold px-2 py-[3px] rounded-full"
                style={{ background: BADGE_CLS[p.badge] }}
              >
                {p.badge}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-[52px] h-[52px] rounded-xl overflow-hidden border-2 ${
                  i === 0 ? "border-rose-500" : "border-transparent"
                }`}
              >
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="py-8 px-7 flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-gray-100 border-none cursor-pointer text-sm text-gray-500"
          >
            ✕
          </button>
          <span className="bg-rose-50 text-rose-500 text-[11px] font-bold px-2.5 py-1 rounded-full self-start mb-3">
            {CATEGORIES.find((c) => c.id === p.category_id)?.name}
          </span>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2 leading-[1.3]">
            {p.name}
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <Stars r={Math.floor(p.rating)} />
            <span className="text-[13px] text-gray-500">
              {p.rating} ({p.reviews} Rating)
            </span>
          </div>
          <p className="text-[13px] text-gray-500 leading-[1.6] mb-4">
            {p.description}
          </p>
          <div className="flex items-baseline gap-2.5 mb-3.5">
            <span className="text-rose-500 font-black text-[26px]">
              {fmt(p.price)}
            </span>
            <span className="text-gray-300 line-through text-base">
              {fmt(p.originalPrice)}
            </span>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-[2px] rounded-lg">
              -{pct}%
            </span>
          </div>
          <div className="bg-amber-50 rounded-xl px-3.5 py-2.5 text-[13px] text-amber-800 mb-[18px] font-medium">
            🚢 Delivery from USA to VietNam within 7–14 days · <b>{p.stock}</b>{" "}
            left
          </div>
          <div className="flex items-center gap-3 mb-[18px]">
            <span className="text-[13px] text-gray-700 font-semibold">
              Quantity
            </span>
            <div className="flex items-center gap-1 bg-gray-100 rounded-[14px] p-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-[10px] border-none bg-white cursor-pointer font-bold text-base"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
                className="w-8 h-8 rounded-[10px] border-none bg-white cursor-pointer font-bold text-base"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              onAdd(p, qty);
              onClose();
            }}
            className="bg-rose-500 text-white border-none rounded-[18px] py-3.5 font-extrabold text-[15px] cursor-pointer mt-auto"
          >
            🛒 Add to your cart
          </button>
        </div>
      </div>
    </div>
  );
}
