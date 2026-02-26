import Stars from "../components/Stars.jsx";
import { STATUS } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

const STATUS_BG = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function DashboardTab({ stats, orders, products }) {
  const revenue6 = [65, 80, 45, 90, 72, 100];
  const months = ["Th8", "Th9", "Th10", "Th11", "Th12", "Th1"];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div
              className={`w-11 h-11 ${s.bg} rounded-[14px] flex items-center justify-center text-xl mb-3.5`}
            >
              {s.icon}
            </div>
            <p className="text-[22px] font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-extrabold mb-5">Revenue 6 months</h3>
        <div className="flex items-end gap-3 h-40">
          {revenue6.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg min-h-[8px]"
                style={{ height: `${h}%` }}
              />
              <span className="text-[11px] text-gray-400 font-semibold">
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders + Trending */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-extrabold mb-4">Recently Orders</h3>
          {orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              className="flex items-center justify-between py-2.5 border-b border-gray-50"
            >
              <div>
                <p className="text-[13px] font-bold font-mono">{o.id}</p>
                <p className="text-[11px] text-gray-400">{o.user}</p>
              </div>
              <span
                className={`py-0.5 px-2.5 rounded-full text-[11px] font-semibold ${STATUS_BG[o.status]}`}
              >
                {STATUS[o.status].label}
              </span>
              <p className="text-[13px] font-bold">{fmt(o.total)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-extrabold mb-4">Trending Items</h3>
          {[...products]
            .sort((a, b) => b.reviews - a.reviews)
            .slice(0, 4)
            .map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 py-2 border-b border-gray-50"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-9 h-9 rounded-[10px] object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-1">{p.name}</p>
                  <Stars r={Math.floor(p.rating)} />
                </div>
                <p className="text-[13px] font-extrabold text-rose-500">
                  {fmt(p.price)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
