module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ["./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        // => @media print { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
