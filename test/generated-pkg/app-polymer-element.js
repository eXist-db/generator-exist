'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var fs = require('fs-extra')

describe.only('polymer element', function () {
  before(function () {
    this.timeout(8000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['polymer', 'application'],
        polytempl: ['Polymer element', 'polymer-2-element:app'],
        name: 'foo-element',
        license: 'MIT',
        github: true,
        atom: false
      })
      .then(function (done) {
        return assert.noFile('templates/page.html')
        done()
      })
  })

  describe('polymer app has', function () {
    it('polymer cli derived files', function (done) {
      //'xxx-element.html' 'test/xxx-element_test.html'
      assert.file(['bower.json', 'README.md', 'index.html', 'polymer.json', 'demo/index.html', 'test/index.html', '.gitignore'])
      done()
    })

    // it('expanded names inside', function (done) {
    //   assert.fileContent('repo.xml', /<target>foo<\/target>/)
    //   done()
    // })
  })

  // describe('markup files are well-formed', function () {
  //   return require('../util/app').checkWellFormed()
  // })

  // describe('app meta-data', function () {
  //   return require('../util/consistency').isConsistent()
  // })

  after('teardown', function (done) {
    fs.emptydirSync(process.cwd())
    done()
  })
})
