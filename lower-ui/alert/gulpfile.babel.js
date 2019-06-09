import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import sass from "gulp-sass";
import nsass from "node-sass";
import eslint from "gulp-eslint";

sass.compiler = nsass;

export function lint() {
  return gulp
    .src(["**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
export function scss() {
  return gulp
    .src("./src/sass/**/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([require("precss"), require("autoprefixer")]))
    .pipe(gulp.dest("./dist/css"));
}

export function es6() {
  return gulp
    .src("src/**/*.js", { sourcemaps: true })
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist"));
}

export function css() {
  return gulp
    .src("src/**/*.css", { sourcemaps: true })
    .pipe(postcss([require("precss"), require("autoprefixer")]))
    .pipe(gulp.dest("build/"));
}

export default gulp.series(lint, gulp.parallel(es6, scss));
