/*
Guplfile is only for compile templates in production
*/
var nunjucksRender = require('gulp-nunjucks-render');
var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var ghpages = require('gh-pages');
var path = require('path');

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
  callback();
});

gulp.task("publish",["build"], function(callback) {
  ghpages.publish(path.join(__dirname, 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/EdinsonNM/observatorio.git'
  },
  function(err) { console.log("published in gh-pages") });
});
