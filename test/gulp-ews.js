'use strict'
const fs = require('fs-extra')
const spawn = require('child_process').spawn
const assert = require('yeoman-assert')

// early warning test for abandoned gulp-pretty-data plugin

// TODO remove not working as expected

let xml = './spec/dist/tmp.xml'
let xco = './spec/dist/tmp.xconf'

describe.only('pretty data early warning', function() {
  before(function(done) {
    fs.ensureDir('./spec/dist')
    done()
  })

  describe('#run gulp tasks', function(done) {
    // change cwd
    // process.chdir('./spec')

    // set gulptasks
    const tasks = ['minify', 'prettify']

    spawn('gulp', tasks, {
      cwd: './spec'
    }, function(err, stdout) {
      console.log(err)
      done()
    })
  })

  describe('it should prettify …', function() {
    it('regular xml', function(done) {
      var data = fs.readFileSync(xml)
      var res = data.toString().split('\n').length
      assert.equal(res - 1, 20)
      done()
    })
    it('custom extension', function(done) {
      var data = fs.readFileSync(xco)
      var res = data.toString().split('\n').length
      assert.equal(res - 1, 20)
      done()
    })
  })

  after('teardown', function(done) {
    fs.emptyDirSync('./spec/dist')
    done()
  })
})
