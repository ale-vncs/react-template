import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import webpackEnv from './webpack.env.config'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const openInBrowser = webpackEnv.OPEN_IN_BROWSER === 'true'

const config: Configuration = merge(webpackCommonConfig('development'), {
  mode: 'development',
  plugins: [new ReactRefreshWebpackPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    static: { directory: path.join(__dirname, 'build') },
    historyApiFallback: true,
    port: webpackEnv.PORT,
    open: openInBrowser,
    hot: true,
    client: {
      overlay: {
        warnings: false
      }
    }
  }
})

export default config
