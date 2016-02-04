var config = require('../gulp-config')().package,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks
gulp.task('package:js', packageSources);

// methods
function packageSources() {
  return gulp
    .src(config.src)
    .pipe(glp.concat('codec-detect.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(glp.uglify())
    .pipe(glp.concat('codec-detect.min.js'))
    .pipe(gulp.dest(config.dest));
}
