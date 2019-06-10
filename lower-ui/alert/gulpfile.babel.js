import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import sass from "gulp-sass";
import nsass from "node-sass";
const rollup = require('rollup');
const standard = require('gulp-standard');

sass.compiler = nsass;

export function lint () {
  return gulp.src(['./src/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true,
      showFilePath: true
    }))
}

export function scss () {
  return gulp
    .src("./src/sass/**/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([require("precss"), require("autoprefixer")]))
    .pipe(gulp.dest("./dist/css"));
}

export function es6 () {
  return gulp
    .src("src/**/*.js", { sourcemaps: true })
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist"));
}

export function css () {
  return gulp
    .src("src/**/*.css", { sourcemaps: true })
    .pipe(postcss([require("precss"), require("autoprefixer")]))
    .pipe(gulp.dest("build/"));
}

export function out () {
  return rollup.rollup({
    input: './src/index.js'
  }).then(bundle => {
    return bundle.write({
      file: './dist/library.js',
      format: 'umd',
      name: 'library',
      sourcemap: true
    });
  });
}


export default gulp.series(lint, gulp.parallel(es6, scss));
