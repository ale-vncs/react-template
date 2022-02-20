import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'

const config: webpack.Configuration = merge(webpackCommonConfig('production'), {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    clean: true
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true
  }
})

export default config
