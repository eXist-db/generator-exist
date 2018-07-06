'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe.skip('eXide plain app', function () {
  before(function () {
    this.timeout(3000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['plain', 'application'],
        pre: true,
        post: true,
        setperm: false,
        github: false
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('plain app has', function () {
    it('recommended files', function () {
      assert.file(['repo.xml', 'modules/app.xql'])
    })

    it('with proper names inside', function () {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
