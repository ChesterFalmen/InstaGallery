const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-clean-css");
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const autoprefixer = require('gulp-autoprefixer');
const minifyJs = require('gulp-minify');
const del = require('del');

function browserServe(stop){
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    })
    stop()
}

function browserReload(){
    browsersync.reload();
}

function html(){
    return gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
}
function img(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

function js(){
    return gulp.src('./src/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(minifyJs({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('./dist/script'))
}

function css(){
    return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
}

function fonts(){
    return gulp.src('./src/scss/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./dist/css/fonts/'))
}

function watch(){
    gulp.watch('./src/**/*.*', gulp.parallel(html,css, js)).on('all', browsersync.reload)
}

function delDist(cb) {
	del.sync('dist');
    cb();
}

exports.build = gulp.parallel(delDist, html, css, js, img, fonts);
exports.dev = gulp.series(delDist, html, css, js, fonts, img, browserServe, watch);