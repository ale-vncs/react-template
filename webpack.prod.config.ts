import path from 'path'
import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'

const config: webpack.Configuration = merge(webpackCommonConfig('production'), {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash:8].js',
    clean: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: (entrypoint: any) => `runtimechunk~${entrypoint.name}`
    }
  }
})

export default config
