import { useNavigate } from "react-router-dom";
import CategoryNavBar from "../components/CategoryNavBar";
import { useAppContext } from "./AppContext";

function Header() {
  const navigate = useNavigate();
  const {
    setShowCart,
    search,
    setSearch,
    catFilter,
    setCatFilter,
    user,
    cartCount,
  } = useAppContext();
  return (
    <header className="bg-white sticky top-0 z-30 shadow-[0_2px_12px_rgba(0,0,0,.08)]">
      <div className="border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto py-0 px-5 flex items-center gap-4 h-16">
          <h1
            className="text-xl font-black text-black flex-shrink-0"
            onClick={() => {
              setCatFilter(null);
              setSearch("");
              navigate("/");
            }}
          >
            🇺🇸
            <span className="text-red-500">USA</span>
            Shop🇻🇳
          </h1>
          <div className="flex-1 max-w-[520px] w-full relative">
            <input
              className="w-full bg-gray-100 border-none rounded-2xl py-[10px] pr-[40px] pl-[18px] text-xs outline-none box-border "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your item..."
            />
            <span className="absolute right-4 top-2/4 -translate-y-1/2 pointer-events-none text-gray-200">
              🔍
            </span>
          </div>
          <div className="flex text-center gap-2 ml-auto">
            {!user ? (
              <button
                className="border-none bg-none cursor-pointer text-[13px] font-bold text-gray-500 py-2 px-4 rounded-xl"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button
                className="flex text-center gap-2 border-none bg-slate-200 cursor-pointer text-[13px] font-bold text-gray-500 py-2 px-4 rounded-xl"
                onClick={() => navigate("/profile")}
              >
                <div className="w-7 h-7 rounded-lg bg-[linear-gradient(135deg,#f43f5e,#a855f7)] flex text-center justify-center text-white text-xs font-black">
                  {(user.name || "U")[0]}
                </div>
                {user.name?.split(" ").pop()}
              </button>
            )}
            <button
              className="border-none bg-none cursor-pointer text-xs font-bold py-2 px-3 rounded-xl"
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
            <button
              className="relative bg-red-500 text-white border-none rounded-2xl py-[10px] px-[18px] text-xs font-extrabold cursor-pointer flex text-center gap-2 "
              onClick={() => setShowCart(true)}
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-[6px] -right-[6px] bg-blue-950 text-white rounded-full w-5 h-5 flex text-center justify-center text-xs font-black">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

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
