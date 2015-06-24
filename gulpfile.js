var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var sass = require('gulp-sass');

// Paths to assets
var paths = {
  js: [
    './assets/js/app.jsx'
  ],
  sass: [
    './assets/sass/**/*.scss'
  ]
}

// Available Gulp tasks
gulp.task('default', ['watch']);
gulp.task('build', ['browserify', 'sass']);
 
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: paths.js,
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    var watcher  = watchify(bundler);
    return watcher

    .on('update', function () {
        var updateStart = Date.now();
        watcher.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js/'));
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js/'));
});


gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass({ style: 'compressed' }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['browserify']);
});
