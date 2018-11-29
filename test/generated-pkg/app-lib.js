'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('library package', function () {
  this.timeout(10000)
  before(function () {
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'library'],
        pre: false,
        post: false,
        license: 'LGPL-3.0',
        github: true,
        atom: false
      })
      .then(function (done) {
        return assert.noFile(['modules/app.xql', 'templates/page.html', 'reports/screenshots/.gitkeep', 'controller.xql'])
        done()
      })
  })

  describe('library has', function () {
    it('only recommended files', function (done) {
      assert.file(['repo.xml', 'content/.gitkeep', 'README.md', '.git/config', '.gitignore'])
      done()
    })

    it('selected license', function (done) {
      assert.fileContent('LICENSE', 'GNU LESSER GENERAL PUBLIC LICENSE')
      done()
    })

    it('expanded target URL in repo.xml', function (done) {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
      done()
    })

    it('no dependency on shared-resources', function(done){
      assert.noFileContent('expath-pkg.xml', 'http://exist-db.org/apps/shared')
      done()
    })

    it('pkgJson with repo info', function (done) {
      assert.fileContent('package.json', 'git')
      done()
    })

    it('pkgJson without cypress script', function (done) {
      assert.noFileContent('package.json', 'cypress')
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
    fs.emptyDirSync(process.cwd())
    done()
  })
})
