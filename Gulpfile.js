var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function() {
	connect.server({
		root: ['src', '.'],
		livereload: true
	});
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('build', function (cb) {
  pump([
        gulp.src([
        	'./src/**/*.module.js',
        	'./src/**/*.js']),
        sourcemaps.init(),
        concat('vb-wizard.js'),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('./dist/')
    ],
    cb
  );
});

gulp.task('default', ['connect', 'watch']);