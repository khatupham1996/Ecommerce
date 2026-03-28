import { useState } from "react";
import { CATEGORIES, MEGA_MENUS } from "../data/constants.js";

export default function CategoryNavBar({ catFilter, setCatFilter, setSearch }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleSelectCategory = (id) => {
    setCatFilter(id === catFilter ? null : id);
    setOpenMenu(null);
    setMobileOpen(false);
  };
  const handleSelectAll = () => {
    setCatFilter(null);
    setSearch("");
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <div
      className=" bg-white border-b border-gray-100 relative"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Mobile: Hambuger button */}
      <div className="lg:hidden flex items-center px-4 py-2 gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 py-2 px-3 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13px] font-bold text-gray-700"
        >
          {mobileOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
          Categories
        </button>

        {/* Show active category pill on mobile */}
        {catFilter && (
          <span className="text-xs font-bold text-rose-500 bg-rose-50 py-1 px-2.5 rounded-full">
            {CATEGORIES.find((c) => c.id === catFilter)?.icon}{" "}
            {CATEGORIES.find((c) => c.id === catFilter)?.name}
          </span>
        )}
      </div>
      {/* Mobile: Dropdown menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu panel */}
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white z-50 shadow-[0_16px_40px_rgba(0,0,0,.15)] rounded-b-2xl max-h-[70vh] overflow-y-auto">
            {/* All button */}
            <button
              onClick={handleSelectAll}
              className={`w-full flex items-center gap-3 py-3.5 px-5 border-none cursor-pointer text-[14px] font-bold transition-colors
                ${!catFilter ? "text-rose-500 bg-rose-50" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              🏪 All Products
            </button>

            <div className="h-px bg-gray-100" />

            {/* Category items */}
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <button
                  onClick={() => handleSelectCategory(c.id)}
                  className={`w-full flex items-center justify-between py-3.5 px-5 border-none cursor-pointer text-[14px] font-bold transition-colors
                    ${catFilter === c.id ? "text-rose-500 bg-rose-50" : "text-gray-700 bg-white hover:bg-gray-50"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-lg">{c.icon}</span>
                    {c.name}
                  </span>
                  {catFilter === c.id && (
                    <svg
                      width="16"
                      height="16"
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

                {/* Show subcategories if this category is selected and has mega menu */}
                {catFilter === c.id && MEGA_MENUS[c.id] && (
                  <div className="bg-gray-50 py-2 px-5">
                    {MEGA_MENUS[c.id].columns.map((col, ci) => (
                      <div key={ci} className="mb-2">
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 px-2">
                          {col.heading}
                        </p>
                        {col.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => setMobileOpen(false)}
                            className="block w-full text-left py-1.5 px-2 text-xs text-gray-500 bg-transparent border-none cursor-pointer rounded-lg hover:bg-white hover:text-rose-500 transition-colors"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}

                    {/* Brands */}
                    <div className="mt-1 mb-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 px-2">
                        Brands
                      </p>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {MEGA_MENUS[c.id].featured.map((brand) => (
                          <span
                            key={brand}
                            className="text-[11px] font-semibold bg-white border border-gray-200 rounded-lg py-1 px-2 text-gray-600"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="h-px bg-gray-50" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Nav tab row */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-5 items-center overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            setCatFilter(null);
            setSearch("");
            setOpenMenu(null);
          }}
          onMouseEnter={() => setOpenMenu(null)}
          className={`shrink-0 flex items-center gap-1.5 py-3 px-4 border-none cursor-pointer text-[13px] font-bold bg-transparent whitespace-nowrap transition-colors duration-150
            ${!catFilter ? "text-rose-500 border-b-[2.5px] border-b-rose-500" : "text-gray-700 border-b-[2.5px] border-b-transparent"}`}
        >
          🏪 All
        </button>

        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCatFilter(c.id === catFilter ? null : c.id);
              setOpenMenu(null);
            }}
            onMouseEnter={() => setOpenMenu(MEGA_MENUS[c.id] ? c.id : null)}
            className={`shrink-0 flex items-center gap-1.5 py-3 px-4 border-none cursor-pointer text-[13px] font-bold whitespace-nowrap transition-all duration-150
              ${openMenu === c.id ? "bg-rose-50/50" : "bg-transparent"}
              ${catFilter === c.id || openMenu === c.id ? "text-rose-500" : "text-gray-700"}
              ${catFilter === c.id ? "border-b-[2.5px] border-b-rose-500" : "border-b-[2.5px] border-b-transparent"}`}
          >
            {c.icon} {c.name}
            {MEGA_MENUS[c.id] && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`ml-0.5 transition-transform duration-200 ${openMenu === c.id ? "rotate-180" : "rotate-0"}`}
              >
                <path
                  d="M2 3.5L5 6.5L8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Mega Dropdown */}
      {openMenu && MEGA_MENUS[openMenu] && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-[0_24px_60px_rgba(0,0,0,.13)] border-t-2 border-t-rose-500 z-[100] rounded-b-[20px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto pt-7 px-7 pb-6 grid grid-cols-[190px_1fr_1fr_1fr] gap-8">
            {/* Left panel */}
            <div className="flex flex-col gap-3.5">
              {/* Banner card */}
              <div className="bg-gradient-to-br from-rose-500 to-purple-500 rounded-2xl py-5 px-[18px] text-white">
                <span className="text-[10px] font-bold bg-white/25 py-0.5 px-2 rounded-full">
                  {MEGA_MENUS[openMenu].banner.label}
                </span>
                <p className="text-base font-black mt-2.5 leading-tight">
                  {MEGA_MENUS[openMenu].banner.text}
                </p>
                <p className="text-[11px] mt-1.5 opacity-80">US Product 🇺🇸</p>
                <button
                  onClick={() => {
                    setCatFilter(openMenu);
                    setOpenMenu(null);
                  }}
                  className="mt-3.5 bg-white/20 border border-white/40 text-white rounded-[10px] py-[7px] px-3.5 text-xs font-bold cursor-pointer hover:bg-white/30 transition-colors"
                >
                  Explore →
                </button>
              </div>

              {/* Brands */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">
                  Brands
                </p>
                <div className="flex flex-col gap-[5px]">
                  {MEGA_MENUS[openMenu].featured.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setOpenMenu(null)}
                      className="text-left bg-gray-50 border border-gray-100 rounded-[10px] py-[7px] px-3 text-xs font-bold text-gray-700 cursor-pointer transition-all duration-150 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-category columns */}
            {MEGA_MENUS[openMenu].columns.map((col, ci) => (
              <div key={ci}>
                <p className="text-[11px] font-extrabold text-gray-900 mb-2.5 pb-2 border-b-2 border-gray-100 uppercase tracking-wide">
                  {col.heading}
                </p>
                <div className="flex flex-col">
                  {col.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCatFilter(openMenu);
                        setOpenMenu(null);
                      }}
                      className="text-left bg-transparent border-none py-1.5 px-2.5 text-[13px] text-gray-500 cursor-pointer rounded-lg transition-all duration-150 leading-relaxed hover:bg-rose-50 hover:text-rose-500 hover:pl-4"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="bg-gray-50/80 border-t border-gray-100 py-2.5 px-7 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              🔥 {MEGA_MENUS[openMenu].title}
            </span>
            <button
              onClick={() => {
                setCatFilter(openMenu);
                setOpenMenu(null);
              }}
              className="text-xs font-extrabold text-rose-500 bg-transparent border-none cursor-pointer hover:text-rose-600 transition-colors"
            >
              All products →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
