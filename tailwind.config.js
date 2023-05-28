module.exports = {
  content: ["./src/**/*.{html,ts}", "./projects/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Oswald", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        primary: {
          main: "#222FB9",
          light: "#4E59C7"
        },
        gray: {
          main: "#787878"
        }
      },
      fontSize: {
        t0: ['1.75rem', '2.375rem'],
        t1: ['1.625rem', '2.25rem'],
        t2: ['1.5rem', '2.125rem'],
        t3: ['1.375rem', '2rem'],
        t4: ['1.25rem', '1.875rem'],
        t5: ['1.125rem', '1.75rem'],
        t6: ['1rem', '1.625rem'],
        t7: ['0.875rem', '1.5rem'],
        t8: ['0.75rem', '1.375rem'],
        t9: ['0.625rem', '1.25rem'],
        t10: ['0.5rem', '1.125rem'],
      }
    },
  },
  plugins: [],
};
