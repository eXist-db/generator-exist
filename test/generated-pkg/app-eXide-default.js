'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide style …', function () {
  before(function () {
    this.timeout(10000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['exist-design', 'application'],
        pre: true,
        post: true,
        license: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT'],
        github: false,
        setperm: false,
        docker: false,
        atom: false
      })
      .then(function (done) {
        return assert.noFile('readme.md', 'Dockerfile')
      })
  })

  describe('exist design has …', function () {
    it('default files', function (done) {
      assert.file(['repo.xml', 'modules/app.xql', 'post-install.xql', 'pre-install.xql', 'test/xqs/test-suite.xql'])
      done()
    })

    it('expanded title on index.html', function (done) {
      assert.fileContent('templates/page.html', 'foo')
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
