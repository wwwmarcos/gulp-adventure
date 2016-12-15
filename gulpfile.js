const gulp = require('gulp')
const concat = require('gulp-concat')
const stylus = require('gulp-stylus')
const browserSync = require('browser-sync')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const reload = browserSync.reload

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
