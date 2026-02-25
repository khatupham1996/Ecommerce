import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/constants.js";
import { useAppContext } from "../ui/AppContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";

export default function Home() {
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    setShowCart,
    search,
    catFilter,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
  } = useAppContext();

  const [viewProduct, setViewProduct] = useState(null);

  // Filter & sort products
  let filtered = [...PRODUCTS];
  if (catFilter) filtered = filtered.filter((p) => p.category_id === catFilter);
  if (search)
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  filtered = filtered.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );
  if (sortBy === "price_asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero Banner – only on unfiltered home */}
      {!catFilter && !search && (
        <HeroBanner onViewProduct={setViewProduct} />
      )}

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ display: "flex", gap: 24 }}>
          <FilterSidebar
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <p style={{ fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>
                {filtered.length} Items
              </p>
            </div>
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 80,
                  color: "#9ca3af",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 12 }}>🔍</div>
                <p style={{ fontWeight: 600 }}>Couldn't Find this Item</p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
                  gap: 18,
                }}
              >
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    onAdd={(prod) => {
                      addToCart(prod);
                      setShowCart(true);
                    }}
                    onView={setViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {viewProduct && (
        <ProductModal
          p={viewProduct}
          onClose={() => setViewProduct(null)}
          onAdd={(p, qty) => {
            addToCart(p, qty);
            setShowCart(true);
          }}
        />
      )}
    </>
  );
}
