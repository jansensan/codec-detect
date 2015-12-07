var config = require('../gulp-config')(),
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

// tasks
gulp.task('package:js', packageSources);

// methods
function packageSources() {
  return gulp
    .src(config.filesets.appSourceFiles)
    .pipe(concat('codec-detect.js'))
    .pipe(gulp.dest(config.paths.distDir))
    .pipe(uglify())
    .pipe(concat('codec-detect.min.js'))
    .pipe(gulp.dest(config.paths.distDir));
}
