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
        polytempl: 'polymer-2-application:app',
        name: 'foo-element',
        pre: false,
        post: false,
        license: 'MIT',
        github: true,
        atom: false
      })
      .then(function (done) {
        return assert.noFile(['templates/page.html', 'error-page.html', 'test/index.html'])
        done()
      })
  })

  describe('polymer element has', function () {
    it('polymer cli derived files', function (done) {
      assert.file(['bower.json', 'README.md', 'index.html', 'polymer.json', 'test/foo-element/foo-element_test.html',  '.gitignore', 'src/foo-element/foo-element.html', 'manifest.json'])
      done()
    })

    it('expanded paths in gulpfile', function (done) {
      assert.fileContent('gulpfile.js', 'db/apps/foo')
      done()
    })

    it('polymer style index page', function (done) {
      assert.fileContent('index.html', /<meta/)
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
