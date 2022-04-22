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
       * js 兼容性处理 babel-loader @babel/core @babel/preset-env 
       * 1. js 基本处理 es6->es5
       * 2. promise 处理 
       * 全部js处理  @babel/polyfill
       * 使用 方式 
       * 2.1 直接在入口处例如  缺点 打包体积较大 
       * 2.2 解决部分兼容性问题 配置到 兼容的浏览器版本 按需加载  corejs
       */
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除处理
        loader: 'babel-loader',
        options: {
          // presets: ['@babel/preset-env']
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage', // 按需加载
                corejs: {
                  version: 3, // 指定core-js 版本
                },
                // 指定 浏览器 兼容版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
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