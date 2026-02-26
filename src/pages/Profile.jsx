import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ui/AppContext.jsx";
import { ORDERS_MOCK, STATUS } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const orders = ORDERS_MOCK.slice(0, 3);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white border border-b-2 border-gray-200 flex py-3 px-6 text-center gap-3">
        <button
          className="border-none bg-none cursor-pointer text-xl text-gray-200"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <h1 className="text-xl font-extrabold">Your account</h1>
      </div>
      <div className="max-w-[600px] mx-auto py-6 px-4 flex flex-col gap-4">
        {/* Profile card */}
        <div className="rounded-3xl py-6 px-7 text-white flex text-center gap-[18px] bg-custom-gradient">
          <div className="w-16 h-16 rounded-[20px] bg-[rgba(255,255,255,.25)] flex items-center justify-center font-black text-3xl">
            {(user?.name || "K")[0]}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900 }}>
              {user?.name || "Customer"}
            </h2>
            <p style={{ opacity: 0.75, fontSize: 13 }}>{user?.email}</p>
            <span className="bg-[rgba(255,255,255,.25)] text-xs py-[3px] px-[10px] rounded-2xl font-bold inline-block mt-2 ">
              VIP Member
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Orders", 3],
            ["Favorites", 5],
            ["Reward points", "1.250"],
          ].map(([l, v]) => (
            <div
              className="bg-white rounded-2xl py-4 text-center shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
              key={l}
            >
              <p className="text-[22px] font-black text-blue-950">{v}</p>
              <p className="text-xs text-gray-400 mt-2">{l}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
          <h3 className="font-extrabold mb-3">Recently Orders</h3>
          {orders.map((o) => (
            <div
              className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 py-3 border-b-2 border-slate-100"
              key={o.id}
            >
              <div className="min-w-0">
                <p className="font-bold text-xs font-mono">{o.id}</p>
                <p className="text-xs text-gray-500">
                  {o.date} · {o.items} items
                </p>
              </div>
              <span
                className={`py-1 px-3 rounded-2xl text-xs w-36 font-semibold ${STATUS[o.status].cls}`}
              >
                {STATUS[o.status].label}
              </span>
              <p className="font-extrabold text-red-500 w-28 text-right">
                {fmt(o.total)}
              </p>
            </div>
          ))}
        </div>

        <button
          className="w-full border-2 border-red-300 bg-white text-red-500 rounded-2xl py-4 font-extrabold cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
