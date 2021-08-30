/*
 * @Description: webpack配置信息
 * @Author: WaynePeng
 * @Date: 2021-08-22 17:34:35
 * @LastEditTime: 2021-08-25 01:07:10
 * @LastEditors: WaynePeng
 */
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack配置信息
module.exports = {
  mode: 'development',
  entry: './src/index.ts', // 指定入口文件
  //  打包输出的文件所在的目录
  output: {
    path: path.resolve(__dirname, 'dist'), // 指定打包文件的目录
    filename: 'bundle.js', // 打包后文件的名字
    environment: {
      arrowFunction: false // webpack不使用箭头函数
    }
  },
  // 指定webpack打包时用到的模块
  module: {
    // 指定加载时的规则
    rules: [
      {
        test: /\.ts$/, // 指定规则生效的文件
        use: ['ts-loader'], // 使用的loader -> 从后往前执行
        exclude: /node_modules/ // 要排除的文件
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          }, 
          'less-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html' // 指定html模板
    }),
    new CleanWebpackPlugin()
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
