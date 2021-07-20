'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('library package', function () {
  this.timeout(10000)
  before(async function () {
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'library'],
        pre: false,
        post: false,
        license: ['LGPL-3.0', 'LGPL%20v3', 'https://www.gnu.org/licenses/lgpl-3.0'],
        // TODO: #572
        github: true,
        atom: false,
        ci: 'travis'
      })
    assert.noFile(['modules/app.xqm', 'modules/test-suite.xqm', 'templates/page.html', 'reports/screenshots/.gitkeep', 'controller.xq', 'collection.xconf'])
  })

  describe('library has', function () {
    it('only recommended files', function (done) {
      assert.file(['repo.xml', 'README.md', '.git/config', '.gitignore', 'test/xqs/test-suite.xqm'])
      done()
    })

    it('no integration test on ci', function (done) {
      assert.noFileContent('.travis.yml', 'cypress')
      done()
    })

    it('selected license', function (done) {
      assert.fileContent('LICENSE', 'GNU LESSER GENERAL PUBLIC LICENSE')
      done()
    })

    it('no target URL in repo.xml', function (done) {
      assert.noFileContent('repo.xml', /<target>/)
      done()
    })

    it('no dependency on shared-resources', function (done) {
      assert.noFileContent('expath-pkg.xml', 'http://exist-db.org/apps/shared')
      done()
    })

    it('xqs does not call app module', function (done) {
      assert.noFileContent('test/xqs/test-suite.xqm', 'import module namespace app')
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
