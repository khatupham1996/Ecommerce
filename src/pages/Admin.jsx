import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { PRODUCTS, ORDERS_MOCK, NAV } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";
import AdminSidebar from "./AdminSidebar.jsx";
import DashboardTab from "./DashboardTab.jsx";
import ProductsTab from "./ProductsTab.jsx";
import OrdersTab from "./OrdersTab.jsx";
import CustomersTab from "./CustomersTab.jsx";
import CouponsTab from "./CouponsTab.jsx";
import ReportsTab from "./ReportsTab.jsx";

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(ORDERS_MOCK);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Revenue", value: fmt(revenue), icon: "💰", bg: "bg-green-100" },
    { label: "Orders", value: orders.length, icon: "📦", bg: "bg-blue-100" },
    {
      label: "Products",
      value: products.length,
      icon: "🏷️",
      bg: "bg-violet-100",
    },
    { label: "Customers", value: 156, icon: "👥", bg: "bg-amber-100" },
  ];
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setSidebarOpen(false);
  };
  return (
    <div className="flex min-h-screen font-[system-ui,sans-serif] bg-gray-50">
      {/* ─── Sidebar ─── */}
      <div
        className={`lg:hidden fixed inset-0  bg-black/40 z-40 transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 transform transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <AdminSidebar tab={tab} setTab={handleTabChange} />
      </div>

      {/* ─── Content ─── */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 py-3.5 px-7 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile menu toggle */}

          <button
            className="lg:hidden border-none bg-transparent cursor-pointer text-gray-700 p-1 "
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <h1 className="font-extrabold text-lg text-gray-900">
            {NAV.find((n) => n[0] === tab)?.[2]}
          </h1>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">
            A
          </div>
        </div>

        <div className="p-7 flex-1">
          {/*Dashboard */}
          {tab === "dashboard" && (
            <DashboardTab stats={stats} orders={orders} products={products} />
          )}

          {/*Products*/}
          {tab === "products" && (
            <ProductsTab products={products} setProducts={setProducts} />
          )}

          {/*Orders*/}
          {tab === "orders" && (
            <OrdersTab orders={orders} setOrders={setOrders} />
          )}

          {/*Customers*/}
          {tab === "customers" && <CustomersTab />}

          {/*Coupons*/}
          {tab === "coupons" && <CouponsTab />}

          {/*Reports*/}
          {tab === "reports" && <ReportsTab />}
        </div>
      </div>
    </div>
  );
}
