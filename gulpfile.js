var gulp = require('gulp');

var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var util = require('gulp-util');

// All the paths to scripts we want to jshint
var scriptPaths = [
  './public/js/**/*.js',
  './routes/**/*.js',
  './app.js'
];

gulp.task('styles', function() {
  return gulp.src('./public/scss/**/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
      sourceComments: 'none',
      outputStyle: 'compressed'
    }))
    .pipe(prefix('last 5 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload({ auto: false }))
    .on('error', util.log);
});

gulp.task('scripts', function() {
  return gulp.src(scriptPaths)
    .pipe(livereload({ auto: false }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish, { verbose: true }))
    .on('error', util.log);
});

gulp.task('html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(livereload({ auto: false }))
    .on('error', util.log);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.start('styles', 'scripts', 'html');
  gulp.watch('./public/scss/**/*.scss', ['styles']);
  gulp.watch(scriptPaths, ['scripts']);
  gulp.watch('./public/**/*.html', ['html']);
});

gulp.task('default', ['watch']);