/**
 * 
 */
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const { resolve } = require('path')


module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: []
  },

  plugins: [
    // 创建 html 或 以指定的 html模板 
    // 将打包输出的 资源 引入 
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],

  mode: 'development'
}