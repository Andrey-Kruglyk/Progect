var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
 var imagemin = require('gulp-imagemin');

gulp.task('default', function() {  
    gulp.run('browser-sync', 'stylus', 'watch', 'css');
});

gulp.task('stylus', function(){
	gulp.src('src/sass/main.styl')
	  .pipe(stylus())
	   .pipe( gulp.dest('src/css'))
	   
});
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});
gulp.task('watch', function(){
	gulp.watch('src/sass/*.styl', ['stylus']);
	 gulp.watch('images/*', ['compress']);
});

gulp.task('css', function () {
	gulp.src('src/**/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
	    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('compress', function() {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'));
});