var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

// gulp task to process sass into css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/css')) // Dest of css
    .pipe(browserSync.reload({ // Tells browserSync to reload when sass changes
      stream: true
    }));
});