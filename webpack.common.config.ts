import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
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
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                '@babel/preset-typescript',
                '@babel/preset-env',
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
                isDev && require.resolve('react-refresh/babel')
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
          loader: 'json5-loader',
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: alias,
      fallback: {
        net: false
      }
    },
    ignoreWarnings: [
      {
        module: /react-icons/
      }
    ],
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          mode: 'write-references',
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        },
        async: false
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
      emitOnErrors: true,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}

export default config
