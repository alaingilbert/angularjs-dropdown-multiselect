var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var ghPages = require('gulp-gh-pages');
var connect = require('gulp-connect');


gulp.task('devserver', function() {
  connect.server({livereload: true});
});


gulp.task('github', function() {
  var options = {
    remoteUrl: 'git@github.com:alaingilbert/angular-dropdown-multiselect.git',
    branch: 'gh-pages',
    push: true,
  };

  return gulp.src('pages/**/*')
      .pipe(ghPages(options));
});


gulp.task('default', function() {
  var app = gulp.src('src/*.js');

  var templates = gulp.src('src/partials/*.html')
      .pipe(templateCache({module: 'angular-dropdown-multiselect', root: 'src/partials'}));

  return merge(app, templates)
      .pipe(concat('angular-dropdown-multiselect.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});
