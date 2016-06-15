var gulp = require('gulp'),
    del = require('del'),
    nodemon = require('gulp-nodemon'), //Restart Node on changes
    mocha = require('gulp-mocha'), //testing
    babel = require("gulp-babel"), //transpile
    Cache = require('gulp-file-cache');

var cache = new Cache();

/**
 * Build Tasks
 */
gulp.task('clean:build', function() {
//  del('./dist/*')
});

gulp.task('build', function(){
  return gulp.src('./src/**/*.js') //ES2015 code
              .pipe(cache.filter()) // remember files
              .pipe(babel()) // transpile
              .pipe(cache.cache()) // cache them
              .pipe(gulp.dest('./dist')) //copy in distribution folder
});

/**
 * Server tasks
 */
gulp.task('serve:node', function(done) {
  nodemon({
    script: 'dist/app.js', // run ES5 code
    watch: './src', // watch ES2015 code
    tasks: ['build'] // compile synchronously onChange
  });
});

/**
 * Testing tasks 
 */
gulp.task('test', function(){
  return gulp.src('./test/*.js', {read: false})
              .pipe(mocha());
});

gulp.task('test:watch', function(){
  return gulp.watch('./src/**/*', ['test']);
});

/**
 * Main tasks
 */
gulp.task('start', ['serve:node']);
gulp.task('default', ['serve']);
