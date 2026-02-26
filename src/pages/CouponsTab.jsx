import { COUPONS_MOCK } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

export default function CouponsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {COUPONS_MOCK.map((c) => (
        <div
          key={c.id}
          className={`bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed ${
            c.is_active
              ? "border-green-200 opacity-100"
              : "border-gray-200 opacity-60"
          }`}
        >
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  c.is_active ? "bg-emerald-400" : "bg-gray-300"
                }`}
              />
              <span
                className={`text-[11px] font-semibold ${
                  c.is_active ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {c.is_active ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
          <p className="text-[22px] font-black font-mono tracking-[3px] text-gray-900 mb-2">
            {c.code}
          </p>
          <p className="text-[22px] font-black text-rose-500">
            {c.discount_type === "percentage"
              ? `-${c.discount_value}%`
              : `-${fmt(c.discount_value)}`}
          </p>
          <p className="text-[11px] text-gray-400 mt-2">HSD: {c.expiry_date}</p>
        </div>
      ))}
    </div>
  );
}
