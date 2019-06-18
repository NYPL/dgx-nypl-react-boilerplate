const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sassPaths = require('@nypl/design-toolkit').includePaths
  .map(sassPath => sassPath).join('&');

// References the applications root path
const ROOT_PATH = path.resolve(__dirname);
// Sets the variable as either development or production
const ENV = process.env.NODE_ENV || 'development';

// Holds the common settings for any environment
module.exports = {
  // path.resolve - resolves to an absolute path
  // This is the path and file of our top level
  // React App that is to be rendered.
  mode: "development",
  entry: {
    main: [
      // "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/client/App.jsx",
      // 'webpack/hot/dev-server',
      // 'webpack-dev-server/client?http://localhost:8080/',
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: "web",
  output: {
    // Sets the output path to ROOT_PATH/dist
    path: path.resolve(__dirname, 'dist'),
    // Sets the name of the bundled application files
    // Additionally we can isolate vendor files as well
    filename: 'bundle.js',
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   // compress: true,
  //   // port: 3000
  //   hot: true
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          'css-loader',
          `sass-loader`,
        ],
        include: path.resolve(ROOT_PATH, 'src'),
      },
    ]
  }
};
