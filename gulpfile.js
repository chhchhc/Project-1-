//Module
var gulp = require('gulp');
sass = require('gulp-sass');
notify = require('gulp-notify');
sourcemaps = require('gulp-sourcemaps');
autoprefixer = require('gulp-autoprefixer');
rename = require('gulp-rename');
pug = require('gulp-pug');
browserSync = require('browser-sync');

var path = {
  src: {
    style: 'dev/scss/**/*.scss',
    templates: 'dev/pug/**/*.pug',
    pages: 'dev/pug/pages/*.pug'
  },
  dest: {
    style: 'assets/css/',
    pages: 'pages/'
  }
}


//Serve Gulp
gulp.task('serve', function(done){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	done();
})


//Handle Template Gulp
gulp.task('templates', function (done) {
  return (
    gulp.src(path.src.pages)
      .pipe(pug({
        cache: false,
        pretty: true
      })).on('error', notify.onError(
        function (error) {
          return (
            '\nTrouble in file : ' + error.message
          )
        }
      ))
      .pipe(gulp.dest('./'))
      .on('end', browserSync.reload)
  )
})


//Handle Style
gulp.task('styles', function(){
	return(
		gulp.src(path.src.style)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', notify.onError(
				function(error){
					return(
						'\nTrouble in file : ' + error.message
					)
				}
			)))
			.pipe(autoprefixer({
				cascade: false
			}))
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(path.dest.style))
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(path.dest.style))
			.pipe(browserSync.stream())
	)
});


//Build Style ?
gulp.task('buildStyles', function(){
	return(
		gulp.src('assets/css/style.min.css')
			.pipe(stripCssComments({
				preserve: false
			}))
			.pipe(cssmin())
			.pipe(combineMq({
				beautify: false
			}))
			.pipe(gulp.dest(path.dest.style))

	)
});


//Handle OnChange Update
gulp.task('watch', function () {
  gulp.watch(path.src.templates, gulp.parallel('templates'));
  gulp.watch(path.src.style, gulp.parallel('styles'));
});


//AutoRun Gulp
gulp.task('default', gulp.parallel('watch', 'serve'));