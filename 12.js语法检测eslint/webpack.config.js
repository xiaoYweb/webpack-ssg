const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * 语法检查 eslint-loader eslint 
       * 只检查 源代码
       * 设置检查规则 package.json eslintConfig
       * 基于 airbnb 标准 做检查 
       *      --> eslint-config-airbnb-base (不含react检查)  eslint-plugin-import
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true, // 自动修复 eslint 错误
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}