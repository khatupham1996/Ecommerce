export default function Footer() {
  return (
    <footer
      style={{
        background: "#030712",
        color: "#6b7280",
        marginTop: 60,
        padding: "48px 20px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 32,
          marginBottom: 32,
        }}
      >
        <div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            🇺🇸USAShop🇻🇳
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>
            Authentic U.S. products, delivered to Vietnam fast
          </p>
        </div>
        {[
          [
            "Menu",
            ["Cosmetics", "Foods", "Fashion", "Electronics", "Health"],
          ],
          ["Support", ["FAQ", "Return/Exchange", "Order Track", "Contact"]],
          ["About us", ["Introduction", "Blog", "Partner"]],
        ].map(([t, ls]) => (
          <div key={t}>
            <h4
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 10,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {t}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ls.map((l) => (
                <span key={l} style={{ fontSize: 13, cursor: "pointer" }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          borderTop: "1px solid #1e293b",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>© 2025 USAShop Vietnam</span>
        <span>🔐 SSL · 💳 Stripe · PayPal · MoMo · 🚢 DHL · FedEx</span>
      </div>
    </footer>
  );
}
