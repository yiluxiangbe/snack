// 导入html插件
// 项目打包好后自动生成HTML文件，不需要我们手动去写

const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入clean插件。再次打包后自动将之前的打包文件删除掉，然后重新打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

// webpack所有的配置信息
module.exports = {
  mode: 'production', // 或者 'production' 或 'none'
  // 入口文件
  entry: './src/index.ts',
  // 打包出去的文件夹
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 打包出去的文件名
    filename: 'bundle.js'
  },
  // 指定webpack打包时需要用到的模块
  module: {
    rules: [
      {
        // test指定规则生效的文件
        // use表示需要用到的插件
        test: /\.ts$/,
        // 使用加载器的时候放在后面的要先运行
        // 这里的ts-loader要先运行，babel-loader后运行
        use: [
          {
            // 指定加载器，这里的babel东西有点多，我们需要设置一些东西
            loader: 'babel-loader',
            options: {
              // 设置预定义的环境
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '88'
                      // ie: '11'
                    },
                    corejs: '3',
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件夹
        exclude: /node_modules/
      },
      // 指定设置less文件的处理
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 引入postcss
          // 为了css样式在各个浏览器中的兼容性问题
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 version'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      // 可以在这里面写html界面的一些，比如题目之类的
      // title: '这是一个自定义title'
      // 将./src/index.html文件夹下自己写的网页结构作为模板使用
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}
