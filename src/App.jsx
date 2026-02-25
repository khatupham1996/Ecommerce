import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./ui/AppContext.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected layout — wraps header, footer, cart drawer */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* Admin has its own layout (sidebar) */}
          <Route path="admin" element={<Admin />} />

          {/* Public login page — no header/footer */}
          <Route path="login" element={<Login />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
    // <div className="bg-re">Hello</div>
  );
}
