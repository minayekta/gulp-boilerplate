//list dependences

const { src, dest, watch, series } = require('gulp');
const dartSass = require('sass');
const gulpSass  = require('gulp-sass');
const sass = gulpSass(dartSass);
const prefix = require( 'gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
// const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');



//create functions


//scss
function compiledcss(){
    return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('/dist/css'))
}

//js
function jsmin(){
return src('src/js/*.js')
.pipe(terser())
.pipe(dest('/dist/js'))
}
//images

// function optimizeimg(){
//     return src('src/images//*.{jpg,png}')
//     .pipe(imagemin(
//         imagemin.mozjpeg({ quality : 80 , progressive: true}),
//         imagemin.optipng({ optimizationLevel: 2})
//     ))
//     .pipe(dest('dist/images'))
// }
//webp images

function webpImage(){
    return src('dist/iamges/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}
// create watchtask
function watchTask(){
    watch('src/scss/*.scss', compiledcss);
    watch('src/js/*.js', jsmin);
    // watch('src/images/*.{jpg,png}', optimizeimg);
    watch('src/images/*.{jpg,png}', webpImage);
}

//default gulp

exports.default = series(
    compiledcss,
jsmin,
// optimizeimg,
webpImage,
watchTask
);