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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-[-20px 0 60px rgba(0,0,0,.15)] transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-6 border-b-[1px] border-solid border-blue-50">
          <div>
            <h2 className="text-xl font-extrabold  text-slate-900">Cart</h2>
            <p className="text-xs text-gray-400 ">{cart.length} Items</p>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-slate-100 border-none cursor-pointer text-[14px] text-gray-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Free shipping progress */}
        {sub < 3000000 && sub > 0 && (
          <div className="mt-3 mx-5 mb-0 border-solid border-[1px] border-yellow-300 bg-yellow-50 rounded-xl py-3 px-4">
            <p className="text-xs text-amber-500 font-semibold mb-[6px]">
              Add more {fmt(3000000 - sub)} for free delivery 🚀
            </p>
            <div className="bg-yellow-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-full rounded-full transition-[width] duration-300"
                style={{ width: `${(sub / 3000000) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="text-center pt-20 text-gray-400">
              <div className="text-[52px] mb-3">🛒</div>
              <p className="font-semibold">Empty Cart</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3"
              >
                <img
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-rose-500 font-extrabold mt-[2px]">
                    {fmt(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-[0 1px 4px rgba(0,0,0,.08)]">
                      <button
                        className="w-6 h-6 border-none cursor-pointer font-bold"
                        onClick={() => onQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-bold text-xs">
                        {item.qty}
                      </span>
                      <button
                        className="w-6 h-6 border-none bg-none cursor-pointer font-bold"
                        onClick={() => onQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">
                      {fmt(item.price * item.qty)}
                    </span>
                    <button
                      className="border-none bg-none cursor-default text-rose-300 text-xs font-bold "
                      onClick={() => onRemove(item.id)}
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
          <div className="pt-4 px-5 pb-6 border-t-[1px] border-solid border-slate-100">
            <div className="flex flex-col gap-2 mb-4">
              {[
                ["Price", fmt(sub)],
                ["Shipping", ship === 0 ? "Free 🎉" : fmt(ship)],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between text-xs text-gray-500"
                >
                  <span>{l}</span>
                  <span
                    className={`${v.includes("Miễn") ? "#10b981" : "undefined"} ${v.includes("Miễn") ? 600 : 400}`}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-[16px] font-extrabold pt-2 border-solid border-t-[1px] border-slate-100">
                <span>Total</span>
                <span className="text-rose-500 text-xl">{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-rose-500 text-white border-none rounded-2xl py-4 px-0 font-extrabold text-[15px] cursor-pointer"
            >
              Check Out →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
