var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var uglify=require('gulp-uglify');

gulp.task('browserify', function() {
  browserify('./app/src/app.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/build'))
});

gulp.task('watch', function() {
  gulp.watch('./app/src/**/*.js', ['browserify'])
});
gulp.task('uglify',function(){
    return gulp.src('./app/build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/build'));

})
gulp.task('webserver', function() {
  gulp.src('./app')
    .pipe(webserver({
      host: '0.0.0.0',
	  port:8888,
      livereload: false
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
