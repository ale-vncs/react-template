import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { alias } from './alias.config'
import dotenv from 'dotenv'

const config = (env: 'development' | 'production'): webpack.Configuration => {
  const dotenvParseOutput = dotenv.config().parsed
  const publicUrl = dotenvParseOutput?.PUBLIC_URL || ''

  return {
    entry: './src/index.tsx',
    output: {
      publicPath: publicUrl
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic'
                  }
                ]
              ]
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
          ...dotenv.config().parsed,
          PUBLIC_URL: publicUrl
        })
      })
    ]
  }
}

export default config
