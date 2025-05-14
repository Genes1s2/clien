/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: '100vh',
        '70vh': '70vh',
        '80vh': '80vh',
      }
    }
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     extend: {
//       height: {
//         screen: '100vh',
//         '70vh': '70vh',
//         '80vh': '80vh',
//       }
//     }
//   }
// }