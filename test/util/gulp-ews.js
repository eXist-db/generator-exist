exports.prettyDataEWS = function () {
  const fs = require('fs-extra')
  const assert = require('yeoman-assert')

  // early warning test for abandoned gulp-pretty-data plugin

  it('regular xml', function (done) {
    const build = fs.readFileSync('build.xml', 'utf8')
    const res = build.toString().split('\n').length
    // -1 removes the eof line
    assert.strictEqual(res - 1, 28)
    done()
  })

  it('custom extension', function (done) {
    const xconf = fs.readFileSync('collection.xconf', 'utf8')
    const res = xconf.toString().split('\n').length
    assert.strictEqual(res - 1, 11)
    done()
  })
}
