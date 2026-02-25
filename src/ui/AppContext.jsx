import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 99999999]);
  const [user, setUser] = useState(null);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      return ex
        ? prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + qty } : i
          )
        : [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) =>
    qty < 1
      ? setCart((c) => c.filter((i) => i.id !== id))
      : setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        showCart,
        setShowCart,
        search,
        setSearch,
        catFilter,
        setCatFilter,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        user,
        setUser,
        addToCart,
        updateQty,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
