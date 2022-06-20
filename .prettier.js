module.exports = {
  tabWidth: 1,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 50,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: "always",
};
