var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Configs for gulp-imagemin
var imagemin        = require('gulp-imagemin');



/**
 * Browsersync
 */
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
      proxy: "http://local.tiagones.com.br/magentones/"
    });
    gulp.watch("app/design/frontend/magentones/default/**").on('change', browserSync.reload);
});



/**
 * SASS
 */
gulp.task('sass', function () {
    return gulp.src('skin/frontend/magentones/default/sass/styles.sass')
        .pipe(sass({
            includePaths: ['skin/frontend/magentones/default/sass'],
            //Config for Minify the outputed file
            //outputStyle: 'compressed',
            onError: browserSync.notify
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('skin/frontend/magentones/default/css'))
        .pipe(browserSync.stream());
});



/**
 * Compile all the .js files using UglifyJS
 */
//gulp.task('uglify', function() {
    //return gulp.src([
        //'assets/_src/bower_components/jquery/dist/jquery.js',
        //'assets/_src/js/functions.js'
    //])
    //.pipe(concat('scripts.min.js'))
    //.pipe(uglify())
    //.pipe(gulp.dest('assets/js'))
    //.pipe(browserSync.reload({stream:true}))
    //.pipe(gulp.dest('_site/assets/js'));
//});



/**
 * Imagemin
 */
//gulp.task('imagemin', function () {
    //return gulp.src('assets/_src/img/**')
    //.pipe(imagemin({
        //verbose: true
    //}))
    //.pipe(gulp.dest('assets/img/'));
//});



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('skin/frontend/magentones/default/sass/**', ['sass']);
    gulp.watch('skin/frontend/magentones/default/js/**', ['uglify']);
    //gulp.watch('skin/frontend/magentones/default/images/**', ['imagemin']);
});



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', [ 'sass', 'browser-sync', 'watch']);
