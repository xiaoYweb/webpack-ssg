const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 定义 nodejs 环境变量  决定 browserslist 使用哪个环境配置 
process.env.NODE_ENV = 'development'

const commonCssLoader = [
  // 'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // css兼容性处理 还需在 package.json 中定义哪些浏览器 browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-loader-env')()
      ]
    }
  }
]
module.exports = {
  mode: 'production', // 生产环境 js会直接压缩
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  modules: [
    {
      test: /.css$/,
      use: [...commonCssLoader]
    },
    {
      test: /.less$/,
      use: [...commonCssLoader, 'less-loader']
    },
    // 正常情况 一个文件被一个文件处理 先执行eslint 后执行 js转译
    { // 语法检测 在 package.json 文件中eslintConfig --> airbnb 规则
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre', // 优先执行
      options: {
        fix: true, // 
      }
    },
    { // js 兼容性处理
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          {
            useBuildIns: 'usage',
            corejs: { version: 3 },
            target: {
              chrome: '60',
              firefox: '60',
              ie: '9',
              safari: '10',
              edge: '17'
            }
          }
        ]
      }
    },
    {
      test: /.(gif|jpg|png)$/,
      // loader: 'file-loader',
      loader: 'url-loader', // 默认 使用的是 esModule 导入导出
      options: {
        limit: 8 * 1024,
        name: '[hash:10].[ext]',
        outputPath: 'imgs',
        esModule: false // 关闭 esModule 导入导出语法
      }
    },
    { // 这个loader使用是commonjs 语法 导入导出 所以
      test: /.html$/,
      laoder: 'html-loader'
    },
    {
      exclude: /.(js|css|less|html|jpg|png)/,
      loader: 'file-loader',
      options: {
        outputPath: 'media'
      }
    }
  ],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    }),
    new optimizeCssAssetsWebpackPlugin(), // css压缩
    new HtmlWebpackPlugin({ // 处理 html 
      template: './src/index.html', // 指定模板
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true,  // 移除注释
      }
    })
  ]
}