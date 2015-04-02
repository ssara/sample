// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var compass = require('gulp-compass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');



gulp.task('compass', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'src/scss',
      image:'src/images/',
      font:'app/fonts'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());;
});

// tasks
gulp.task('lint', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('minify-js', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(uglify({
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(connect.reload());
});



gulp.task('connect', function () {

  gulp.watch(['app/index.html'], function() {
    gulp.src(['app/index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    root: 'app/',
    livereload: true,
    port: 8888
  });
});


function changeNotification(event) {
  console.log('File', event.path, 'was', event.type, ', running tasks...');
}

gulp.task('minify-html', function() {
  return gulp.src(['src/*.html','src/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app'))
});

gulp.task('font', function() {
    var fontTask = gulp.src('src/fonts/**/*');
    fontTask.pipe(gulp.dest('app/fonts'));
});
gulp.task('data', function() {
    var fontTask = gulp.src('src/data/**/*');
    fontTask.pipe(gulp.dest('app/data'));
});
function watch() {
  var jsWatcher = gulp.watch('src/js/**/*.js', ['minify-js', 'lint']),
      cssWatcher = gulp.watch('src/scss/**/*.scss', ['compass']),
      htmlWatcher = gulp.watch(['src/index.html','src/views/**/*.html'], ['minify-html']);

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
  htmlWatcher.on('change', changeNotification);
}

// default task
gulp.task('default',
  ['lint', 'connect']
);

// build task
gulp.task('build',
  ['lint', 'font','data','compass','minify-js','minify-html']
);

gulp.task('watch', ['connect', 'build'], watch);
