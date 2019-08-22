'use strict';

// Load plugins
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function css() {
  return gulp
    .src("./scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream());
}

function js() {
  return gulp
    .src([
      './js/**/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(terser())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browsersync.stream());
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    notify: false,
    injectChanges: true,
    online: true,
    reloadOnRestart: true,
    logFileChanges: true,
    ghostMode: false,
    logLevel: "warn",
    ui: false
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch("./scss/**/*.*", css);
  gulp.watch(["./js/**/*.js"], js);
  gulp.watch(["./**/*.html", "!./node_modules"], browserSyncReload);
}

gulp.task("default", gulp.parallel(css, js));
gulp.task("css", css);
gulp.task("js", js);
gulp.task("dev", gulp.parallel(watchFiles, browserSync));
