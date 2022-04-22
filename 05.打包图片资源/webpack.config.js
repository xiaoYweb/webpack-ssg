const HtmlWebpackPlugin = require('html-webpack-plugin')

const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: './build.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // webpack 5 内置了 资源打包 loader
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/i,
      //   loader: 'url-loader', // 依赖 file-loader 处理不了 html 中的 img 引入
      //   options: {
      //     limit: 8 * 1024, // 大小 小于 8kb 会用 base64 处理。 优点减少请求数量  缺点 最终 打包后的文件体积更大
      //     name: '[hash:10].[ext]', // 导出图片资源 重命名
      //     outputPath: 'images/',
      //     // url-loader 默认es6 引入 所以要关闭 html-loader 是  commonjs 引入 
      //     esModule: false, // 关闭es6 module 引入 开启 commonjs 引入
      //   },
      // },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, 
          },
        },
        generator: {
          filename: 'images/[hash:10].[ext]'
        },
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset',
      //   generator: {
      //       filename: 'fonts/[base]',
      //   },
      // },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  mode: 'development'
}