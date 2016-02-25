var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    
    plugins = require('gulp-load-plugins');

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(plugins.useref())
        .pipe(plugins.gulpIf('*.js', plugins.uglify()))
        .pipe(plugins.gulpIf('*.css', plugins.cssnano()))
        .pipe(plugins.gulpIf('*.css', plugins.autoprefix({browsers: ['last 2 versions']})))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(plugins.gulp.dest('build'))
        .pipe(plugins.notify('Useref completed!'))
});

gulp.task('images', function () {
    var imgSrc = 'app/img/**/*.{gif,jpg,png,svg}',
        imgDst = 'build/img';
    return gulp.src(imgSrc)
        .pipe(plugins.imagemin({
            optimizationLevel: 5,
            interlaced: true,
            pngquant: true
        }))
        .pipe(gulp.dest(imgDst))
});

gulp.task('sass', function () {
    return gulp.src('app/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/styles/css'))
});

gulp.task('fonts', function () {
    var fontSrc = 'app/fonts/**/*',
        fontDst = 'build/fonts';

    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst))
});

gulp.task('assets', function () {
    var fontSrc = 'app/assets/**',
        fontDst = 'build/assets';

    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst))
});

gulp.task('clean', function () {
    return del.sync('build');
});

gulp.task('browserSync', function () {
    var files = [
        'app/**/*.html',
        'app/styles/css/**/*.css',
        'app/js/**/*.js',
        'app/images/**/'
    ];
    browserSync({
        server: {
            baseDir: 'app',
        },
        browser: "chrome"
    })
});

gulp.task('watch', function () {
    gulp.watch('app/styles/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/styles/**/*.css', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function () {
    runSequence('clean', ['useref', 'images', 'fonts', 'assets']);
});

gulp.task('default', function () {
    runSequence(['browserSync', 'watch']);
});
