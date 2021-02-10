'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('empty package', function () {
  this.timeout(15000)
  // TODO: #563 [gulp] line-o let's make this the test application for gulp hibryd build
  // We should also add a app-lib-gulp.js test package.
  before(async function () {
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'application'],
        pre: false,
        post: false,
        license: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT'],
        builder: 'hybrid',
        github: false,
        atom: false
      })
    assert.noFile(['modules/app.xql', 'templates/page.html', 'test/cypress/integration/login-ok_spec.js', 'index.html'])
  })

  describe('empty has', function () {
    it('recommended files', function (done) {
      assert.file(['repo.xml', 'test/mocha/app_spec.js', 'test/xqs/test-runner.xq', 'gulpfile.js', 'build.xml'])
      done()
    })

    it('selected license', function (done) {
      assert.fileContent('LICENSE', 'MIT License')
      done()
    })

    it('a repo.xml with expanded target URL', function (done) {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
      done()
    })

    it('no dependency on shared-resources', function (done) {
      assert.noFileContent('expath-pkg.xml', 'http://exist-db.org/apps/shared')
      done()
    })

    it('xqs does not import app module', function (done) {
      assert.noFileContent('test/xqs/test-runner.xq', 'import module namespace app')
      done()
    })
    
    it('build is enabled via npm script', function (done) {
      assert.fileContent('package.json', 'gulp build')
      done()
    })
  })

  describe('markup files are well-formed', function () {
    return require('../util/app').checkWellFormed()
  })

  describe('app meta-data', function () {
    return require('../util/consistency').isConsistent()
  })

  describe('test_suite has …', function () {
    return require('../util/meta-test').metaTest()
  })

  after('teardown', function (done) {
    fs.emptyDirSync(process.cwd())
    done()
  })
})
