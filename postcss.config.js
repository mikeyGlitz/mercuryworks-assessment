module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-preset-env': {
      browers: 'last 2 versions'
    },
    lost: {},
    stylelint: {},
    cssnano: {},
  },
};
