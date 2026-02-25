export default function FilterSidebar({ sortBy, setSortBy, priceRange, setPriceRange }) {
  return (
    <div style={{ width: 200, flexShrink: 0 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 1px 8px rgba(0,0,0,.06)",
          position: "sticky",
          top: 84,
        }}
      >
        <h3
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: "#111827",
            marginBottom: 18,
          }}
        >
          Filter
        </h3>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          Sort
        </p>
        {[
          ["default", "default"],
          ["price_asc", "price_asc"],
          ["price_desc", "price_desc"],
          ["rating", "Rating"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "9px 12px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 2,
              background: sortBy === k ? "#fff1f2" : "transparent",
              color: sortBy === k ? "#f43f5e" : "#6b7280",
            }}
          >
            {l}
          </button>
        ))}
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 10,
            marginTop: 18,
          }}
        >
          Price
        </p>
        {[
          [0, 99999999, "All"],
          [0, 500000, "Under 500k"],
          [500000, 2000000, "500k–2tr"],
          [2000000, 5000000, "2tr–5tr"],
          [5000000, 99999999, "Above 5tr"],
        ].map(([min, max, l]) => (
          <button
            key={l}
            onClick={() => setPriceRange([min, max])}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "9px 12px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 2,
              background:
                priceRange[0] === min && priceRange[1] === max
                  ? "#fff1f2"
                  : "transparent",
              color:
                priceRange[0] === min && priceRange[1] === max
                  ? "#f43f5e"
                  : "#6b7280",
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
