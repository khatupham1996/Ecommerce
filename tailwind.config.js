// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-210": "repeat(auto-fill, minmax(210px, 1fr))",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #f43f5e, #a855f7)",
      },
    },
  },
  plugins: [],
};
