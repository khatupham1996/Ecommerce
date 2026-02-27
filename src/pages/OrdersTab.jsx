import { ORDER_TABLE_HEADERS, STATUS, STATUS_BG } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

export default function OrdersTab({ orders, setOrders }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {ORDER_TABLE_HEADERS.map((h) => (
              <th
                key={h}
                className="py-3.5 px-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
            >
              <td className="py-3.5 px-4 font-extrabold font-mono text-gray-900">
                {o.id}
              </td>
              <td className="py-3.5 px-4 font-semibold">{o.user}</td>
              <td className="py-3.5 px-4 text-gray-500">{o.items}</td>
              <td className="py-3.5 px-4 font-extrabold text-rose-500">
                {fmt(o.total)}
              </td>
              <td className="py-3.5 px-4 text-gray-400 text-xs">{o.date}</td>
              <td className="py-3.5 px-4">
                <span
                  className={`py-0.5 px-2.5 rounded-full text-[11px] font-semibold ${STATUS_BG[o.status]}`}
                >
                  {STATUS[o.status].label}
                </span>
              </td>
              <td className="py-3.5 px-4">
                <select
                  value={o.status}
                  onChange={(e) =>
                    setOrders(
                      orders.map((x) =>
                        x.id === o.id ? { ...x, status: e.target.value } : x,
                      ),
                    )
                  }
                  className="border-[1.5px] border-gray-200 rounded-[10px] py-1 px-2 text-xs outline-none bg-white focus:border-rose-300 transition-colors"
                >
                  {Object.entries(STATUS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
