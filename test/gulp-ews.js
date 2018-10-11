'use strict'
const gulp = require('gulp')
const prettyData = require('gulp-pretty-data')
const fs = require('fs-extra')
// const exec = require('child_process')

// early warning test for abandoned gulp-pretty-data plugin

// TODO create tmp gulpfile.js to execute
// TODO remove not working as expected

var xml = '<?xml version="1.0" encoding="UTF-8" ?>      <!DOCTYPE foo SYSTEM "Foo.dtd"><a>          <b>bbb</b>   <!-- comment --><c/><d><soapenv:Envelope xmlns:soapenv="http://xxx" xmlns:xsd="http://yyy" xmlns:xsi="http://zzz"></soapenv>       </d><e>        <![CDATA[ <z></z> ]]></e><f><g></g></f></a>'

let file1 = './test/tmp/src/tmp.xml'
let file2 = './test/tmp/src/tmp.xconf'

describe.only('set-up test files', function () {
  before(function (done) {
    fs.outputFile(file1, xml)
    fs.outputFile(file2, xml)
    fs.ensureDir('./test/tmp/dist')
    done()
  })

  describe('#run gulp', function () {
    gulp.task('minify', function () {
      gulp.src('./test/tmp/src/**.{xml,xconf}')
        .pipe(prettyData({
          type: 'minify',
          preserveComments: true,
          extensions: {
            'xconf': 'xml'
          }
        }))
        .pipe(gulp.dest('./test/tmp/dist'))
    })

    gulp.task('prettify', function () {
      gulp.src('./test/tmp/src/**.{xml,xconf}')
        .pipe(prettyData({
          type: 'prettify',
          extensions: {
            'xconf': 'xml'
          }
        }))
        .pipe(gulp.dest('./test/tmp/dist'))
    })

    // exec(gulp.series('minify', 'prettify'))
  })

  describe('it should prettify …', function () {
    it('regular xml', function (done) {
      var data = fs.readFileSync(file1)
      var res = data.toString().split('\n').length
      console.log(res)
      done()
    })
    it('special xconf', function (done) {
      var data = fs.readFileSync(file2)
      var res = data.toString().split('\n').length
      console.log(res)
      done()
    })
  })
})

after('teardown', function (done) {
  fs.remove('./test/tmp')
  done()
})
