const path = require('path');
const babelConfig = require('@lower-ui/babel-config')
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve') // 定位node_modules模块
const rollupPluginBabel = require('rollup-plugin-babel')
const rollupPostcss = require('rollup-plugin-postcss')
const rollupUrl = require('rollup-plugin-url')
const rollupCommonjs = require('rollup-plugin-commonjs') // cmd to es6
const rollupPluginUMinify = require('rollup-plugin-babel-minify')
const postcssUrl2 = require("postcss-url")
const autoprefixer = require('autoprefixer')

// process.on('unhandledRejection', error => {
//   console.error('unhandledRejection', error);
// });


const rimraf = require('rimraf')
const sourcemap = true

// 分包umd 全局对象名
const lowerUI = 'LowerUi'

// 合并所有包的 全局对象名
const lowerui = 'lowerui'

/**
 * 根据配制产出css
 * @param {*} option 
 */
const getRollupPostcssConfig = function (option = { sourceMap: false, minimize: false, isOutPut: true, path: 'dist/style/index.css' }) {
  const _c = {
    plugins: [
      autoprefixer({ overrideBrowserslist: ['last 10 version', 'ie >=9'] }),
      postcssUrl2({ url: 'inline' })],
    sourceMap: option.sourceMap,
    minimize: option.minimize
  }
  if (option.isOutPut) {
    _c.extract = option.path // 输出路径
  }

  return rollupPostcss(_c)
}

async function bundle (option) {
  rimraf.sync('dist');
  option = Object.assign({
    input: './src/index.js',
    file: './dis/index.js',
    name: ''
  }, option);
  const minifyOptions = {
    comments: true
  };
  const rollupInOption = {
    input: option.input,
    plugins: [
      rollupResolve(),
      rollupCommonjs({
        include: /node_modules/,
        extensions: ['.js'],
      }),
      getRollupPostcssConfig(),
      rollupPluginBabel({
        runtimeHelpers: true,
        presets: babelConfig.presets,
        plugins: babelConfig.plugins,
        exclude: /node_modules/,// only transpile our source code
        include: option.includeBabel || []
      }),
      rollupUrl({
        limit: 100 * 1024, // inline files < 10k, copy files > 10k
        fileName: "[name][extname]",
        // emitFiles: false,
        // destDir: './dist/img',
        include:[/\.(png|gif|jpg|svg)/],
        // publicPath: 'dist/img/'
      }),
    ]
  }

  await rollup.rollup(Object.assign(rollupInOption, {})).then(bundle => {
    bundle.write({
      file: './dist/' + option.file,
      format: 'esm',
      name: option.name,
      sourcemap: sourcemap
    });
    bundle.write({
      file: './dist/umd/' + option.file,
      format: 'umd',
      name: option.name,
      sourcemap: sourcemap
    });
  });

  rollupInOption.plugins.push(rollupPluginUMinify(minifyOptions));
  await rollup.rollup(Object.assign(rollupInOption, {})).then(bundle => {
    bundle.write({
      file: './dist/' + option.file.replace('.js', '.min.js'),
      format: 'esm',
      name: option.name,
      sourcemap: sourcemap
    });
    bundle.write({
      file: './dist/umd/' + option.file.replace('.js', '.min.js'),
      format: 'umd',
      name: option.name,
      sourcemap: sourcemap
    });
  });
}

module.exports = { bundle, lowerUI, lowerui };
