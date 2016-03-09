var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    autoprefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    changed = require('gulp-changed'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    useref = require('gulp-useref'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),

    browserSync = require('browser-sync');

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.css', autoprefix({browsers: ['last 2 versions']})))
        .pipe(useref())
        .pipe(gulp.dest('build'))
});

gulp.task('html', ['sass'], function () {
    return gulp.src('app/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('build'))
});

gulp.task('images', function () {
    var imgSrc = 'app/img/**/*',
        imgDst = 'build/img';
    return gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
});

gulp.task('sass', function () {
    return gulp.src('app/styles/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles/css'))
});

gulp.task('styles', function () {

});

gulp.task('assets', ['images'], function () {
    var src = 'app/img/*.svg',
        dst = 'build/img';

    return gulp.src(src)
        .pipe(gulp.dest(dst))
});

gulp.task('fonts', function () {
    var fontSrc = 'app/fonts/**/*',
        fontDst = 'build/fonts';

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
    runSequence('clean', ['useref', 'fonts', 'html', 'assets']);
});

gulp.task('default', function () {
    runSequence(['browserSync', 'watch']);
});
