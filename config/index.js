'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api/*": {    //需要代理的路径
        target: "http://192.168.0.68:54099",  //需要代理的域名 配合
        // target: "http://192.168.3.66:9988",  //需要代理的域名 配合
        changeOrigin: true  //必须配置为true，才能正确代理
      },
      "/gmbc/api/*": {    //需要代理的路径
        // target: "http://192.168.0.68:9988",  //需要代理的域名 配合
        target: "http://mb.gaoming.gov.cn:8090",  //需要代理的域名 配合
        changeOrigin: true  //必须配置为true，才能正确代理
      },
      // "/gmbcapi/api/*": {    //需要代理的路径
      //   target: "http://192.168.0.164:8000",
      //   changeOrigin: true  //必须配置为true，才能正确代理
      // },
    },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    // host: '192.168.0.68',
    host: '0.0.0.0',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // // Template for index.html
    // index: path.resolve(__dirname, '../../www/index.html'),
    // assetsRoot: path.resolve(__dirname, '../../www'),
    // // Paths
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '',

    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/gmbc/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
