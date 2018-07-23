'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide plain app', function () {
  before(function () {
    this.timeout(10000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['plain', 'application'],
        pre: false,
        post: false,
        setperm: false,
        github: false,
        atom: true
      })
      .then(function (done) {
        return assert.noFile(['resources/images/bold.gif', 'pre-install.xql'])
        done()
      })
  })

  describe('plain package has', function () {
    it('recommended files', function (done) {
      assert.file(['expath-pkg.xml', 'modules/config.xqm', 'modules/test-runner.xq', '.travis.yml'])
      done()
    })

    it('user specified uri for atom', function (done) {
      assert.fileContent('.existdb.json', 'http://localhost:8080/exist')
      done()
    })

    it('expanded title on index.html', function (done) {
      assert.fileContent('templates/page.html', 'foo')
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
    fs.emptydirSync(process.cwd())
    done()
  })
})
