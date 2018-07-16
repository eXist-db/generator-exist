'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe.skip('polymer element', function () {
  before(function () {
    this.timeout(3000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['polymer', 'application']
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('polymer app has', function () {
    it('recommended files', function (done) {
      assert.file(['repo.xml', 'modules/app.xql'])
      done()
    })

    it('expanded names inside', function (done) {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
      done()
    })
  })

  describe('markup files are well-formed', function () {
    return require('../util/app').checkWellFormed()
  })

  describe('app meta-data', function () {
    return require('../util/consistency').isConsistent()
  })

  after('teardown', function (done) {
    fs.emptydirSync(process.cwd())
    done()
  })
})
