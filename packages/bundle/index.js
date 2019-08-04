// const path = require('path')
const babelConfig = require('@lower-ui/babel-config')
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve') // 定位node_modules模块
const rollupPluginBabel = require('rollup-plugin-babel')
const rollupPostcss = require('rollup-plugin-postcss')
const rollupUrl = require('rollup-plugin-url')
const rollupCommonjs = require('rollup-plugin-commonjs') // cmd to es6
const rollupPluginUMinify = require('rollup-plugin-babel-minify')
const postcssUrl2 = require('postcss-url')
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
const getRollupPostcssConfig = function (option = { sourceMap: false, minimize: true, isOutPut: true, path: 'dist/style/index.css' }) {
  if (option.minimize)
  {
    option.sourceMap = true;
    option.path = 'dist/style/index.min.css'
  }
  const _c = {
    plugins: [
      autoprefixer({ overrideBrowserslist: ['last 10 version', 'ie >=9'] }),
      postcssUrl2({ url: 'inline' })],
    sourceMap: option.sourceMap,
    minimize: option.minimize
  }
  if (option.isOutPut)
  {
    _c.extract = option.path // 输出路径
  }

  return rollupPostcss(_c)
}

async function bundle (option) {
  if (process.argv.includes('-w'))
  {
    watch(option);
    return;
  }
  rimraf.sync('dist')
  option = Object.assign({
    input: './src/index.js',
    file: './dis/index.js',
    name: ''
  }, option)
  const minifyOptions = {
    comments: true
  }
  const rollupInOption = function (type,ismini) {
    return {
      input: option.input,
      plugins: [
        rollupResolve(),
        rollupCommonjs({
          include: /node_modules/,
          extensions: ['.js']
        }),
        getRollupPostcssConfig(ismini),
        rollupPluginBabel({
          runtimeHelpers: false,
          presets: babelConfig.presets,
          plugins: type === 'es' ? babelConfig.esPlugins : babelConfig.plugins,
          exclude: /node_modules/, // only transpile our source code
          include: option.includeBabel || []
        }),
        rollupUrl({
          limit: 100 * 1024, // inline files < 10k, copy files > 10k
          fileName: '[name][extname]',
          // emitFiles: false,
          // destDir: './dist/img',
          include: [/\.(png|gif|jpg|svg)/]
          // publicPath: 'dist/img/'
        })
      ]
      // external:['preact']
    }
  }

  const newEsOption = rollupInOption('es')
  await rollup.rollup(newEsOption).then(bundle => {
    bundle.write({
      file: './dist/' + option.file,
      format: 'esm',
      name: option.name,
      sourcemap: sourcemap
    })
  })

  newEsOption.plugins.push(rollupPluginUMinify(minifyOptions))
  await rollup.rollup(Object.assign(newEsOption, {})).then(bundle => {
    bundle.write({
      file: './dist/' + option.file.replace('.js', '.min.js'),
      format: 'esm',
      name: option.name,
      sourcemap: sourcemap
    })
  })

  const newUmdOption = rollupInOption()
  await rollup.rollup(Object.assign(newUmdOption, {})).then(bundle => {
    bundle.write({
      file: './dist/umd/' + option.file,
      format: 'umd',
      name: option.name,
      sourcemap: sourcemap
    })
  })

  newUmdOption.plugins.push(rollupPluginUMinify(minifyOptions))
  await rollup.rollup(Object.assign(newUmdOption, {})).then(bundle => {
    bundle.write({
      file: './dist/umd/' + option.file.replace('.js', '.min.js'),
      format: 'umd',
      name: option.name,
      sourcemap: sourcemap
    })
  })
}

const watch = function (option) {

  option = Object.assign({
    input: './src/index.js',
    file: './dis/index.js',
    name: ''
  }, option)

  const rollupInOption = function (type) {
    return {
      input: option.input,
      plugins: [
        rollupResolve(),
        rollupCommonjs({
          include: /node_modules/,
          extensions: ['.js']
        }),
        getRollupPostcssConfig(),
        rollupPluginBabel({
          runtimeHelpers: false,
          presets: babelConfig.presets,
          plugins: type === 'es' ? babelConfig.esPlugins : babelConfig.plugins,
          exclude: /node_modules/, // only transpile our source code
          include: option.includeBabel || []
        }),
        rollupUrl({
          limit: 100 * 1024, // inline files < 10k, copy files > 10k
          fileName: '[name][extname]',
          // emitFiles: false,
          // destDir: './dist/img',
          include: [/\.(png|gif|jpg|svg)/]
          // publicPath: 'dist/img/'
        })
      ]
    }
  }

  const inUmdOption = rollupInOption()
  const outUmdOption = {
    file: './dist/umd/' + option.file,
    format: 'umd',
    name: option.name,
    sourcemap: sourcemap
  };

  const watcher = rollup.watch({
    ...inUmdOption,
    output: [outUmdOption],
    watch: {
      exclude: '*.js'
    }
  });

  watcher.on('event', event => {
    // console.log(event);
    if (event.code === 'START')
    {
      console.log('编译开始...');
    }
    if (event.code === 'ERROR')
    {
      console.log('ERROR', event);
    }

    if (event.code === 'BUNDLE_START')
    {
      console.log('编译完成');
    }

    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error
  });
}

module.exports = { bundle, lowerUI, lowerui }
