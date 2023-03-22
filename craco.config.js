const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 分析插件，打包后在build/static/report.html中展示各模块所占的大小
const TerserPlugin = require('terser-webpack-plugin');

const postcss = require('./config/postcss.config');
const resolve = (dir) => require('path').resolve(__dirname, dir);
const analyze = process.env.REACT_APP_ENV !== 'development'; // 非测试

const plugins = [];
if (analyze) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: true, // 构建完打开浏览器
      reportFilename: resolve(__dirname, 'analyzer/index.html'),
    }),
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境下移除控制台所有的内容
          drop_debugger: true, // 生产环境下移除断点
          pure_funcs: ['console.log'], // 生产环境下移除console
        },
      },
    }),
  );
}
module.exports = {
  webpack: {
    alias: {
      '@': resolve('./src'),
      '@package': resolve('./package.json'),
    },
    plugins,
  },
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: postcss,
        },
      },
    },
  },
};
