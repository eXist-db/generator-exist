'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide style …', function () {
  before(async function () {
    this.timeout(20000)
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['exist-design', 'application'],
        pre: true,
        post: true,
        license: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT'],
        builder: 'ant',
        github: false,
        setperm: false,
        ci: 'travis',
        docker: false,
        atom: false
      })
    assert.noFile('readme.md', 'Dockerfile')
  })

  describe('exist design has …', function () {
    it('default files', function (done) {
      assert.file(['repo.xml', 'modules/app.xql', 'post-install.xql', 'pre-install.xql', 'test/xqs/test-suite.xql'])
      done()
    })

    it('type specific files', function (done) {
      assert.file(['resources/css/exist-2.2.css'])
      done()
    })

    it('expanded title on index.html', function (done) {
      assert.fileContent('templates/page.html', 'foo')
      done()
    })

    it('integration tests for travis', function (done) {
      assert.fileContent('.travis.yml', 'cypress')
      done()
    })

    it('expanded title in repo.xml', function (done) {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
      done()
    })

    it('does not call npm via ant', function (done) {
      assert.noFileContent('build.xml', 'npm')
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

  // Checking Xquery files requires updates to xqlint
  // it('linted XQuery', function () {
  //   let xq = fs.readFileSync('modules/app.xql')
  //   let xql = new xmldoc.XmlDocument(xq).toString()
  //   expect(doc).xml.to.be.valid()
  // })

  after('teardown', function (done) {
    fs.emptyDirSync(process.cwd())
    done()
  })
})
