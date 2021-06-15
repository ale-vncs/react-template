import path from 'path'
import webpack from 'webpack'
import webpackCommonConfig from './webpack.common.config'

const config: webpack.Configuration = {
  ...webpackCommonConfig,
  mode: 'development',
  output: {
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  },
  optimization: {
    usedExports: true
  }
}

if (config.plugins && webpackCommonConfig.plugins) {
  config.plugins.push(...webpackCommonConfig.plugins)
}

export default config
