const path = require("path");
const webpack = require("webpack");
const port =  process.env.port | 3000

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test:/\.(s*)css$/,
        use: ["style-loader", "css-loader", 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{loader: 'file-loader'}],
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port,
    publicPath: `http://localhost:${port}/dist/`,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};