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
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  filtered = filtered.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
  );
  if (sortBy === "price_asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Hero Banner – only on unfiltered home */}
      {!catFilter && !search && <HeroBanner onViewProduct={setViewProduct} />}

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-7 px-5">
        <div className="flex flex-col gap-2">
          <FilterSidebar
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between text-center mb-5">
              <p className="text-[13px] text-gray-400 font-semibold">
                {filtered.length} Items
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center pt-20 text-gray-400">
                <div className="text-[52px] mb-[12px]">🔍</div>
                <p className="font-semibold">Couldn't Find this Item</p>
              </div>
            ) : (
              <div className="grid grid-cols-auto-fill-210 gap-4">
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
