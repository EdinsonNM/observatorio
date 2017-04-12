/*
Guplfile is only for compile templates in production
*/
var nunjucksRender = require('gulp-nunjucks-render');
var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('nunjucks', function() {
  return gulp.src('src/tpl/pages/**/*.+(html|njk)')
  	.pipe(nunjucksRender({
      path: ['src/tpl/layouts','src/tpl/partials']
    }))
   .pipe(gulp.dest('build'));
});

gulp.task("webpack", function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});

gulp.task("build",["nunjucks","webpack"], function(callback) {

});