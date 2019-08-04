const path = require('path');
const fs = require("fs");

const { src, dest, parallel, series, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssUrl2 = require('postcss-url');
var assets = require('postcss-assets');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

function isDirSync (aPath) {
  try
  {
    return fs.statSync(aPath).isDirectory();
  } catch (e)
  {
    if (e.code === 'ENOENT')
    {
      return false;
    } else
    {
      throw e;
    }
  }
}

const plugins = [
  autoprefixer(),
  postcssUrl2([
    { filter: 'assets/ali_font/*', url: 'copy', assetsPath: 'dist/font', useHash: true },
    { filter: 'assets/**/*.png', url: 'inline' },
    { filter: 'assets/**/*.gif', url: 'inline' },
    { filter: 'assets/**/*.jpg', url: 'inline' }
  ]), assets({
    loadPaths: ['sass/ali_font/']
  })];


function taskClean (done) {
  if (isDirSync(path.join(__dirname, 'dist')))
  {
    return src('dist', { read: false })
      .pipe(clean());
  }
  return done();
}

function css () {
  return src('sass/lower-ui.scss', { base: 'sass' })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest('dist'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(dest('dist'), {
      sourcemaps: true
    })
}

const taskWatch = function () {
  watch('sass/*', function () {
    return css();
  });
}



exports.css = css;
exports.watch = taskWatch;
exports.default = series(taskClean, parallel(css));
