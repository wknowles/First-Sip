var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

// gulp task to run browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  });
});