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

  return (
    <div className="flex min-h-screen font-[system-ui,sans-serif] bg-gray-50">
      {/* ─── Sidebar ─── */}
      <AdminSidebar tab={tab} setTab={setTab} />

      {/* ─── Content ─── */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 py-3.5 px-7 flex items-center justify-between sticky top-0 z-10">
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
