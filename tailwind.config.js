  module.exports = {
    purge: ["./components/**/*.js", "./pages/**/*.js"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 ],
  theme: {
    extend: {
      backgroundImage: {
        "fondo": "url('/25.svg')", 
      },
    },
  }, 
  plugins: [ require("daisyui")],
  daisyui: {
    themes: [ "dracula" ],
  },
}
