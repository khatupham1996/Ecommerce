import { useState } from "react";
import { CATEGORIES, MEGA_MENUS } from "../data/constants.js";

export default function CategoryNavBar({ catFilter, setCatFilter, setSearch }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        position: "relative",
      }}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Nav tab row */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: 0,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <button
          onClick={() => {
            setCatFilter(null);
            setSearch("");
            setOpenMenu(null);
          }}
          onMouseEnter={() => setOpenMenu(null)}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "13px 16px",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            background: "transparent",
            color: !catFilter ? "#f43f5e" : "#374151",
            borderBottom: !catFilter
              ? "2.5px solid #f43f5e"
              : "2.5px solid transparent",
            transition: "color .15s",
            whiteSpace: "nowrap",
          }}
        >
          🏪 All
        </button>

        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCatFilter(c.id === catFilter ? null : c.id);
              setOpenMenu(null);
            }}
            onMouseEnter={() => setOpenMenu(MEGA_MENUS[c.id] ? c.id : null)}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "13px 16px",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              background: openMenu === c.id ? "#fff8f8" : "transparent",
              color:
                catFilter === c.id || openMenu === c.id ? "#f43f5e" : "#374151",
              borderBottom:
                catFilter === c.id
                  ? "2.5px solid #f43f5e"
                  : "2.5px solid transparent",
              transition: "all .15s",
              whiteSpace: "nowrap",
            }}
          >
            {c.icon} {c.name}
            {MEGA_MENUS[c.id] && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  marginLeft: 1,
                  transition: "transform .2s",
                  transform:
                    openMenu === c.id ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M2 3.5L5 6.5L8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Mega Dropdown */}
      {openMenu && MEGA_MENUS[openMenu] && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            boxShadow: "0 24px 60px rgba(0,0,0,.13)",
            borderTop: "2px solid #f43f5e",
            zIndex: 100,
            borderRadius: "0 0 20px 20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "28px 28px 24px",
              display: "grid",
              gridTemplateColumns: "190px 1fr 1fr 1fr",
              gap: 32,
            }}
          >
            {/* Left panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  background: "linear-gradient(135deg,#f43f5e,#a855f7)",
                  borderRadius: 16,
                  padding: "20px 18px",
                  color: "#fff",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    background: "rgba(255,255,255,.25)",
                    padding: "3px 8px",
                    borderRadius: 20,
                  }}
                >
                  {MEGA_MENUS[openMenu].banner.label}
                </span>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    marginTop: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {MEGA_MENUS[openMenu].banner.text}
                </p>
                <p style={{ fontSize: 11, marginTop: 6, opacity: 0.8 }}>
                  US Product 🇺🇸
                </p>
                <button
                  onClick={() => {
                    setCatFilter(openMenu);
                    setOpenMenu(null);
                  }}
                  style={{
                    marginTop: 14,
                    background: "rgba(255,255,255,.2)",
                    border: "1px solid rgba(255,255,255,.4)",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "7px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Explore →
                </button>
              </div>

              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: 8,
                  }}
                >
                  Brands
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                  {MEGA_MENUS[openMenu].featured.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setOpenMenu(null)}
                      style={{
                        textAlign: "left",
                        background: "#f9fafb",
                        border: "1px solid #f3f4f6",
                        borderRadius: 10,
                        padding: "7px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#374151",
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff1f2";
                        e.currentTarget.style.color = "#f43f5e";
                        e.currentTarget.style.borderColor = "#fecdd3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f9fafb";
                        e.currentTarget.style.color = "#374151";
                        e.currentTarget.style.borderColor = "#f3f4f6";
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-category columns */}
            {MEGA_MENUS[openMenu].columns.map((col, ci) => (
              <div key={ci}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#111827",
                    marginBottom: 10,
                    paddingBottom: 8,
                    borderBottom: "2px solid #f3f4f6",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {col.heading}
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  {col.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCatFilter(openMenu);
                        setOpenMenu(null);
                      }}
                      style={{
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        padding: "6px 10px",
                        fontSize: 13,
                        color: "#6b7280",
                        cursor: "pointer",
                        borderRadius: 8,
                        transition: "all .12s",
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff1f2";
                        e.currentTarget.style.color = "#f43f5e";
                        e.currentTarget.style.paddingLeft = "16px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "#6b7280";
                        e.currentTarget.style.paddingLeft = "10px";
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div
            style={{
              background: "#fafafa",
              borderTop: "1px solid #f3f4f6",
              padding: "10px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              🔥 {MEGA_MENUS[openMenu].title}
            </span>
            <button
              onClick={() => {
                setCatFilter(openMenu);
                setOpenMenu(null);
              }}
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#f43f5e",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              All products →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
