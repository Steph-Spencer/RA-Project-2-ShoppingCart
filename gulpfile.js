var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var sass = require ('gulp-sass');

gulp.task('hello', function(){
	console.log("hello");
});

gulp.task('scss', function() {
  gulp.src('src/scss/app.scss')
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/css/'));
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['scss']);
})