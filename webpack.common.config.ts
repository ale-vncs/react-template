import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { alias } from './webpack.alias.config'
import webpackEnv from './webpack.env.config'

const config = (env: 'development' | 'production'): webpack.Configuration => {
  const isDev = env === 'development'
  return {
    entry: './src/index.tsx',
    output: {
      publicPath: webpackEnv.PUBLIC_URL
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
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
          test: /\.(png|jpe?g|gif|svg|txt|json)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: alias,
      fallback: {
        net: false
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      }),
      new CopyPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }]
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: env,
          ...webpackEnv
        })
      })
    ],
    performance: {
      hints: false
    },
    optimization: {
      emitOnErrors: true
    }
  }
}

export default config
