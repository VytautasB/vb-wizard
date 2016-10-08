var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyHtml = require('gulp-minify-html');
var ngTemplate = require('gulp-ng-template');
var clean = require('gulp-clean');

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

gulp.task('clean', function (cb) {
	gulp.src(['tmp', 'dist'], {read: false})
		.pipe(clean())
		.on('end', cb);
});

gulp.task('build:templates', function(cb) {
  gulp.src('src/**/*.html')
    .pipe(minifyHtml({empty: true, quotes: true}))
    .pipe(ngTemplate({
      moduleName: 'vb-wizard',
      filePath: 'templates.js'
    }))
    .pipe(gulp.dest('./tmp'))
    .on('end', cb);
});

gulp.task('css', function() {
	gulp.src('./src/**/*.css')
		.pipe(gulp.dest('./dist'));
})

gulp.task('build:js', function (cb) {
  pump([
        gulp.src([
        	'./src/**/*.module.js',
        	'./src/**/*.js',
        	'./tmp/templates.js']),
        sourcemaps.init(),
        concat('vb-wizard.js'),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('./dist/')
    ],
    cb
  );
});

gulp.task('build', ['clean', 'css', 'build:templates', 'build:js']);
gulp.task('default', ['connect', 'watch']);