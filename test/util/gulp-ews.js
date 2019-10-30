exports.prettyDataEWS = function () {
  const fs = require('fs-extra')
  const assert = require('yeoman-assert')

  // early warning test for abandoned gulp-pretty-data plugin

  it('regular xml', function (done) {
    var build = fs.readFileSync('build.xml', 'utf8')
    var res = build.toString().split('\n').length
    // -1 removes the eof line
    assert.equal(res - 1, 24)
    done()
  })

  it('custom extension', function (done) {
    const xconf = fs.readFileSync('collection.xconf', 'utf8')
    var res = xconf.toString().split('\n').length
    assert.equal(res - 1, 11)
    done()
  })
}
