// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist', // The directory to serve files from
    watchFiles: ['src/**/*.html'], // Watch for changes in HTML files
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
});