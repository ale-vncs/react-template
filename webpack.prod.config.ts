import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpackCommonConfig from './webpack.common.config'
import merge from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { path } from './webpack.path.config'
import { resolve } from 'path'
import CopyPlugin from 'copy-webpack-plugin'

const config: webpack.Configuration = merge(webpackCommonConfig('production'), {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    clean: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'readonly',
        context: path.appPath,
        configOverwrite: {
          compilerOptions: {
            sourceMap: false,
            skipLibCheck: true,
            inlineSourceMap: false,
            declarationMap: false,
            incremental: true,
            noEmit: true,
            tsBuildInfoFile: path.tsBuildInfoFile
          }
        }
      },
      async: true
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      cache: true,
      cacheLocation: path.eslintCache,
      context: path.appSrc,
      cwd: path.appPath,
      resolvePluginsRelativeTo: __dirname,
      failOnError: false
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }]
    })
  ],
  optimization: {
    minimize: true
  }
})

export default config
