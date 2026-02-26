import { useState } from "react";
import Stars from "../components/Stars.jsx";
import { CATEGORIES } from "../data/constants.js";
import { fmt } from "../utils/helpers.js";

const STOCK_STYLE = (stock) =>
  stock > 20
    ? "bg-green-100 text-green-800"
    : stock > 5
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

export default function ProductsTab({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [newP, setNewP] = useState({ name: "", price: "", stock: "" });

  const handleAdd = () => {
    if (!newP.name) return;
    setProducts([
      ...products,
      {
        ...newP,
        id: Date.now(),
        price: +newP.price || 0,
        originalPrice: (+newP.price || 0) * 1.25,
        stock: +newP.stock || 0,
        category_id: 1,
        rating: 5,
        reviews: 0,
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
        badge: "New",
      },
    ]);
    setShowForm(false);
    setNewP({ name: "", price: "", stock: "" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="bg-rose-500 text-white border-none rounded-xl py-2.5 px-5 font-bold text-[13px] cursor-pointer hover:bg-rose-600 transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-rose-50">
          <h3 className="font-extrabold mb-4">Add new items</h3>
          <div className="grid grid-cols-3 gap-3.5">
            {[
              ["name", "Product Name"],
              ["price", "Price"],
              ["stock", "Stock"],
            ].map(([k, l]) => (
              <div key={k} className={k === "name" ? "col-span-3" : ""}>
                <label className="text-xs text-gray-500 font-semibold block mb-1.5">
                  {l}
                </label>
                <input
                  value={newP[k]}
                  onChange={(e) => setNewP({ ...newP, [k]: e.target.value })}
                  placeholder={l}
                  className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 px-3.5 text-[13px] outline-none box-border focus:border-rose-300 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-4">
            <button
              onClick={handleAdd}
              className="bg-rose-500 text-white border-none rounded-xl py-2.5 px-5 font-bold text-[13px] cursor-pointer hover:bg-rose-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border-[1.5px] border-gray-200 bg-white rounded-xl py-2.5 px-5 font-bold text-[13px] cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Items", "Category", "Price", "Stocks", "Rating", "Delete"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-3.5 px-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-[38px] h-[38px] rounded-[10px] object-cover"
                    />
                    <span className="font-semibold text-gray-800 max-w-[180px] line-clamp-1">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-gray-500">
                  {CATEGORIES.find((c) => c.id === p.category_id)?.name}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-rose-500">
                  {fmt(p.price)}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`py-0.5 px-2.5 rounded-[10px] text-[11px] font-bold ${STOCK_STYLE(p.stock)}`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <Stars r={Math.floor(p.rating)} />
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() =>
                      setProducts(products.filter((x) => x.id !== p.id))
                    }
                    className="text-red-500 bg-transparent border-none cursor-pointer font-bold text-xs hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
