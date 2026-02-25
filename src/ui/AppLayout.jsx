import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext.jsx";
// import CategoryNavBar from "../components/CategoryNavBar.jsx";
import CartDrawer from "../components/CartDrawer.jsx";
import Footer from "../components/Footer.jsx";
import Header from "./Header.jsx";

export default function AppLayout() {
  const navigate = useNavigate();
  const { cart, showCart, setShowCart, updateQty, removeFromCart } =
    useAppContext();

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{
        fontFamily: "'Inter',system-ui,sans-serif",
      }}
    >
      {/* Top announcement */}
      <div className="bg-black text-gray-400 text-xs text-center px-4 py-2">
        🚀 Free shipping on orders over 99$ · 🔐 US products · 🇺🇸→🇻🇳 Deliver
        7–14 days
      </div>
      {/* Header */}
      <Header />
      {/* Page content via React Router Outlet */}
      <Outlet />
      {/* Footer */}
      <Footer />
      {/* Cart Drawer */}
      <CartDrawer
        open={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => {
          setShowCart(false);
          navigate("/checkout");
        }}
      />
    </div>
  );
}
