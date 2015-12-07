var config = require('../gulp-config')(),
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({lazy: true});

// tasks
gulp.task('validate', validateJS);

// methods
function validateJS() {
  return gulp
    .src(config.filesets.appSourceFiles)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(plugins.jshint.reporter('fail'));
}