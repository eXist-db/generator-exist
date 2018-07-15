'use strict'

const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('tei-publisher app', function () {
  before(function () {
    this.timeout(8000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['teipub', 'application'],
        odd: 'teipublisher',
        pre: false,
        post: false,
        setperm: true,
        mode: 'rw-rwxrwx',
        owner: 'tei',
        userpw: 'simple',
        github: false,
        atom: false
      })
      .then(function () {
        return assert.noFile('app-template.iml')
      })
  })

  describe('publisher app has', function () {
    it('expected files', function () {
      assert.file(['search.html', 'modules/pm-config.xql', 'transform/teipublisher-epub-main.xql', 'resources/i18n/collection-en.xml'])
    })

    it('with app permissions', function () {
      assert.fileContent('repo.xml', /<permissions user="tei" password="simple" group="tei" mode="rw-rwxrwx"\/>/)
    })
  })

  describe('consistency checks', function () {
    require('./app').checkWellFormed()
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
