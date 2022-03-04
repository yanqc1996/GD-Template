// 存放针对开发环境特殊处理的配置
module.exports = require('./webpack.common')({
  mode: 'development',
  plugins: [],
  stats: 'errors-only', //只在发生错误或有新的编译时输出
})
