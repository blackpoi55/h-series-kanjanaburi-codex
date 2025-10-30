/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,   // สำคัญ! ไม่ให้ Tailwind รีเซ็ต CSS ของ AntD/MUI
  },
  theme: { extend: {} },
  plugins: [],
};
