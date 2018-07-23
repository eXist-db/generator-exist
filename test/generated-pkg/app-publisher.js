'use strict'

const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('tei-publisher app', function () {
  before(function () {
    this.timeout(20000)
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['teipub', 'application'],
        odd: 'teipublisher',
        defview: 'div',
        index: 'div',
        pre: true,
        post: false,
        setperm: true,
        mode: 'rw-rwxrwx',
        owner: 'tei',
        userpw: 'simple',
        github: false,
        atom: false
      })
      .then(function (done) {
        return assert.noFile('app-template.iml')
        done()
      })
  })

  describe('publisher app has', function () {
    it('expected files', function (done) {
      assert.file(['search.html', 'modules/pm-config.xql', 'transform/teipublisher-epub-main.xql', 'resources/i18n/collection-en.xml'])
      done()
    })

    it('with app permissions', function (done) {
      assert.fileContent('repo.xml', /<permissions user="tei" password="simple" group="tei" mode="rw-rwxrwx"\/>/)
      done()
    })

    it('full-text configuration', function (done) {
      assert.fileContent('collection.xconf', 'tei:div')
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
