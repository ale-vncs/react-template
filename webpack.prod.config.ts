import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpackCommonConfig from "./webpack.common.config";

const config: webpack.Configuration = {
  ...webpackCommonConfig,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

if (config.plugins && webpackCommonConfig.plugins) {
  config.plugins.push(...webpackCommonConfig.plugins)
}

export default config;
