/**
 * @Author: tangzhicheng
 * @Date: 2021-05-15 14:47:55
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:55:38
 * @Description: file content
 */
/**
 * @Author: tangzhicheng
 * @Date: 2021-05-15 14:23:51
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:37:46
 * @Description: file content
 */

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    vue: './lib/index.js',
    vue_mini: './lib/index.js',
  },
  mode: 'none',
  output: {
    filename: '[name].js',
    library: 'vue',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /_mini.js$/i,
      }),
    ],
  },
}
