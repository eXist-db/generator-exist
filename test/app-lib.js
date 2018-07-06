'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe('library package', function () {
  before(function () {
    this.timeout(3000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'library'],
        pre: false,
        post: false,
        github: false
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('library has', function () {
    it('recommended files', function () {
      assert.file(['repo.xml', 'content/.gitkeep'])
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
