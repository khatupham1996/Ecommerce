import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ui/AppContext.jsx";

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#fff1f2,#fff,#fdf4ff)",
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
          padding: 40,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,.12)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827" }}>
            🇺🇸 USAShop 🇻🇳
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>
            Authentic U.S. products, delivered to Vietnam fast.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            background: "#f3f4f6",
            borderRadius: 18,
            padding: 4,
            marginBottom: 24,
          }}
        >
          {[
            ["login", "Login"],
            ["register", "Register"],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                background: mode === k ? "#fff" : "transparent",
                color: mode === k ? "#111827" : "#6b7280",
                boxShadow: mode === k ? "0 1px 6px rgba(0,0,0,.1)" : "none",
                transition: "all .2s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Full Name
              </label>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 14,
                  padding: "12px 16px",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="email@example.com"
              style={{
                width: "100%",
                border: "1.5px solid #e5e7eb",
                borderRadius: 14,
                padding: "12px 16px",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#6b7280",
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              style={{
                width: "100%",
                border: "1.5px solid #e5e7eb",
                borderRadius: 14,
                padding: "12px 16px",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              background: "#f43f5e",
              color: "#fff",
              border: "none",
              borderRadius: 18,
              padding: "14px 0",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            {mode === "login" ? "Login" : "Create An Account"}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 20,
          }}
        >
          {[
            ["🔵", "Google"],
            ["🟦", "Facebook"],
          ].map(([i, n]) => (
            <button
              key={n}
              style={{
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                borderRadius: 14,
                padding: "11px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {i} {n}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "block",
            margin: "16px auto 0",
            fontSize: 13,
            color: "#9ca3af",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Main Page
        </button>
      </div>
    </div>
  );
}
