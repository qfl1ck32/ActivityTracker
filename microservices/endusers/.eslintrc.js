module.exports = {
  plugins: ["import"],
  parser: "babel-eslint",
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
