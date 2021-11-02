/* eslint-disable indent */

module.exports = {
  // ...
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  publicPath: process.env.NODE_ENV==='production'? './' : "/", // 构建好的文件输出到哪里
  outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
//   assetsDir: "./",
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
//   runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
//   transpileDependencies: [
//       /* string or regex */
//   ], // 是否为生产环境构建生成sourceMap?
//   productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//   configureWebpack: () => {}, // CSS 相关选项
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '~@/assets/css/theme-color.scss';"
      }
    }
  },
//   chainWebpack: config => {
//     config.module
//       .rule('i18n')
//       .resourceQuery(/blockType=i18n/)
//       .type('javascript/auto')
//       .use('i18n')
//         .loader('@kazupon/vue-i18n-loader')
//         .end()
//   },
//   devServer: {
//     // 设置主机地址
//    host: 'localhost',
//    // 设置默认端口
//    port: 8080,
//    // 设置代理
//    proxy: {
//      '/api/v1': {
//          // 目标 API 地址
//          target: 'http://localhost:3000/api/v1',
//          // 如果要代理 websockets
//          ws: true,
//          // 将主机标头的原点更改为目标URL
//          changeOrigin: false
//      }
//    }
//   },
// //   devServer: {
// //     open: process.platform === "darwin",
// //     disableHostCheck: false,
// //     host: "0.0.0.0",
// //     port: 8081,
// //     https: false,
// //     hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
// //     // proxy: 'http://localhost:3000/api/v1',
// //     // proxyTable: {
// //     //   '/api/v1': {  //使用"/api"来代替"http://f.apiplus.c" 
// //     //     target: 'http://localhost:3000/api/v1', //源地址 
// //     //     changeOrigin: true, //改变源 
// //     //     // pathRewrite: { 
// //     //     //   '^/api': 'http://www.pitteeful.com/api/v1' //路径重写 
// //     //     // }
// //     //   } 
// //     // }
// //     // before: app => {}
// // }, // 第三方插件配置
// pluginOptions: {
//     // ...
// }
}
