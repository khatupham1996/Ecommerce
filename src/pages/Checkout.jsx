import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ui/AppContext.jsx";
import { COUPONS_MOCK } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

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
      (c) => c.code === form.coupon.toUpperCase() && c.is_active
    );
    if (!c) {
      setErr("Mã không hợp lệ");
      setCoupon(null);
    } else {
      setCoupon(c);
      setErr("");
    }
  };

  // ─── Order Success ────────────────────────────────────────────────────
  if (done)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: 48,
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,.1)",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "#d1fae5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              margin: "0 auto 20px",
            }}
          >
            ✅
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Đặt hàng thành công!
          </h2>
          <p style={{ color: "#6b7280", marginBottom: 4 }}>Mã đơn hàng</p>
          <p
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#f43f5e",
              fontFamily: "monospace",
              marginBottom: 16,
            }}
          >
            {orderId}
          </p>
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 16,
              padding: "12px 16px",
              fontSize: 13,
              color: "#92400e",
              marginBottom: 24,
            }}
          >
            🚢 Giao từ Mỹ về VN trong <b>7–14 ngày làm việc</b>
          </div>
          <button
            onClick={() => {
              setCart([]);
              navigate("/");
            }}
            style={{
              width: "100%",
              background: "#f43f5e",
              color: "#fff",
              border: "none",
              borderRadius: 18,
              padding: "14px 0",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );

  // ─── Checkout Form ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "#9ca3af",
          }}
        >
          ←
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>
          Check Out
        </h1>
      </div>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "28px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Shipping */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 1px 8px rgba(0,0,0,.06)",
            }}
          >
            <h3 style={{ fontWeight: 800, marginBottom: 20 }}>
              📦 Shipping Address
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {[
                ["name", "Name", "Kha Tu Pham"],
                ["phone", "Phone Number", "0901234567"],
              ].map(([k, l, p]) => (
                <div key={k}>
                  <label
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {l}
                  </label>
                  <input
                    value={form[k]}
                    onChange={set(k)}
                    placeholder={p}
                    style={{
                      width: "100%",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 12,
                      padding: "11px 14px",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Address
                </label>
                <input
                  value={form.address}
                  onChange={set("address")}
                  placeholder="430 Phạm Văn Đồng, Nghĩa Hành, Quảng Ngãi"
                  style={{
                    width: "100%",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "11px 14px",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Province
                </label>
                <select
                  value={form.city}
                  onChange={set("city")}
                  style={{
                    width: "100%",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "11px 14px",
                    fontSize: 13,
                    outline: "none",
                    background: "#fff",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">-- Choose --</option>
                  {[
                    "Hà Nội",
                    "TP. Hồ Chí Minh",
                    "Đà Nẵng",
                    "Cần Thơ",
                    "Hải Phòng",
                    "Nha Trang",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 1px 8px rgba(0,0,0,.06)",
            }}
          >
            <h3 style={{ fontWeight: 800, marginBottom: 20 }}>
              💳 Payment Methods
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                ["stripe", "💳 Stripe / Visa", "International Card"],
                ["paypal", "🅿️ PayPal", "PayPal Wallet"],
                ["momo", "🟣 MoMo", "MoMo Wallet"],
                ["cod", "💵 COD", "Cash"],
              ].map(([k, l, d]) => (
                <button
                  key={k}
                  onClick={() => setForm({ ...form, payment: k })}
                  style={{
                    border: `2px solid ${
                      form.payment === k ? "#f43f5e" : "#e5e7eb"
                    }`,
                    background: form.payment === k ? "#fff1f2" : "#fff",
                    borderRadius: 16,
                    padding: "14px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{l}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    {d}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 1px 8px rgba(0,0,0,.06)",
            }}
          >
            <h3 style={{ fontWeight: 800, marginBottom: 16 }}>🎫 Coupons</h3>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={form.coupon}
                onChange={set("coupon")}
                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                placeholder="WELCOME10"
                style={{
                  flex: 1,
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                onClick={applyCoupon}
                style={{
                  background: "#111827",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "0 20px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
            {err && (
              <p style={{ color: "#ef4444", fontSize: 12, marginTop: 8 }}>
                {err}
              </p>
            )}
            {coupon && (
              <p
                style={{
                  color: "#10b981",
                  fontSize: 13,
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                ✅ Giảm{" "}
                {coupon.discount_type === "percentage"
                  ? `${coupon.discount_value}%`
                  : fmt(coupon.discount_value)}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 1px 8px rgba(0,0,0,.06)",
            alignSelf: "start",
            position: "sticky",
            top: 70,
          }}
        >
          <h3 style={{ fontWeight: 800, marginBottom: 16 }}>
            Items ({cart.length})
          </h3>
          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#374151",
                      fontWeight: 600,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>x{item.qty}</p>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700 }}>
                  {fmt(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #f3f4f6",
              paddingTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              ["Price", fmt(sub)],
              ["Shipping", ship === 0 ? "Free 🎉" : fmt(ship)],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                <span>{l}</span>
                <span>{v}</span>
              </div>
            ))}
            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#10b981",
                }}
              >
                <span>Giảm giá</span>
                <span>−{fmt(discount)}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
                fontSize: 16,
                paddingTop: 8,
                borderTop: "1px solid #f3f4f6",
              }}
            >
              <span>Total</span>
              <span style={{ color: "#f43f5e", fontSize: 18 }}>
                {fmt(total)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setDone(true)}
            style={{
              width: "100%",
              marginTop: 18,
              background: "#f43f5e",
              color: "#fff",
              border: "none",
              borderRadius: 16,
              padding: "14px 0",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Order Confirmation →
          </button>
        </div>
      </div>
    </div>
  );
}
