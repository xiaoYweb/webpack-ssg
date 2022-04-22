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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // webpack 5 已经自动支持 其他文件引入了
      // {
      //   exclude: /\.(css|js|json|html|less)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[hash:10].[ext]'
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 开发服务器  自动编译 自动刷新
  // 内存中 编译打包 不会输出文件
  // 启动指令为 webpack-dev-server
  devServer: {
    port: 3000,
    // contentBase: resolve(__filename, 'build'), // 
    static: {
      directory: resolve(__dirname, 'build'),
    },
    compress: true, // 启用压缩 
    // open: true
    hot: true,
  }
}