import { useState } from "react";
import { PRICE_ARRANGMENT, SORT_OPTIONS } from "../data/constants.js";

export default function FilterSidebar({
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}) {
  const [open, setOpen] = useState(false);

  const activeSort = SORT_OPTIONS.find(([k]) => k === sortBy)?.[1] || "Default";
  const activePrice = PRICE_ARRANGMENT.find(
    ([min, max]) => priceRange[0] === min && priceRange[1] === max,
  )?.[2];

  const hasFilter =
    sortBy !== "default" || priceRange[0] !== 0 || priceRange[1] !== 99999999;

  return (
    <div className="relative">
      {/* ─── Trigger button ─── */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 py-2.5 px-4 rounded-2xl border cursor-pointer text-[13px] font-bold transition-all
          ${open ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"}`}
      >
        {/* Filter icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
        Filter
        {/* Active filter count badge */}
        {hasFilter && (
          <span className="bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
            {(sortBy !== "default" ? 1 : 0) +
              (priceRange[0] !== 0 || priceRange[1] !== 99999999 ? 1 : 0)}
          </span>
        )}
        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* ─── Active filter pills ─── */}
      {hasFilter && !open && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {sortBy !== "default" && (
            <span
              onClick={() => setSortBy("default")}
              className="inline-flex items-center gap-1 bg-rose-50 text-rose-500 text-[11px] font-semibold py-1 px-2.5 rounded-full cursor-pointer hover:bg-rose-100 transition-colors"
            >
              {activeSort}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </span>
          )}
          {activePrice && (
            <span
              onClick={() => setPriceRange([0, 99999999])}
              className="inline-flex items-center gap-1 bg-rose-50 text-rose-500 text-[11px] font-semibold py-1 px-2.5 rounded-full cursor-pointer hover:bg-rose-100 transition-colors"
            >
              {activePrice}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </span>
          )}
        </div>
      )}

      {/* ─── Dropdown panel ─── */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,.12)] border border-gray-100 min-w-[240px]">
            {/* Sort section */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">
              Sort
            </p>
            <div className="flex flex-col gap-0.5 mb-4">
              {SORT_OPTIONS.map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setSortBy(k)}
                  className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl border-none cursor-pointer text-xs font-semibold transition-colors
                    ${sortBy === k ? "bg-rose-50 text-rose-500" : "bg-transparent text-gray-500 hover:bg-gray-50"}`}
                >
                  {l}
                  {sortBy === k && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="text-rose-500"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-4" />

            {/* Price section */}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">
              Price
            </p>
            <div className="flex flex-col gap-0.5 mb-4">
              {PRICE_ARRANGMENT.map(([min, max, l]) => (
                <button
                  key={l}
                  onClick={() => setPriceRange([min, max])}
                  className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl border-none cursor-pointer text-xs font-semibold transition-colors
                    ${priceRange[0] === min && priceRange[1] === max ? "bg-rose-50 text-rose-500" : "bg-transparent text-gray-500 hover:bg-gray-50"}`}
                >
                  {l}
                  {priceRange[0] === min && priceRange[1] === max && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="text-rose-500"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Footer actions */}
            <div className="flex gap-2">
              {hasFilter && (
                <button
                  onClick={() => {
                    setSortBy("default");
                    setPriceRange([0, 99999999]);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-xs font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 rounded-xl border-none bg-rose-500 text-white text-xs font-bold cursor-pointer hover:bg-rose-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
