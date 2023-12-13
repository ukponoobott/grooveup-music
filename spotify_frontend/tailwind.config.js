module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        "spotify-green":"rgb(30 215 96)", // use like this :-   className="bg-spotify-green"
      },
      fontFamily:{
        "poppins":["Poppins", "sans-serif"] // key will be the keyword used while giving tailwind classes like className="font-poppins"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
