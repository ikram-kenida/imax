/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
        sm: "15px",
        md: "15px",
        lg: "15px",
        xl: "30px",
      },
      screens: {
        DEFAULT: "100%",
        sm: "100%",
        md: "730px",
        lg: "970px",
        xl: "1240px",
      },
    },
    extend: {
      backgroundImage: {
        home: 'linear-gradient(97deg, #100477 -0.95%, #5A47FB 101.87%)',
        ellipse: 'linear-gradient(267deg, #1577EB 24%, #7AB7FF 73.95%)',
        banner: 'url("/images/banner.png")',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "sidebar-in": {
          form: { width: "80px" },
          to: { width: "288px" }
        },
        "sidebar-out": {
          form: { width: "288px" },
          to: { width: "80px" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "sidebar-in": "sidebar-in 0.2s ease-out",
        "sidebar-out": "sidebar-out 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}