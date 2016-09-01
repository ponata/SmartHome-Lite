var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var uglyfly = require('gulp-uglyfly');
var watch = require('gulp-watch');
gulp.task('default', function() {
    console.log("default task");

});
gulp.task('js-minify', () => {
    gulp.src('scripts/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('scripts'));
})

gulp.task('compress', function() {
    gulp.src('scripts/*.min.js')
        .pipe(uglyfly())
        .pipe(rename({suffix:'.ugly'}))
        .pipe(gulp.dest('dist'))
});
gulp.task('watch', function () {
    // Endless stream mode
    return watch('scripts/*.js', () => {
        console.log('File changed');
    } )

});