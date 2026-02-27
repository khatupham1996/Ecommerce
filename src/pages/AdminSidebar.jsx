import { useNavigate } from "react-router-dom";
import { NAV } from "../data/constants";

function AdminSidebar({ tab, setTab }) {
  const navigate = useNavigate();
  return (
    <div className="w-60 bg-gray-950 text-white flex flex-col shrink-0">
      <div className="py-5 px-6 border-b border-gray-800">
        <p className="text-[10px] text-gray-500 uppercase tracking-[2px] mb-1">
          Admin Panel
        </p>
        <h2 className="font-black text-base">🇺🇸 USAShop 🇻🇳</h2>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV.map(([k, icon, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex items-center gap-2.5 py-2.5 px-4 rounded-xl border-none cursor-pointer text-[13px] font-semibold text-left transition-all duration-200
                ${tab === k ? "bg-rose-500 text-white" : "bg-transparent text-gray-400 hover:text-gray-200"}`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="p-3 pb-5 border-t border-gray-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 py-2.5 px-4 rounded-xl border-none cursor-pointer text-[13px] font-semibold bg-transparent text-gray-500 hover:text-gray-300 w-full transition-colors"
        >
          🛒 Return Main Page
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
