'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe.skip('polymer element', function () {
  before(function () {
    this.timeout(3000)
    return helpers.run(path.join(__dirname, '../generators/app'))
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
    it('recommended files', function () {
      assert.file(['repo.xml', 'modules/app.xql'])
    })

    it('expanded names inside', function () {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    })
  })

  describe('consistency checks', function () {
    require('./app').checkWellFormed()
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
