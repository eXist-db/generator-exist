'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe('tei-publisher app', function () {
  before(function () {
    this.timeout(6000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['teipub', 'application'],
        odd: 'teipublisher',
        pre: true,
        post: true,
        setperm: true,
        github: false
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('publisher app has', function () {
    it('recommended files', function () {
      assert.file(['repo.xml', 'modules/app.xql', 'transform/teipublisher-epub-main.xql'])
    })

    it('with proper names inside', function () {
      assert.fileContent('repo.xml', /<permissions user="tei" password="simple" group="tei" mode="rw-rw-r--"\/>/)
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
