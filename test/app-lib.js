'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('library package', function () {
  this.timeout(4000)
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'library'],
        pre: false,
        post: false,
        license: 'MIT',
        github: true,
        atom: false
      })
      .then(function () {
        return assert.noFile(['modules/app.xql', 'templates/page.html'])
      })
  })

  describe('library has', function () {
    it('only recommended files', function () {
      assert.file(['repo.xml', 'content/.gitkeep', 'README.md', '.git/config'])
    })

    it('selected license', function () {
      assert.fileContent('LICENSE', 'MIT')
    })

    it('pkgJson has repo info', function () {
      assert.fileContent('package.json', 'git')
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
