var config = require('../gulp-config')().validate,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks
gulp.task('validate', validateJS);

// methods
function validateJS() {
  return gulp
    .src(config.src)
    .pipe(glp.jshint())
    .pipe(glp.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(glp.jshint.reporter('fail'));
}
