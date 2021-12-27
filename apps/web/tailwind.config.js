const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: 'media',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
