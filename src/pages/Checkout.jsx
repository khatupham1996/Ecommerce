import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ui/AppContext.jsx";
import { COUPONS_MOCK, PAYMENTS } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";
import { useProvinces } from "../hooks/useProvinces.js";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, setCart } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "stripe",
    coupon: "",
  });
  const [coupon, setCoupon] = useState(null);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [orderId] = useState(`ORD-${Math.floor(Math.random() * 9000 + 1000)}`);
  const { provinces, districts, wards, loading, fetchDistricts, fetchWards } =
    useProvinces();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = sub >= 3000000 ? 0 : 150000;
  const discount = coupon
    ? coupon.discount_type === "percentage"
      ? Math.round((sub * coupon.discount_value) / 100)
      : coupon.discount_value
    : 0;
  const total = sub + ship - discount;

  const applyCoupon = () => {
    const c = COUPONS_MOCK.find(
      (c) => c.code === form.coupon.toUpperCase() && c.is_active,
    );
    if (!c) {
      setErr("Mã không hợp lệ");
      setCoupon(null);
    } else {
      setCoupon(c);
      setErr("");
    }
  };

  //Order Success
  if (done)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 text-center max-w-[420px] w-full shadow-[0 20px 60px rgba(0,0,0,.1)]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
            ✅
          </div>
          <h2 className="text-2xl font-black text-sky-950 mb-2">
            Order Completed!
          </h2>
          <p className="text-gray-500 mb-1">Order Numbers</p>
          <p className="text-2xl font-black text-red-500 font-mono mb-4">
            {orderId}
          </p>
          <div className="bg-yellow-50 border border-yellow-100 py-3 px-4 rounded-2xl text-xs text-orange-800 mb-6">
            🚢 Deliver from US to VietNam within <b>7–14 business days</b>
          </div>
          <button
            onClick={() => {
              setCart([]);
              navigate("/");
            }}
            className="w-full bg-red-500 text-white border-none rounded-2xl py-4 px-0 font-extrabold text-[15px] cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );

  // ─── Checkout Form ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-solid border-gray-50 py-4 px-6 flex items-center gap-4 sticky t-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="border-none bg-none cursor-pointer text-xl text-gray-400"
        >
          ←
        </button>
        <h1 className="text-xl font-extrabold text-slate-900">Check Out</h1>
      </div>
      <div className="max-w-4xl mx-auto py-7 px-4 grid grid-cols-[1fr_340px] gap-6">
        <div className="flex flex-col gap-5">
          {/* Shipping */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0 1px 8px rgba(0,0,0,.06)]">
            <h3 className="font-extrabold mb-5">📦 Shipping Address</h3>
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              {[
                ["name", "Name", "Kha Tu Pham"],
                ["phone", "Phone Number", "0901234567"],
              ].map(([k, l, p]) => (
                <div key={k}>
                  <label className="text-xs text-gray-500 font-semibold block mb-[6px]">
                    {l}
                  </label>
                  <input
                    value={form[k]}
                    onChange={set(k)}
                    placeholder={p}
                    className="w-full border border-solid border-gray-300 rounded-xl py-3 px-4 text-xs outline-none box-border"
                  />
                </div>
              ))}
              <div
                // gridColumn: "1/-1"-> grid col-span-full
                className="grid col-span-full"
              >
                <label className="text-xs text-gray-500 font-semibold block mb-2">
                  Address
                </label>
                <input
                  className="w-full border border-solid border-gray-300 rounded-xl py-3 px-4 text-xs outline-none box-border"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="430 Phạm Văn Đồng, Nghĩa Hành, Quảng Ngãi"
                />
              </div>

              <div className="col-span-full grid grid-cols-3 gap-4">
                {/* Province */}
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-2">
                    Province
                  </label>
                  <select
                    value={form.province}
                    onChange={(e) => {
                      set("province")(e);
                      set("district")({ target: { value: "" } });
                      set("ward")({ target: { value: "" } });
                      fetchDistricts(e.target.value);
                    }}
                    className="w-full border border-solid border-gray-300 rounded-xl py-3 px-4 text-xs outline-none box-border"
                  >
                    <option value="">-- Province --</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-2">
                    District
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => {
                      set("district")(e);
                      set("ward")({ target: { value: "" } });
                      fetchWards(e.target.value);
                    }}
                    disabled={!districts.length}
                    className="w-full border border-solid border-gray-300 rounded-xl py-3 px-4 text-xs outline-none box-border disabled:bg-gray-100"
                  >
                    <option value="">-- District --</option>
                    {districts.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ward */}
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-2">
                    Ward
                  </label>
                  <select
                    value={form.ward}
                    onChange={set("ward")}
                    disabled={!wards.length}
                    className="w-full border border-solid border-gray-300 rounded-xl py-3 px-4 text-xs outline-none box-border disabled:bg-gray-100"
                  >
                    <option value="">-- Ward --</option>
                    {wards.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-[0 1px 8px rgba(0,0,0,.06)]">
            <h3 className="font-extrabold mb-5">💳 Payment Methods</h3>
            <div className="grid grid-cols-[1fr_1fr] gap-3">
              {PAYMENTS.map(([k, l, d]) => (
                <button
                  key={k}
                  onClick={() => setForm({ ...form, payment: k })}
                  className={`rounded-2xl py-3 px-4 text-left cursor-pointer transition-all duration-[150] border-2  ${form.payment === k ? "border-red-400" : "border-slate-200"} ${form.payment === k ? "bg-red-50" : "bg-white"}`}
                >
                  <p className="text-xs font-bold">{l}</p>
                  <p className="text-xs text-slate-400 mt-1">{d}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-2xl p-6 shadow-[0 1px 8px rgba(0,0,0,.06)]">
            <h3 className="font-extrabold mb-4">🎫 Coupons</h3>
            <div className="flex gap-3">
              <input
                value={form.coupon}
                onChange={set("coupon")}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                placeholder="WELCOME10"
                className="flex-1 border-2 border-solid border-slate-200 rounded-xl py-3 px-4 text-xs outline-none"
              />
              <button
                className="bg-slate-950 text-white border-none rounded-xl py-0 px-5 font-bold text-xs cursor-pointer"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>
            {err && <p className="text-red-500 text-xs mt-2">{err}</p>}
            {coupon && (
              <p className="text-green-500 text-xs mt-2 font-semibold">
                ✅ Discount{" "}
                {coupon.discount_type === "percentage"
                  ? `${coupon.discount_value}%`
                  : fmt(coupon.discount_value)}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[20px] p-5 shadow-[0 1px 8px rgba(0,0,0,.06)]  self-start sticky top-[70px]">
          <h3 className="font-extrabold mb-4">Items ({cart.length})</h3>
          <div className="max-h-[220px] overflow-y-auto flex flex-col gap-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 font-semibold line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500 ">x{item.qty}</p>
                </div>
                <p className="text-xs font-bold">
                  {fmt(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex flex-col gap-2">
            {[
              ["Price", fmt(sub)],
              ["Shipping", ship === 0 ? "Free 🎉" : fmt(ship)],
            ].map(([l, v]) => (
              <div
                key={l}
                className="flex justify-between text-xs text-neutral-500"
              >
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
            {discount > 0 && (
              <div className="flex justify-between text-xs text-green-500">
                <span>Discount</span>
                <span>−{fmt(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-[16px] pt-2 border-t border-solid border-gray-200">
              <span>Total</span>
              <span style={{ color: "#f43f5e", fontSize: 18 }}>
                {fmt(total)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setDone(true)}
            className="w-full mt-4 bg-red-500 text-white border-none py-3 px-0 font-extrabold text-xs cursor-pointer rounded-2xl"
          >
            Order Confirmation →
          </button>
        </div>
      </div>
    </div>
  );
}
