// include gulp and plugins
var config = require('./lib/gulp-config')(),
  gulp = require('gulp'),
  requireDir = require('require-dir');

// require tasks directory
requireDir('./lib/tasks', {recurse: true});

// tasks
gulp.task('build', ['validate', 'package:js']);