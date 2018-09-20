const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const deploy = require('gulp-gh-pages');

gulp.task('browserify', () => browserify()
  .require('src/js/index.js', {
    entry: true,
    extensions: ['.js'],
    debug: true,
  })
  .transform(babelify, { presets: ['stage-0'] })
  .bundle()
  .pipe(source('index.js'))
  .pipe(gulp.dest('dest/js')));

gulp.task('default', () => {
  gulp.watch('./src/js/*.js', ['browserify']);
});

gulp.task('deploy', () => gulp.src('./dest/**/*')
  .pipe(deploy()));
