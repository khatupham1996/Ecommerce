/** Format VND currency */
export const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

/** Calculate discount percentage */
export const disc = (price, originalPrice) =>
  Math.round((1 - price / originalPrice) * 100);
