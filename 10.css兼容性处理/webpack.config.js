const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')

// process.env.NODE_ENV = 'development' // 设置nodejs 环境变量
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
        use: [
          // 'style-loader', // 创建style标签 放入 head中
          MiniCssExtractPlugin.loader, // 提取js中css内容成单独文件 
          'css-loader', //
          // css 兼容性处理 postcss -> postcss-loader postcss-preset-env 
          // 使用 loader 的默认配置 
          // 'postcss-loader', 
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: () => [
          //        // 帮助 postcss 找到 package.json中 browserslist 里面的配置 然后加载对应的css兼容性配置
          //       require('postcss-preset-env')()
          //     ]
          //   }
          // }
          // webpack postcss 实现不一样 -> postcss-loader postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ]
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
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
  }
}