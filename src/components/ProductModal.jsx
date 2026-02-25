import { useState } from "react";
import Stars from "./Stars";
import { CATEGORIES, BADGE_CLS } from "../data/constants.js";
import { fmt, disc } from "../utils/helpers.js";

export default function ProductModal({ p, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const pct = disc(p.price, p.originalPrice);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 28,
          maxWidth: 700,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 40px 80px rgba(0,0,0,.2)",
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "28px 0 0 28px",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {p.badge && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: BADGE_CLS[p.badge],
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 20,
                }}
              >
                {p.badge}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  overflow: "hidden",
                  border:
                    i === 0 ? "2px solid #f43f5e" : "2px solid transparent",
                }}
              >
                <img
                  src={p.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div
          style={{
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#f3f4f6",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            ✕
          </button>
          <span
            style={{
              background: "#fff1f2",
              color: "#f43f5e",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 20,
              alignSelf: "flex-start",
              marginBottom: 12,
            }}
          >
            {CATEGORIES.find((c) => c.id === p.category_id)?.name}
          </span>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {p.name}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Stars r={Math.floor(p.rating)} />
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              {p.rating} ({p.reviews} Rating)
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            {p.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span style={{ color: "#f43f5e", fontWeight: 900, fontSize: 26 }}>
              {fmt(p.price)}
            </span>
            <span
              style={{
                color: "#d1d5db",
                textDecoration: "line-through",
                fontSize: 16,
              }}
            >
              {fmt(p.originalPrice)}
            </span>
            <span
              style={{
                background: "#ecfdf5",
                color: "#059669",
                fontSize: 12,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 8,
              }}
            >
              -{pct}%
            </span>
          </div>
          <div
            style={{
              background: "#fffbeb",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 13,
              color: "#92400e",
              marginBottom: 18,
              fontWeight: 500,
            }}
          >
            🚢 Delivery from USA to VietNam within 7–14 days · <b>{p.stock}</b>{" "}
            left
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>
              Quantity
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "#f3f4f6",
                borderRadius: 14,
                padding: 4,
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  border: "none",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                −
              </button>
              <span style={{ width: 32, textAlign: "center", fontWeight: 700 }}>
                {qty}
              </span>
              <button
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  border: "none",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              onAdd(p, qty);
              onClose();
            }}
            style={{
              background: "#f43f5e",
              color: "#fff",
              border: "none",
              borderRadius: 18,
              padding: "14px 0",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              marginTop: "auto",
            }}
          >
            🛒 Add to your cart
          </button>
        </div>
      </div>
    </div>
  );
}
