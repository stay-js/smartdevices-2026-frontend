/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

const config = {
  jsxSingleQuote: false,

  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  tailwindFunctions: ['clsx', 'cva', 'cn'],
  tailwindStylesheet: './src/styles.css',
  trailingComma: 'all',
  useTabs: false,
};

export default config;
