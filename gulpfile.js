/*
* Dependencias
*/
var gulp 		= require('gulp'),
	jshint 		= require('gulp-jshint'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	stylus 		= require('gulp-stylus'),
	imagemin 	= require('gulp-imagemin'),
	pngquant 	= require('imagemin-pngquant'),
	notify		= require('gulp-notify'),
	rename		= require('gulp-rename'),
	prefix		= require('gulp-autoprefixer');



var path = {
    stylus: ['project/stylus/style.styl'],
    css_min: 'project/css/min/',
    css: 'project/css/'
};

/*
*	watch
*
*/

path.watch = {
    stylus: ['project/stylus/*.styl'],
    js: ['project/js/*.js']
};

gulp.task('watch', function () {

    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.stylus, ['css']);
});



/*
* Configuración de las tareas
*/
gulp.task('default', ['images', 'css-min', 'js']);

gulp.task('images',function(){
    return gulp.src(['project/img/*.*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('project/img/'))
        .pipe(notify('images compiled'));
});




gulp.task('css-min',function(){
    return gulp.src(path.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(prefix())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(path.css_min))
        .pipe(notify('css_min compiled'));
});




gulp.task('js',function() {
	return gulp.src('project/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest('project/js/min/'));
});