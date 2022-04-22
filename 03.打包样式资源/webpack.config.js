/**
 * webpack 配置文件 指示webpack 干哪些活
 *  运行 webpack 指令 会加载配置文件 获取 配置参数
 * 
 * webpack.config.js 是配置代码基于nodejs平台 需使用 commonjs 语法导出
 */
const { resolve } = require('path')

module.exports = {
  // 入口文件
  entry: './src/index.js',

  // 输出
  output: {
    filename : 'build.js', // 输出文件名
    path: resolve(__dirname, 'build'), // __dirname 当前文件的绝对路径 
  },

  // loader
  module: {
    rules: [
      {
        // 匹配什么文件
        test: /\.css$/,
        // 使用哪些loader
        use: [ // 执行属性 右 → 左  后 → 前
          'style-loader', // 创建style表建 将js 中的样式字符串添加进去 插入head标签中
          'css-loader', // 将 css 文件 变成 commonjs模块 加载js中，内容是样式字符串
        ]
      },
      {
        test: /\.less$/,
        use: [ // 执行属性 右 → 左  后 → 前
          'style-loader', // 创建style表建 将js 中的样式字符串添加进去 插入head标签中
          'css-loader', // 将 css 文件 变成 commonjs模块 加载js中，内容是样式字符串
          'less-loader', // 将 less 文件 翻译成 css 文件 依赖 less less-loader 
        ]
      }
    ]
  },

  // plugins
  plugins: [],

  mode: 'development', // development | production  
}