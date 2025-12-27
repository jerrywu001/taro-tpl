import type { UserConfigExport } from '@tarojs/cli';
import dotenv from 'dotenv';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const envFile = isProduction ? '.env.production' : '.env.development';

dotenv.config({ path: path.join(__dirname, `../${envFile}`) });

const https = process.env.HTTPS === 'true';
const isMock = process.env.IS_MOCK === 'true';
const apiHost = process.env.API_HOST;
const enableSourcemap = process.env.ENABLE_SOURCEMAP === 'true';
const enableMinify = process.env.ENABLE_MINIFY === 'true';

console.log('enableSourcemap', enableSourcemap);
console.log('enableMinify', enableMinify);

export default {
  defineConstants: {
    __HTTPS__: isProduction ? 'true' : JSON.stringify(https),
    __API_HOST__: JSON.stringify(apiHost),
    __IS_MOCK__: JSON.stringify(isMock),
  },
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {
    webpackChain(chain) {
      // 调整性能警告阈值（针对小程序）
      chain.performance
        .maxAssetSize(500000)
        .maxEntrypointSize(500000)
        .hints(false); // 禁用所有性能警告

      // 根据环境变量配置 sourcemap
      chain.devtool(enableSourcemap ? 'source-map' : false);

      // 根据环境变量配置代码压缩
      if (enableMinify) {
        chain.optimization.minimize(true);
      } else {
        chain.optimization.minimize(false);
      }
    },
  },
  h5: {
    webpackChain(chain) {
      // 根据环境变量配置 sourcemap
      chain.devtool(enableSourcemap ? 'source-map' : false);

      // 根据环境变量配置代码压缩
      if (enableMinify) {
        chain.optimization.minimize(true);
      } else {
        chain.optimization.minimize(false);
      }
    },
  },
} satisfies UserConfigExport<'webpack5'>;
