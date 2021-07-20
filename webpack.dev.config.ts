import path from 'path'
import webpack from 'webpack'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

const config: WebpackDevServerConfiguration = merge(
  webpackCommonConfig('development'),
  {
    mode: 'development',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      port: 4000,
      open: true,
      hot: true
    },
    optimization: {
      usedExports: true
    }
  }
)

export default config
