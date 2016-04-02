var gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render');

// gulp task to combine partial html files using nunjucks templates
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates']);
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|njk|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('app'));
});