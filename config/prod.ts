import type { UserConfigExport } from '@tarojs/cli';
import dotenv from 'dotenv';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const envFile = isProduction ? '.env.production' : '.env.development';

dotenv.config({ path: path.join(__dirname, `../${envFile}`) });

const https = process.env.HTTPS === 'true';
const isMock = process.env.IS_MOCK === 'true';
const apiHost = process.env.API_HOST;

console.log('isProduction', isProduction, typeof isProduction);
console.log('https', https, typeof https);
console.log('isMock', isMock, typeof isMock);
console.log('apiHost', apiHost, typeof apiHost);
console.log('envFile', envFile, typeof envFile);

export default {
  defineConstants: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    __HTTPS__: isProduction ? 'true' : JSON.stringify(https),
    __API_HOST__: JSON.stringify(apiHost),
    __IS_MOCK__: JSON.stringify(isMock),
  },
  mini: {
    webpackChain(chain) {
      // 调整性能警告阈值（针对小程序）
      chain.performance
        .maxAssetSize(500000)
        .maxEntrypointSize(500000)
        .hints(false); // 禁用所有性能警告
    },
  },
  h5: {
    compile: {
      include: [
        // 确保产物为 es5
        (filename) => /node_modules\/(?!(@babel|core-js|style-loader|css-loader|react|react-dom))/.test(filename),
      ],
    },
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    // webpackChain (chain) {
    //   /**
    //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
    //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
    //    */
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    //   /**
    //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
    //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
    //    */
    //   const path = require('path')
    //   const Prerender = require('prerender-spa-plugin')
    //   const staticDir = path.join(__dirname, '..', 'dist')
    //   chain
    //     .plugin('prerender')
    //     .use(new Prerender({
    //       staticDir,
    //       routes: [ '/pages/index/index' ],
    //       postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
    //     }))
    // }
  },
} satisfies UserConfigExport<'webpack5'>;
