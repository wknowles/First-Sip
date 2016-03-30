// require gulp
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    nunjucksRender = require('gulp-nunjucks-render'),
    input  = {
      'sass': 'src/scss/**/*.scss',
      'javascript': 'src/javascript/**/*.js'
    },
    output = {
      'stylesheets': 'dist/css',
      'javascript': 'dist/js'
    };

// gulp task to combine partial html files
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|njk|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('app'));
});

// gulp task to process sass into css
gulp.task('sass', function(){
  return gulp.src(input.sass) // Gets all files ending with .scss in app/scss
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/css')) //Sets destination of processed sass
    .pipe(browserSync.reload({ // Tells browserSync to reload when sass changes
      stream: true
    }));
});

// gulp task to run browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

// gulp task to watch for changes and then run tasks above
gulp.task('watch', ['browserSync', 'nunjucks', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/pages/**/*.+(html|njk|nunjucks)', ['nunjucks']);
  gulp.watch('app/templates/**/*.+(html|njk|nunjucks)', ['nunjucks']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp task to combine, minify and concat css & js
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
// Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// gulp task to optimize images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
// Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'));
});

// clean up dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// gulp build to put everything together
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['nunjucks', 'sass', 'useref', 'images'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['nunjucks', 'sass', 'browserSync', 'watch'],
    callback
  );
});