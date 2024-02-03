// import { task, src, dest } from 'gulp'
const { task, src, dest } = require("gulp")
const sass = require("gulp-sass")
const cssnano = require("gulp-cssnano")
const { menifest } = require("gulp-rev")
const rev = require("gulp-rev")


// import sass from 'gulp-sass'
// import cssnano from 'gulp-cssnano'
// import rev, { manifest } from 'gulp-rev'

task('css', () => {
    console.log('minifying css...');
    // src('./static/scss/**/*.scss')
    //     .pipe(sass())
    //     .pipe(cssnano())
    //     .pipe(dest('./static/css'))

    // return src('./static/**/*.css')
    //     .pipe(rev())
    //     .pipe(dest('./public/assets'))
    //     .pipe(manifest({
    //         cwd: 'public',
    //         merge: true
    //     }))

    //    .pipe(dest('./public/assets'))


})