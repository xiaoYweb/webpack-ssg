/**
 * webpack  入口文件
 * 
 * 运行指令 
 * 开发环境 webpack ./src/index.js -o ./build/build.js --mode=development
 *    以 ./src/index.js 为入口文件打包  打包后输出到 ./build/build.js 打包环境为开发环境
 * 生产环境 webpack ./src/index.js -o ./build/build.js --mode=production
 *    生产环境会压缩代码
 *      
 * summery 
 * 1. webpack 能处理 js json 文件 其他文件 无法处理  css img ...
 * 2. webpack 将es6语法 转化为 es5 
 * 3. 生产环境会压缩代码
 */
import data from './data.json'
// import './index.css' 


function add(x, y) {
  return x + y
}

console.log(add(1, 2), data)