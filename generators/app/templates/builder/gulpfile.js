// TODO: line-o tell me what you want what you really really …
// see https://docs.google.com/document/d/1UdSWERC9rCSYIYjTGgCr3avce47h5OeLFR4tGKYXZlM/edit#heading=h.ei4sqy3ojpkl
// see https://github.com/eeditiones/roaster/blob/master/gulpfile.js
// see https://github.com/eXist-db/documentation/blob/master/Gulpfile.js
// see #563

/**
 * Settings
 * Turn on/off build features
 */

const settings = {
    clean: true,
    scripts: true,
    polyfills: false,
    styles: true,
    svgs: true,
    copy: true,
    vendor: true
  }

/**
 * Gulp Packages
 */

// General
const {
  gulp,
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp')
const { createClient } = require('@existdb/gulp-exist')
const del = require('del')
const flatmap = require('gulp-flatmap')
const header = require('gulp-header')
const lazypipe = require('lazypipe')
const muxml = require('gulp-muxml')
const zip = require("gulp-zip")
const rename = require('gulp-rename')
const replace = require('@existdb/gulp-replace-tmpl') // Do we need this still when starting from here ?


// Scripts
const standard = require('gulp-standard')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const optimizejs = require('gulp-optimize-js')

// Styles
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')

// SVGs
const svgmin = require('gulp-svgmin')  

const paths = {
  input: 'src/',
  output: 'dist/xar/'
}

// read metadata from local files
const { version, license } = require('./package.json')
const { package, servers } = require('./.existdb.json')

// .tmpl replacements to include 
// first value wins
const replacements = [package, {version, license}] // s.a. 

// Connection Info
const serverInfo = servers.localhost
const { port, hostname } = new URL(serverInfo.server)
const connectionOptions = {
    basic_auth: {
        user: serverInfo.user, 
        pass: serverInfo.password
    },
    host: hostname,
    port
}

// construct the current xar name from available data
const packageName = () => `${package.target}-${version}.xar`
// TODO: check if this is really what we want, modifications in these need to trigger sync
const static = 'src/**/*.{xml,html,xq,xquery,xql,xqm,xsl,xconf}'



/**
 * Use the `delete` module directly, instead of using gulp-rimraf
 */
function clean (cb) {
  del(['dist'], cb);
}
exports.clean = clean

/**
* replace placeholders 
* in src/repo.xml.tmpl and 
* output to build/repo.xml
*/
function templates () {
return src('src/*.tmpl')
  .pipe(replace(replacements, {debug:true}))
  .pipe(rename(path => { path.extname = "" }))
  .pipe(dest('dist/xar/'))
}
exports.templates = templates

function watchTemplates () {
  watch('src/*.tmpl', series(templates))
}
exports["watch:tmpl"] = watchTemplates

/**
 * compile SCSS styles and put them into 'build/app/css'
 */
function styles () {
  return src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/xar/resources/styles'));
}
exports.styles = styles

function watchStyles () {
  watch('src/scss/**/*.scss', series(styles))
}
exports["watch:styles"] = watchStyles

/**
* minify EcmaSript files and put them into 'build/app/js'
*/
function minifyEs () {
  return src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(dest('dist/xar/resources/scripts'))
}
exports.minify = minifyEs

function watchEs () {
  watch('src/js/**/*.js', series(minifyEs))
}
exports["watch:es"] = watchEs

/**
 * compile SCSS styles and put them into 'build/app/css'
 */
function styles () {
  return src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/xar/resources/styles'));
}
exports.styles = styles

function watchStyles () {
  watch('src/scss/**/*.scss', series(styles))
}
exports["watch:styles"] = watchStyles

/**
* minify EcmaSript files and put them into 'build/app/js'
*/
function minifyEs () {
  return src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(dest('dist/xar/resources/styles'))
}
exports.minify = minifyEs

function watchEs () {
  watch('src/js/**/*.js', series(minifyEs))
}
exports["watch:es"] = watchEs

/**
* copy html templates, XSL stylesheet, XMLs and XQueries to 'build'
*/
function copyStatic () {
  return src(static).pipe(dest('dist/xar/'))
}
exports.copy = copyStatic

function watchStatic () {
  watch(static, series(copyStatic));
}
exports["watch:static"] = watchStatic

/**
 * Upload all files in the build folder to existdb.
 * This function will only upload what was changed 
 * since the last run (see gulp documentation for lastRun).
 */
function deploy () {
  return src('build/**/*', {
          base: 'dist/xar',
          since: lastRun(deploy) 
      })
      .pipe(existClient.dest({target}))
}

function watchBuild () {
  watch('dist/xar/**/*', series(deploy))
}

/**
 * create XAR package in repo root
 */
function xar () {
  return src('dist/xar/**/*', {base: 'dist'})
      .pipe(zip(packageName()))
      .pipe(dest('.'))
}

/**
* upload and install the latest built XAR
*/
function installXar () {
  return src(packageName())
      .pipe(existClient.install({ packageUri }))
}

// composed tasks
const build = series(
  clean,
  styles,
  minifyEs,
  templates,
  copyStatic
)
const watchAll = parallel(
  watchStyles,
  watchEs,
  watchStatic,
  watchTemplates,
  watchBuild
)

exports.build = build
exports.watch = watchAll

exports.deploy = series(build, deploy)
exports.xar = series(build, xar)
exports.install = series(build, xar, installXar)

// main task for day to day development
exports.default = series(build, deploy, watchAll)


// Todo: conditional library package tasks go here

// 