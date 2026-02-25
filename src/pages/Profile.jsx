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
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #f3f4f6",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
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
        <h1 style={{ fontWeight: 800, fontSize: 17 }}>Tài khoản của tôi</h1>
      </div>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Profile card */}
        <div
          style={{
            borderRadius: 24,
            padding: "24px 28px",
            background: "linear-gradient(135deg,#f43f5e,#a855f7)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "rgba(255,255,255,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 26,
            }}
          >
            {(user?.name || "K")[0]}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900 }}>
              {user?.name || "Khách hàng"}
            </h2>
            <p style={{ opacity: 0.75, fontSize: 13 }}>{user?.email}</p>
            <span
              style={{
                background: "rgba(255,255,255,.25)",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                fontWeight: 700,
                display: "inline-block",
                marginTop: 6,
              }}
            >
              Thành viên VIP
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
          }}
        >
          {[
            ["Đơn hàng", 3],
            ["Yêu thích", 5],
            ["Điểm thưởng", "1.250"],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "16px 0",
                textAlign: "center",
                boxShadow: "0 1px 8px rgba(0,0,0,.06)",
              }}
            >
              <p style={{ fontSize: 22, fontWeight: 900, color: "#111827" }}>
                {v}
              </p>
              <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                {l}
              </p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 1px 8px rgba(0,0,0,.06)",
          }}
        >
          <h3 style={{ fontWeight: 800, marginBottom: 14 }}>
            Đơn hàng gần đây
          </h3>
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #f9fafb",
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    fontFamily: "monospace",
                  }}
                >
                  {o.id}
                </p>
                <p style={{ fontSize: 11, color: "#9ca3af" }}>
                  {o.date} · {o.items} sản phẩm
                </p>
              </div>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                }}
                className={STATUS[o.status].cls}
              >
                {STATUS[o.status].label}
              </span>
              <p style={{ fontWeight: 800, color: "#f43f5e" }}>
                {fmt(o.total)}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            border: "2px solid #fecaca",
            background: "#fff",
            color: "#ef4444",
            borderRadius: 18,
            padding: "14px 0",
            fontWeight: 800,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
