var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();

gulp.task("html",function(){
	gulp.src("./src/*.html")
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('css',function(){
	gulp.src('src/css/*.less')
	.pipe(less())
	.pipe(concat('all.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("js",function(){
	gulp.src("src/js/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("images",function(){
	gulp.src("src/images/*.*")
		.pipe(gulp.dest("dist/images"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("work",["html","css","js","images"],function(){
	browserSync.init({
		server:{
			baseDir:"./dist",
			index:'1.html'
		}
	});
	gulp.watch("src/styles/*.less",["css"]);
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/*.html",["html"]);
	gulp.watch("src/images/*.*",["images"]);

});

