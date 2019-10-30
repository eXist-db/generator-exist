'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('empty package', function () {
  this.timeout(10000)
  before(function () {
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['empty', 'application'],
        pre: false,
        post: false,
        license: 'MIT',
        github: false,
        atom: false
      })
      .then(function (done) {
        return assert.noFile(['modules/app.xql', 'templates/page.html'])
        done()
      })
  })

  describe('empty has', function () {
    it('recommended files', function (done) {
      assert.file(['repo.xml', 'test/mocha/app.js'])
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
