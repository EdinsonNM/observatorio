var nunjucksRender = require('gulp-nunjucks-render');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
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

gulp.task("webpack-dev-server", function(callback) {
	let compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
		contentBase: path.resolve(__dirname, 'public'),
		inline: true
	}).listen(8000, "localhost", function(err) {
		
	});
});

gulp.task("build",["nunjucks","webpack"], function(callback) {

});


gulp.task('server',["webpack-dev-server"], function() {
  // place code for your default task here
});
