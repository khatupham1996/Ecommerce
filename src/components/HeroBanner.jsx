import { PRODUCTS } from "../data/constants.js";

export default function HeroBanner({ onViewProduct }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
        color: "#fff",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "#f43f5e",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 20,
              marginBottom: 18,
            }}
          >
            🔥 Flash Sale – until 03/01
          </span>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Genuine US products
            <br />
            <span style={{ color: "#fb7185" }}>Shipped To You</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 16,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Skincare, vitamins, electronics từ Mỹ. Deliver 7–14 days. Guarantee
            100% US products.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() =>
                window.scrollTo({ top: 400, behavior: "smooth" })
              }
              style={{
                background: "#f43f5e",
                color: "#fff",
                border: "none",
                borderRadius: 18,
                padding: "14px 28px",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Buy Now →
            </button>
            <button
              style={{
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: 18,
                padding: "14px 28px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              More Information
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
            {[
              "🔐 SSL",
              "🇺🇸 Product",
              "🚢 7-14 days",
              "↩️ return/exchange 30 days",
            ].map((t) => (
              <span key={t} style={{ fontSize: 12, color: "#64748b" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {PRODUCTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onViewProduct(p)}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "1",
                cursor: "pointer",
                opacity: 0.85,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity .2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.85)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
