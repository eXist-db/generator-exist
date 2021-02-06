// TODO: line-o tell me what you want what you really really …
// see https://docs.google.com/document/d/1UdSWERC9rCSYIYjTGgCr3avce47h5OeLFR4tGKYXZlM/edit#heading=h.ei4sqy3ojpkl
// see https://github.com/eeditiones/roaster/blob/master/gulpfile.js
// see https://github.com/eXist-db/documentation/blob/master/Gulpfile.js
// see #563

/**
 * Settings
 * Turn on/off build features
 */

//  TODO: make these meaningful
const settings = {
  clean: true,
  scripts: true,
  polyfills: false,
  styles: true,
  svgs: true,
  copy: true,
  vendor: true
}

// TODO flexible hybrid vs pure gulp
// Gulp
const paths = {
  input: 'src/main/',
  output: 'dist/xar/',
  scripts: {
    input: 'src/main/js/*',
    // polyfills: '.polyfill.js',
    output: 'dist/xar/resources/scripts/'
  },
  styles: {
    input: 'src/main/styles/sass/*.{scss,sass}',
    output: 'dist/xar/resources/styles/'
  },
  svgs: {
    input: 'src/main/img/*.svg',
    output: 'dist/xar/resources/images/'
  },
}

// TODO: Hybrid (no src) stick with old layout
// Hybrid
// const paths = {
//   input: 'src/main/',
//   output: 'dist/xar/',
//   scripts: {
//     input: 'src/main/js/*',
//     // polyfills: '.polyfill.js',
//     output: 'dist/xar/resources/scripts/'
//   },
//   styles: {
//     input: 'src/main/styles/sass/*.{scss,sass}',
//     output: 'dist/xar/resources/styles/'
//   },
//   svgs: {
//     input: 'src/main/img/*.svg',
//     output: 'dist/xar/resources/images/'
//   },
// }

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
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

// Styles
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')

// SVGs
const svgmin = require('gulp-svgmin')

// read metadata from local files
const pkg = require('./package.json')
const { version, license } = pkg
const existJSON = require('./.existdb.json')
const replacements = [existJSON.package, { version, license }]

// .tmpl replacements to include 
// first value wins
const replacements = [pkg, { version, license }] // s.a. 

// Connection Info
const packageUri = existJSON.package.ns
const serverInfo = existJSON.servers.localhost
const target = serverInfo.root

const connectionOptions = {
    basic_auth: {
        user: serverInfo.user, 
        pass: serverInfo.password
    }
}
const existClient = createClient(connectionOptions);

// construct the current xar name from available data
const packageName = () => `${existJSON.package.target}-${pkg.version}.xar`
// TODO: check if this is really what we want, modifications in these need to trigger sync
//  - xml / xconf / odd should be prettied
//  - html should be...
//  - xq / xsl ... ?
const static = 'src/**/*.{xml,html,xq,xquery,xql,xqm,xsl,xconf}'



/**
 * Use the `delete` module directly, instead of using gulp-rimraf
 */
function clean(cb) {
  del([paths.output], cb);
}
exports.clean = clean

/**
* replace placeholders 
* in src/repo.xml.tmpl and 
* output to build/repo.xml
*/
function templates() {
  return src('src/*.tmpl')
    .pipe(replace(replacements, { debug: true }))
    .pipe(rename(path => { path.extname = "" }))
    .pipe(dest(paths.output))
}
exports.templates = templates

function watchTemplates() {
  watch('src/*.tmpl', series(templates))
}
exports["watch:tmpl"] = watchTemplates

/**
 * compile SCSS styles and put them into 'build/app/css'
 */
function styles() {
  return src(paths.styles.input)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 version', '> 0.25%'],
      cascade: true,
      remove: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.output));
}
exports.styles = styles

function watchStyles() {
  watch(paths.styles.input, series(styles))
}
exports["watch:styles"] = watchStyles

/**
* minify EcmaSript files and put them into 'build/app/js'
*/
function minifyEs() {
  return src(paths.scripts.input)
    .pipe(uglify())
    .pipe(dest(paths.scripts.output))
}
exports.minify = minifyEs

function watchEs() {
  watch(paths.scripts.input, series(minifyEs))
}
exports["watch:es"] = watchEs

/**
 * compile SCSS styles and put them into 'build/app/css'
 */
function styles() {
  return src(paths.styles.input)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.output));
}
exports.styles = styles

function watchStyles() {
  watch(paths.styles.input, series(styles))
}
exports["watch:styles"] = watchStyles

/**
* minify EcmaSript files and put them into 'build/app/js'
*/
function minifyEs() {
  return src(paths.scripts.input)
    .pipe(uglify())
    .pipe(dest(paths.styles.output))
}
exports.minify = minifyEs

function watchEs() {
  watch(paths.scripts.input, series(minifyEs))
}
exports["watch:es"] = watchEs

/**
* copy html templates, XSL stylesheet, XMLs and XQueries to 'build'
*/

// TODO add xml prettiprinting, css nano, etc from docs. probably split into multiple tasks
function copyStatic() {
  return src(static).pipe(dest(paths.output))
}
exports.copy = copyStatic

function watchStatic() {
  watch(static, series(copyStatic));
}
exports["watch:static"] = watchStatic

/**
 * Upload all files in the build folder to existdb.
 * This function will only upload what was changed 
 * since the last run (see gulp documentation for lastRun).
 */
function deploy() {
  return src(paths.output + '**/*', {
    base: paths.output,
    since: lastRun(deploy)
  })
    .pipe(existClient.dest({ target }))
}

function watchBuild() {
  watch(paths.output + '**/*', series(deploy))
}

/**
 * create XAR package in repo root
 */
function xar() {
  return src(paths.output + '**/*', { base: 'dist' })
    .pipe(zip(packageName()))
    .pipe(dest('.'))
}

/**
* upload and install the latest built XAR
*/
function installXar() {
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