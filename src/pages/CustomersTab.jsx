const ROLE_STYLE = {
  admin: "bg-rose-50 text-rose-600",
  staff: "bg-violet-100 text-violet-600",
  user: "bg-gray-100 text-gray-700",
};

const CUSTOMERS = [
  ["Nguyễn Văn A", "a@email.com", "user", 5, "8,200,000đ"],
  ["Trần Thị B", "b@email.com", "user", 2, "1,800,000đ"],
  ["Admin System", "admin@usashop.vn", "admin", 0, "—"],
  ["Lê Văn Staff", "staff@usashop.vn", "staff", 1, "6,200,000đ"],
];

export default function CustomersTab() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col gap-3.5">
        {CUSTOMERS.map(([n, e, r, o, s]) => (
          <div
            key={e}
            className="flex items-center gap-4 py-3.5 border-b border-gray-50"
          >
            <div className="w-[42px] h-[42px] rounded-[14px] bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-white font-black text-base">
              {n[0]}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{n}</p>
              <p className="text-xs text-gray-400">{e}</p>
            </div>
            <span
              className={`py-1 px-3 rounded-full text-[11px] font-bold ${ROLE_STYLE[r]}`}
            >
              {r}
            </span>
            <div className="text-right">
              <p className="text-[13px] font-bold">{o} Orders</p>
              <p className="text-xs text-rose-500 font-bold">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
