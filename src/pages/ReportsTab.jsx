export default function ReportsTab() {
  const revenue6 = [65, 80, 45, 90, 72, 100];
  const months = ["Th8", "Th9", "Th10", "Th11", "Th12", "Th1"];

  const metrics = [
    ["💰 Monthly Revenue", "63,000,000đ", "+15.2%", "up"],
    ["📦 New Orders", "47", "+8.1%", "up"],
    ["↩️ Return rate", "2.3%", "-0.5%", "down"],
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(([l, v, g, d]) => (
          <div key={l} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-2.5">{l}</p>
            <p className="text-[26px] font-black text-gray-900">{v}</p>
            <span
              className={`text-xs font-bold py-0.5 px-2 rounded-lg ${
                d === "up"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {g}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-extrabold mb-5">Monthly Revenue</h3>
        <div className="flex items-end gap-3.5 h-[180px]">
          {revenue6.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-[10px] min-h-[8px]"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-gray-400 font-semibold">
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
