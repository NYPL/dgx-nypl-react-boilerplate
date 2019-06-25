const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const sassPaths = require('@nypl/design-toolkit').includePaths
  .map(sassPath => sassPath).join('&');

const common = require('./webpack.common');

const dev = merge(common, {
  mode: "development",
  entry: {
    main: [
      "./src/client/styles/main.scss",
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [sassPaths],
            },
          },
        ],
        include: path.resolve(__dirname, "src"),
      },
    ]
  }
});

module.exports = dev;