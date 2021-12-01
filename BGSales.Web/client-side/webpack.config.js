var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "source-map",

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      { test: /\.js$/, use: "source-map-loader" },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: [/node_modules/, /public/]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
