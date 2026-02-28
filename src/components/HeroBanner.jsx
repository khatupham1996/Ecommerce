import { PRODUCTS } from "../data/constants.js";

export default function HeroBanner({ onViewProduct }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-[60px] px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className=" order-2 lg:order-1 text-center lg:text-left">
          <span className="inline-block bg-rose-500 text-white text-xs font-bold py-1 px-3 rounded-full mb-4 lg:mb-5">
            🔥 Flash Sale – until 03/01
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-black leading-tight mb-3 lg:mb-4">
            Genuine US products
            <br />
            <span className="text-rose-400">Shipped To You</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-6 lg:mb-7 leading-relaxed max-w-md mx-auto lg:mx-0">
            Skincare, vitamins, electronics từ Mỹ. Deliver 7–14 days. Guarantee
            100% US products.
          </p>
          <div className="flex gap-3 justify-center lg:justify-start">
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
              className="bg-rose-500 text-white border-none rounded-[18px] py-3.5 px-7 font-extrabold text-[15px] cursor-pointer hover:bg-rose-600 transition-colors"
            >
              Buy Now →
            </button>
            <button className="bg-transparent text-slate-400 border border-slate-700 rounded-[18px] py-3.5 px-7 font-bold text-[15px] cursor-pointer hover:border-slate-500 hover:text-slate-300 transition-colors">
              More Information
            </button>
          </div>
          <div className="flex gap-5 justify-center lg:justify-start mt-7">
            {[
              "🔐 SSL",
              "🇺🇸 Product",
              "🚢 7-14 days",
              "↩️ return/exchange 30 days",
            ].map((t) => (
              <span key={t} className="text-xs text-slate-500">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 order-1 lg:order-2 gap-2.5 md:gap-3 max-w-xl mx-auto lg:max-w-none lg:mx-0">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onViewProduct(p)}
              className="rounded-2xl overflow-hidden aspect-square cursor-pointer opacity-85 group"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
