import { createHash } from 'crypto'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import webpackEnv from './webpack.env.config'
import { join } from 'path'
import { path } from './webpack.path.config'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const openInBrowser = webpackEnv.OPEN_IN_BROWSER === 'true'

const createEnvHash = (env: any) => {
  const hash = createHash('md5')
  hash.update(JSON.stringify(env))

  return hash.digest('hex')
}

const config: Configuration = merge(webpackCommonConfig('development'), {
  mode: 'development',
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  plugins: [new ReactRefreshWebpackPlugin({ overlay: false })],
  devtool: 'cheap-module-source-map',
  devServer: {
    static: {
      publicPath: '/',
      directory: join(__dirname, 'build')
    },
    historyApiFallback: true,
    port: webpackEnv.PORT,
    open: openInBrowser,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    }
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.webpackCache,
    version: createEnvHash(webpackEnv),
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename]
    }
  },
  optimization: {
    minimize: false
  }
})

export default config
