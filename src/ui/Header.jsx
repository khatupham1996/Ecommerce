import { useNavigate } from "react-router-dom";
import CategoryNavBar from "../components/CategoryNavBar";
import { useAppContext } from "./AppContext";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    setShowCart,
    search,
    setSearch,
    catFilter,
    setCatFilter,
    user,
    cartCount,
  } = useAppContext();
  const goHome = () => {
    setCatFilter(null);
    setSearch("");
    setMobileMenuOpen(false);
    navigate("/");
  };
  return (
    <header className="bg-white sticky top-0 z-30 shadow-[0_2px_12px_rgba(0,0,0,.08)]">
      <div className="border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto py-0 px-5 flex items-center gap-4 h-16">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-none bg-transparent cursor-pointer text-gray-700 p-1"
          >
            {mobileMenuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
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
            )}
          </button>
          {/* logo */}
          <h1
            className="text-xl font-black text-black flex-shrink-0 cursor-pointer p-4"
            onClick={goHome}
          >
            🇺🇸
            <span className="text-red-500">USA</span>
            Shop🇻🇳
          </h1>
          {/* Search bar (desktop) */}
          <div className="hidden md:block flex-1 max-w-[520px] relative">
            <input
              className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pr-10 pl-4 text-xs outline-none box-border "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your item..."
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
              🔍
            </span>
          </div>
          {/* Right actions */}
          <div className="flex text-center gap-1 md:gap-2 ml-auto">
            {/* Login / Profile — hidden on mobile, shown in mobile menu */}
            {!user ? (
              <button
                className="hidden md:block border-none bg-none cursor-pointer text-xs font-bold text-gray-500 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button
                className="hidden md:flex flex items-center gap-2 border-none bg-transparent cursor-pointer text-xs font-bold text-gray-500 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/profile")}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-white text-xs font-black">
                  {(user.name || "U")[0]}
                </div>
                <span className="hidden lg:inline">
                  {user.name?.split(" ").pop()}
                </span>
              </button>
            )}
            {/* Admin- hidden on small mobile */}
            <button
              className="hidden sm:block border-none bg-transparent cursor-pointer text-xs font-bold py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
            {/* cart always visible */}
            <button
              className="relative bg-red-500 text-white border-none rounded-2xl py-2 px-3 md:py-2.5 md:px-4 text-xs font-extrabold cursor-pointer flex items-center gap-2 hover:bg-red-600 transition-colors"
              onClick={() => setShowCart(true)}
            >
              🛒
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-950 text-white rounded-full w-5 h-5 flex text-center justify-center text-xs font-black">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pr-10 pl-4 text-xs outline-none box-border"
              placeholder="Search your items..."
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
              🔍
            </span>
          </div>
        </div>
      </div>
      {/* mobile dropdown menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-[112px] bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 right-0 bg-white z-50 shadow-[0_12px_30px_rgba(0,0,0,.12)] border-t border-gray-100">
            {!user ? (
              <button
                className="w-full flex items-center gap-3 py-3.5 px-5 border-none bg-white cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-base">
                  👤
                </span>
                Login/Register
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 py-3.5 px-5 border-none bg-white cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-white text-sm font-black">
                  {(user.name || "U")[0]}
                </div>
                {(user.name || "U")[0]}
              </button>
            )}
            <div className="h-px bg-gray-100" />
            <button
              onClick={() => {
                navigate("/admin");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 py-3.5 px-5 border-none bg-white cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-base">
                ⚙️
              </span>
              Admin Panel
            </button>
            <div className="h-px bg-gray-100" />
            <button
              onClick={() => {
                navigate("/home");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 py-3.5 px-5 border-none bg-white cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-base">
                🏠
              </span>
              Home
            </button>
          </div>
        </>
      )}

      {/* Category nav bar */}
      <CategoryNavBar
        catFilter={catFilter}
        setCatFilter={setCatFilter}
        setSearch={setSearch}
      />
    </header>
  );
}

export default Header;
