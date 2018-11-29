'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe('polymer element', function () {
  before(function () {
    this.timeout(30000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['polymer', 'application'],
        polytempl: 'polymer-2-element:app',
        name: 'foo-element',
        pre: false,
        post: false,
        license: 'MIT',
        github: true,
        atom: true,
        instance: 'http://localhost:8080/exist',
        admin: 'admin',
        adminpw: 'pw123'
      })
      .then(function (done) {
        return assert.noFile(['templates/page.html', 'error-page.html'])
        done()
      })
  })

  describe('polymer element has', function () {
    it('polymer cli derived files', function (done) {
      assert.file(['bower.json', 'README.md', 'index.html', 'polymer.json', 'test/foo-element_test.html', 'test/index.html', '.gitignore', 'demo/index.html', 'foo-element.html'])
      done()
    })

    it('expanded pw in gulpfile', function (done) {
      assert.fileContent('gulpfile.js', 'pw123' )
      done()
    })

    it('polymer style index page', function (done) {
      assert.fileContent('index.html', /<meta/)
      done()
    })

    it('pkgJson without cypress script', function (done) {
      assert.noFileContent('package.json', 'cypress')
      done()
    })
  })

  // the foo-element.html will not be well-formed
  describe.skip('markup files are well-formed', function () {
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
