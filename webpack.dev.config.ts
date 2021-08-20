import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import webpackEnv from './webpack.env.config'

const config: WebpackDevServerConfiguration = merge(webpackCommonConfig('development'), {
  mode: 'development',
  plugins: [new ReactRefreshWebpackPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: webpackEnv.PORT,
    open: true,
    hot: true
  },
  optimization: {
    usedExports: true
  }
})

export default config
