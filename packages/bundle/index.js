const babelConfig = require('@lower-ui/babel-config')
const gulp = require('gulp')
const gulpStandard = require('gulp-standard') // 代码规范
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve') // 定位node_modules模块
const rollupPluginBabel = require('rollup-plugin-babel')
const rollupPostcss = require('rollup-plugin-postcss')
const rollupUrl = require('rollup-plugin-url')
const rollupCommonjs = require('rollup-plugin-commonjs') // cmd to es6
const rollupPluginUMinify = require('rollup-plugin-babel-minify')
const postcssUrl2 = require("postcss-url")
const assets = require('postcss-assets')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const postcssModules = require('postcss-modules')


const rimraf = require('rimraf')
const sourcemap = true

// 分包umd 全局对象名
const lowerUI = 'LowerUi'

// 合并所有包的 全局对象名
const lowerui = 'lowerui'

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
      rollupPostcss(),
      // rollupUrl({
      //   limit: 14 * 1024, // inline files < 10k, copy files > 10k
      //   fileName: "[hash][extname]",
      //   destDir: './dist/img'
      // }),
      rollupCommonjs({
        include: /node_modules/
      }),
      rollupPluginBabel({
        runtimeHelpers: true,
        presets: babelConfig.presets,
        plugins: babelConfig.plugins,
        exclude: /node_modules/,// only transpile our source code
        include: option.includeBabel || []
      })
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
