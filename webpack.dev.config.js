const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const sassPaths = require('@nypl/design-toolkit').includePaths
  .map(sassPath => sassPath).join('&');

const config = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.resolve(ROOT_PATH, 'src/client/App.jsx'),
    ],
  },
  // output: {
  //   publicPath: 'http://localhost:3000/',
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          'css-loader',
          `sass-loader?includePaths=${sassPaths}`,
        ],
        include: path.resolve(ROOT_PATH, 'src'),
      },
    ],
  }
});

module.exports = config;
