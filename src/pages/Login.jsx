import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ui/AppContext.jsx";
import { ACCESS, MEDIA } from "../data/constants.js";
export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = () => {
    setUser({ name: form.name || "Khách hàng", email: form.email });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff1f2,#fff,#fdf4ff)] flex items-center justify-center p-6">
      <div className="bg-gray-100 rounded-3xl p-10 max-w-md w-full shadow-[0 20px 60px rgba(0,0,0,.12)]">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-black text-sky-950">🇺🇸USAShop🇻🇳</h1>
          <p className="text-gray-400 text-xs mt-1">
            Authentic U.S. products, delivered to Vietnam fast.
          </p>
        </div>
        <div className="flex bg-slate-0 rounded-2xl p-1 mb-6">
          {ACCESS.map(([k, l]) => (
            <button
              className={`flex-1 py-3 px-0 rounded-xl border-none cursor-pointer text-xs font-bold ${mode === k ? "bg-white" : "bg-transparent"} ${mode === k ? "text-sky-950" : "text-gray-400"} ${mode === k ? "shadow-[0 1px 6px rgba(0,0,0,.1)]" : "none"} transition-all duration-200 `}
              key={k}
              onClick={() => setMode(k)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 ">
          {mode === "register" && (
            <div>
              <label className="text-xs text-gray-400 font-semibold block mb-6">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="Enter your full name"
                className="w-full rounded-sm border-gray-200 py-3 px-4 text-xs outline-none box-border"
              />
            </div>
          )}
          <div>
            <label className="text-xs text-gray-500 font-semibold block mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="email@example.com"
              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-xs outline-none box-border"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold block mb-2">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 text-xs outline-none box-border"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white border-none rounded-2xl font-extrabold text-[15px] cursor-pointer mt-1 py-4"
          >
            {mode === "login" ? "Login" : "Create An Account"}
          </button>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-3 mt-5">
          {MEDIA.map(([i, n]) => (
            <button
              key={n}
              className="border border-solid border-gray-200 bg-white
              rounded-xl py-3 px-0 font-semibold cursor-pointer flex items-center justify-center gap-2"
            >
              {i} {n}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="block mt-4 mx-auto text-xl font-semibold bg-none border-none cursor-pointer"
        >
          ← Main Page
        </button>
      </div>
    </div>
  );
}
