import { useState } from "react";
import Stars from "./Stars";
import { CATEGORIES, BADGE_CLS } from "../data/constants.js";
import { fmt, disc } from "../utils/helpers.js";

export default function ProductCard({ p, onAdd, onView }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const pct = disc(p.price, p.originalPrice);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div
      onClick={() => onView(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        cursor: "pointer",
        transition: "all .25s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover
          ? "0 16px 40px rgba(0,0,0,.1)"
          : "0 1px 4px rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "1",
          background: "#f9fafb",
          overflow: "hidden",
        }}
      >
        <img
          src={p.image}
          alt={p.name}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80";
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .5s",
            transform: hover ? "scale(1.07)" : "scale(1)",
          }}
        />
        {p.badge && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: BADGE_CLS[p.badge] || "#666",
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
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#10b981",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 7px",
            borderRadius: 20,
          }}
        >
          -{pct}%
        </span>
        {hover && (
          <button
            onClick={handleAdd}
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              right: 10,
              background: added ? "#10b981" : "#111",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "9px 0",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background .2s",
            }}
          >
            {added ? "✓ Added!" : "+ Add to cart"}
          </button>
        )}
      </div>

      <div style={{ padding: "14px 14px 16px" }}>
        <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
          {CATEGORIES.find((c) => c.id === p.category_id)?.name}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1f2937",
            lineHeight: 1.4,
            marginBottom: 8,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {p.name}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <Stars r={Math.floor(p.rating)} />
          <span style={{ fontSize: 10, color: "#9ca3af" }}>({p.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ color: "#f43f5e", fontWeight: 800, fontSize: 15 }}>
            {fmt(p.price)}
          </span>
          <span
            style={{
              color: "#d1d5db",
              fontSize: 11,
              textDecoration: "line-through",
            }}
          >
            {fmt(p.originalPrice)}
          </span>
        </div>
        {p.stock <= 5 && (
          <p
            style={{
              fontSize: 10,
              color: "#f97316",
              marginTop: 4,
              fontWeight: 600,
            }}
          >
            ⚠ {p.stock} items left
          </p>
        )}
      </div>
    </div>
  );
}
