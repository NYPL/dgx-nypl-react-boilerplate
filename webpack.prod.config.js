const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sassPaths = require('@nypl/design-toolkit').includePaths
  .map(sassPath => sassPath).join('&');

const common = require('./webpack.common');

const prod = merge(common, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [sassPaths],
            },
          },
        ]
      },
    ],
  },
});

module.exports = prod;
