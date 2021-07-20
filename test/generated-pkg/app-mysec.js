'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide style …', function () {
  before(async function () {
    this.timeout(10000)
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['exist-design', 'application'],
        mysec: true,
        pre: true,
        post: false,
        license: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT'],
        github: false,
        setperm: false,
        atom: false
      })
    assert.noFile('readme.md')
  })

  describe('secure exist design has …', function () {
    it('default files and restricted area', function (done) {
      assert.file(['admin/controller.xq', 'admin/index.html', 'templates/login-panel.html', 'pre-install.xq', 'test/cypress/integration/login-ok_spec.js'])
      done()
    })

    it('login section on index.html', function (done) {
      assert.fileContent('templates/page.html', 'org.exist-db.mysec.user')
      done()
    })

    it('expanded title in repo.xml', function (done) {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
      done()
    })
  })

  describe('markup files are well-formed', function () {
    return require('../util/app').checkWellFormed()
  })

  // !! this should stay in yo's generator test only !!
  // Different editors use different settings
  describe('xml looks good', function () {
    return require('../util/gulp-ews').prettyDataEWS()
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
