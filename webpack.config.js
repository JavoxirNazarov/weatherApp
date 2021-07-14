const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: ["", ".js", ".ts", ".jsx", ".tsx"],
  },
  output: {
    path: __dirname + "/public",
    filename: "weatherWidget.min.js",
    library: "weatherWidget",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  devServer: { contentBase: "./src" },
};

module.exports = config;
