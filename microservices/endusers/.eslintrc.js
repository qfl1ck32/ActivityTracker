module.exports = {
  plugins: ["import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
      },
    ],
  },
};
