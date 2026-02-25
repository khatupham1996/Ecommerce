import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars.jsx";
import {
  PRODUCTS,
  ORDERS_MOCK,
  COUPONS_MOCK,
  CATEGORIES,
  STATUS,
} from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(ORDERS_MOCK);
  const [showForm, setShowForm] = useState(false);
  const [newP, setNewP] = useState({ name: "", price: "", stock: "" });

  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: "Revenue", value: fmt(revenue), icon: "💰", bg: "#d1fae5" },
    { label: "Orders", value: orders.length, icon: "📦", bg: "#dbeafe" },
    { label: "Products", value: products.length, icon: "🏷️", bg: "#ede9fe" },
    { label: "Customers", value: 156, icon: "👥", bg: "#fef3c7" },
  ];

  const NAV = [
    ["dashboard", "📊", "Dashboard"],
    ["products", "🏷️", "Products"],
    ["orders", "📦", "Orders"],
    ["customers", "👥", "Customers"],
    ["coupons", "🎫", "Coupons"],
    ["reports", "📈", "Reports"],
  ];
  const revenue6 = [65, 80, 45, 90, 72, 100];
  const months = ["Th8", "Th9", "Th10", "Th11", "Th12", "Th1"];

  const statusBgMap = {
    "bg-yellow-100": "#fef9c3",
    "bg-blue-100": "#dbeafe",
    "bg-purple-100": "#ede9fe",
    "bg-green-100": "#d1fae5",
    "bg-red-100": "#fee2e2",
  };
  const getStatusBg = (status) => {
    const cls = STATUS[status].cls.split(" ")[0];
    return statusBgMap[cls] || "#f3f4f6";
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui,sans-serif",
        background: "#f9fafb",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          background: "#030712",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "22px 24px", borderBottom: "1px solid #1f2937" }}>
          <p
            style={{
              fontSize: 10,
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            Admin Panel
          </p>
          <h2 style={{ fontWeight: 900, fontSize: 16 }}>🇺🇸 USAShop 🇻🇳</h2>
        </div>
        <nav
          style={{
            flex: 1,
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV.map(([k, icon, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 16px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: tab === k ? "#f43f5e" : "transparent",
                color: tab === k ? "#fff" : "#9ca3af",
                transition: "all .2s",
                textAlign: "left",
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 12px 20px", borderTop: "1px solid #1f2937" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 16px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: "transparent",
              color: "#6b7280",
              width: "100%",
            }}
          >
            🛒 Return Main Page
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #f3f4f6",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h1 style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>
            {NAV.find((n) => n[0] === tab)?.[2]}
          </h1>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "linear-gradient(135deg,#f43f5e,#a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 14,
            }}
          >
            A
          </div>
        </div>

        <div style={{ padding: 28, flex: 1 }}>
          {/* ─── Dashboard ─── */}
          {tab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: 20,
                      boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: s.bg,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        marginBottom: 14,
                      }}
                    >
                      {s.icon}
                    </div>
                    <p style={{ fontSize: 22, fontWeight: 900, color: "#111827" }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Chart */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                }}
              >
                <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Revenue 6 months</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
                  {revenue6.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: `${h}%`,
                          background: "linear-gradient(to top,#e11d48,#fb7185)",
                          borderRadius: "8px 8px 0 0",
                          minHeight: 8,
                        }}
                      />
                      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>
                        {months[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Recent orders + trending */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 22,
                    boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                  }}
                >
                  <h3 style={{ fontWeight: 800, marginBottom: 16 }}>Recently Orders</h3>
                  {orders.slice(0, 4).map((o) => (
                    <div
                      key={o.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #f9fafb",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>
                          {o.id}
                        </p>
                        <p style={{ fontSize: 11, color: "#9ca3af" }}>{o.user}</p>
                      </div>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: getStatusBg(o.status),
                        }}
                      >
                        {STATUS[o.status].label}
                      </span>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{fmt(o.total)}</p>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 22,
                    boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                  }}
                >
                  <h3 style={{ fontWeight: 800, marginBottom: 16 }}>Trending Items</h3>
                  {[...products]
                    .sort((a, b) => b.reviews - a.reviews)
                    .slice(0, 4)
                    .map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "8px 0",
                          borderBottom: "1px solid #f9fafb",
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {p.name}
                          </p>
                          <Stars r={Math.floor(p.rating)} />
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "#f43f5e" }}>
                          {fmt(p.price)}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Products ─── */}
          {tab === "products" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    background: "#f43f5e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "10px 20px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  + Add Item
                </button>
              </div>
              {showForm && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 22,
                    boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                    border: "2px solid #fff1f2",
                  }}
                >
                  <h3 style={{ fontWeight: 800, marginBottom: 18 }}>Thêm sản phẩm mới</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    {[
                      ["name", "Tên sản phẩm"],
                      ["price", "Giá (VND)"],
                      ["stock", "Tồn kho"],
                    ].map(([k, l]) => (
                      <div key={k} style={{ gridColumn: k === "name" ? "1/-1" : "auto" }}>
                        <label
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            fontWeight: 600,
                            display: "block",
                            marginBottom: 6,
                          }}
                        >
                          {l}
                        </label>
                        <input
                          value={newP[k]}
                          onChange={(e) => setNewP({ ...newP, [k]: e.target.value })}
                          placeholder={l}
                          style={{
                            width: "100%",
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 12,
                            padding: "10px 14px",
                            fontSize: 13,
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <button
                      onClick={() => {
                        if (newP.name) {
                          setProducts([
                            ...products,
                            {
                              ...newP,
                              id: Date.now(),
                              price: +newP.price || 0,
                              originalPrice: (+newP.price || 0) * 1.25,
                              stock: +newP.stock || 0,
                              category_id: 1,
                              rating: 5,
                              reviews: 0,
                              image:
                                "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
                              badge: "New",
                            },
                          ]);
                          setShowForm(false);
                          setNewP({ name: "", price: "", stock: "" });
                        }
                      }}
                      style={{
                        background: "#f43f5e",
                        color: "#fff",
                        border: "none",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      style={{
                        border: "1.5px solid #e5e7eb",
                        background: "#fff",
                        borderRadius: 12,
                        padding: "10px 20px",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                      {["Items", "Category", "Price", "Stocks", "Rating", "Delete"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "14px 18px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                objectFit: "cover",
                              }}
                            />
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#1f2937",
                                maxWidth: 180,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px", color: "#6b7280" }}>
                          {CATEGORIES.find((c) => c.id === p.category_id)?.name}
                        </td>
                        <td style={{ padding: "14px 18px", fontWeight: 800, color: "#f43f5e" }}>
                          {fmt(p.price)}
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: 10,
                              fontSize: 11,
                              fontWeight: 700,
                              background:
                                p.stock > 20 ? "#d1fae5" : p.stock > 5 ? "#fef9c3" : "#fee2e2",
                              color:
                                p.stock > 20 ? "#065f46" : p.stock > 5 ? "#92400e" : "#991b1b",
                            }}
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <Stars r={Math.floor(p.rating)} />
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <button
                            onClick={() => setProducts(products.filter((x) => x.id !== p.id))}
                            style={{
                              color: "#ef4444",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Orders ─── */}
          {tab === "orders" && (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 1px 8px rgba(0,0,0,.06)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                    {["Order Number", "Customers", "Items", "Total", "Date", "Status", "Update Status"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: "14px 18px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                      <td
                        style={{
                          padding: "14px 18px",
                          fontWeight: 800,
                          fontFamily: "monospace",
                          color: "#111827",
                        }}
                      >
                        {o.id}
                      </td>
                      <td style={{ padding: "14px 18px", fontWeight: 600 }}>{o.user}</td>
                      <td style={{ padding: "14px 18px", color: "#6b7280" }}>{o.items}</td>
                      <td style={{ padding: "14px 18px", fontWeight: 800, color: "#f43f5e" }}>
                        {fmt(o.total)}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#9ca3af", fontSize: 12 }}>
                        {o.date}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            background: getStatusBg(o.status),
                          }}
                        >
                          {STATUS[o.status].label}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            setOrders(
                              orders.map((x) =>
                                x.id === o.id ? { ...x, status: e.target.value } : x
                              )
                            )
                          }
                          style={{
                            border: "1.5px solid #e5e7eb",
                            borderRadius: 10,
                            padding: "5px 8px",
                            fontSize: 12,
                            outline: "none",
                            background: "#fff",
                          }}
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
          )}

          {/* ─── Customers ─── */}
          {tab === "customers" && (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 22,
                boxShadow: "0 1px 8px rgba(0,0,0,.06)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Nguyễn Văn A", "a@email.com", "user", 5, "8,200,000đ"],
                  ["Trần Thị B", "b@email.com", "user", 2, "1,800,000đ"],
                  ["Admin System", "admin@usashop.vn", "admin", 0, "—"],
                  ["Lê Văn Staff", "staff@usashop.vn", "staff", 1, "6,200,000đ"],
                ].map(([n, e, r, o, s]) => (
                  <div
                    key={e}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 0",
                      borderBottom: "1px solid #f9fafb",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 14,
                        background: "linear-gradient(135deg,#f43f5e,#a855f7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: 16,
                      }}
                    >
                      {n[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{n}</p>
                      <p style={{ fontSize: 12, color: "#9ca3af" }}>{e}</p>
                    </div>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                        background:
                          r === "admin" ? "#fff1f2" : r === "staff" ? "#ede9fe" : "#f3f4f6",
                        color: r === "admin" ? "#e11d48" : r === "staff" ? "#7c3aed" : "#374151",
                      }}
                    >
                      {r}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{o} Orders</p>
                      <p style={{ fontSize: 12, color: "#f43f5e", fontWeight: 700 }}>{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Coupons ─── */}
          {tab === "coupons" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {COUPONS_MOCK.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                    border: `2px dashed ${c.is_active ? "#bbf7d0" : "#e5e7eb"}`,
                    opacity: c.is_active ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: c.is_active ? "#34d399" : "#d1d5db",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          color: c.is_active ? "#059669" : "#9ca3af",
                          fontWeight: 600,
                        }}
                      >
                        {c.is_active ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      fontFamily: "monospace",
                      letterSpacing: 3,
                      color: "#111827",
                      marginBottom: 8,
                    }}
                  >
                    {c.code}
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 900, color: "#f43f5e" }}>
                    {c.discount_type === "percentage"
                      ? `-${c.discount_value}%`
                      : `-${fmt(c.discount_value)}`}
                  </p>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
                    HSD: {c.expiry_date}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ─── Reports ─── */}
          {tab === "reports" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                {[
                  ["💰 Monthly Revenue", "63,000,000đ", "+15.2%", "up"],
                  ["📦 New Orders", "47", "+8.1%", "up"],
                  ["↩️ Return rate", "2.3%", "-0.5%", "down"],
                ].map(([l, v, g, d]) => (
                  <div
                    key={l}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: 22,
                      boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                    }}
                  >
                    <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>{l}</p>
                    <p style={{ fontSize: 26, fontWeight: 900, color: "#111827" }}>{v}</p>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 8,
                        background: d === "up" ? "#d1fae5" : "#fee2e2",
                        color: d === "up" ? "#065f46" : "#991b1b",
                      }}
                    >
                      {g}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 1px 8px rgba(0,0,0,.06)",
                }}
              >
                <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Monthly Revenue</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 180 }}>
                  {revenue6.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: `${h}%`,
                          background: "linear-gradient(to top,#e11d48,#fb7185)",
                          borderRadius: "10px 10px 0 0",
                          minHeight: 8,
                        }}
                      />
                      <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>
                        {months[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
