const gulp = require('gulp'),
  concat = require('gulp-concat'),
  stylus = require('gulp-stylus'),
  browserSync = require('browser-sync'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  reload = browserSync.reload

const paths = {
  src: {
    styl: 'src/styl/*.styl',
    html: 'index.html',
  },
  dist: {
    css: 'dist/css/'
  },
  watch: {
    css: 'dist/css/*.css'
  }
}

gulp.task('styles', () => {
  gulp.src(paths.src.styl)
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist.css))
})

gulp.task('browser-sync', () => {
  browserSync.init({
    open: true,
    notify: false,
    server: './'
  })
})

gulp.task('default', ['browser-sync'], () => {
  gulp.watch(paths.src.styl, ['styles'])
  gulp.watch(paths.watch.css, reload)
  gulp.watch(paths.src.html, reload)
})