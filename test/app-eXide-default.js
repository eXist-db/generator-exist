'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide style …', function () {
  before(function () {
    this.timeout(6000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['exist-design', 'application'],
        pre: true,
        post: true,
        github: false,
        setperm: false,
        atom: false
      })
      .then(function () {
        return assert.noFile('readme.md')
      })
  })

  describe('exist design has …', function () {
    it('default files', function () {
      assert.file(['repo.xml', 'modules/app.xql', 'post-install.xql', 'pre-install.xql', 'modules/test-suite.xql'])
    })

    it('expanded title on index.html', function () {
      assert.fileContent('templates/page.html', 'foo')
    })

    it('expanded title in repo.xml', function () {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    })
  })

  describe('consistency checks', function () {
    require('./app').checkWellFormed()
  })

  // Checking Xquery files requires updates to xqlint
  // it('linted XQuery', function () {
  //   let xq = fs.readFileSync('modules/app.xql')
  //   let xql = new xmldoc.XmlDocument(xq).toString()
  //   expect(doc).xml.to.be.valid()
  // })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
