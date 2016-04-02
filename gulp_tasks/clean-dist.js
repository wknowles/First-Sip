var gulp = require('gulp'),
    del = require('del');

// clean up dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});