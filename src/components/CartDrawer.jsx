import { fmt } from "../utils/helpers.js";

export default function CartDrawer({
  open,
  cart,
  onClose,
  onQty,
  onRemove,
  onCheckout,
}) {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = sub >= 3000000 ? 0 : 150000;
  const total = sub + ship;

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.4)",
            backdropFilter: "blur(3px)",
            zIndex: 40,
          }}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,.15)",
          transition: "transform .35s cubic-bezier(.4,0,.2,1)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>
              Cart
            </h2>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>
              {cart.length} Items
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
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
        </div>

        {/* Free shipping progress */}
        {sub < 3000000 && sub > 0 && (
          <div
            style={{
              margin: "12px 20px 0",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 14,
              padding: "10px 14px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#92400e",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Thêm {fmt(3000000 - sub)} để miễn phí ship 🚀
            </p>
            <div
              style={{ background: "#fde68a", borderRadius: 999, height: 6 }}
            >
              <div
                style={{
                  background: "#f59e0b",
                  height: "100%",
                  borderRadius: 999,
                  width: `${(sub / 3000000) * 100}%`,
                  transition: "width .3s",
                }}
              />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{ textAlign: "center", paddingTop: 80, color: "#9ca3af" }}
            >
              <div style={{ fontSize: 52, marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 600 }}>Giỏ hàng trống</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  background: "#f9fafb",
                  borderRadius: 18,
                  padding: 12,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1f2937",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      color: "#f43f5e",
                      fontWeight: 800,
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    {fmt(item.price)}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        background: "#fff",
                        borderRadius: 10,
                        padding: 2,
                        boxShadow: "0 1px 4px rgba(0,0,0,.08)",
                      }}
                    >
                      <button
                        onClick={() => onQty(item.id, item.qty - 1)}
                        style={{
                          width: 24,
                          height: 24,
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: 22,
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onQty(item.id, item.qty + 1)}
                        style={{
                          width: 24,
                          height: 24,
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginLeft: "auto",
                      }}
                    >
                      {fmt(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#fca5a5",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer totals */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "16px 20px 24px",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginBottom: 16,
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
                  <span
                    style={{
                      color: v.includes("Miễn") ? "#10b981" : undefined,
                      fontWeight: v.includes("Miễn") ? 600 : 400,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 16,
                  fontWeight: 800,
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
              onClick={onCheckout}
              style={{
                width: "100%",
                background: "#f43f5e",
                color: "#fff",
                border: "none",
                borderRadius: 18,
                padding: "15px 0",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Check Out →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
