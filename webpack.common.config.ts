import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { alias } from './webpack.alias.config'
import webpackEnv from './webpack.env.config'
import { resolve } from 'path'

const config = (env: 'development' | 'production'): webpack.Configuration => {
  const isDev = env === 'development'

  return {
    entry: './src/index.tsx',
    output: {
      pathinfo: isDev,
      path: resolve(__dirname, 'build'),
      publicPath: '/',
      assetModuleFilename: 'static/media/[name].[hash][ext]'
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheCompression: false,
              cacheDirectory: true,
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic'
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                isDev && require.resolve('react-refresh/babel'),
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true
                  }
                ]
              ].filter(Boolean)
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.json$/i,
          exclude: /node_modules/,
          loader: 'json5-loader',
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias,
      fallback: {
        net: false
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'src/assets/favicon.png',
        inject: true
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: env,
          ...webpackEnv
        })
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    watchOptions: {
      ignored: /node_modules/
    },
    performance: {
      hints: false
    }
  }
}

export default config
