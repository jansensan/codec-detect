// include gulp and plugins
var config = require('./gulp-config')(),
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true}),
  requireDir = require('require-dir');

// require tasks directory
requireDir('./tasks', {recurse: true});

// tasks
gulp.task('help', glp.taskListing);
gulp.task('default', ['help']);
gulp.task('build', ['validate', 'package:js']);