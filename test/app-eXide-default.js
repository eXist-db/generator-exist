'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const chai = require('chai')
const expect = require('chai').expect
const chaiXml = require('chai-xml')
const helpers = require('yeoman-test')
const fs = require('fs-extra')
const xmldoc = require('xmldoc')

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

  describe('package has …', function () {
    it('default files', function () {
      assert.file(['repo.xml', 'modules/app.xql', 'post-install.xql', 'pre-install.xql', 'modules/test-suite.xql'])
    })

    it('with templates expanded', function () {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    })

    chai.use(chaiXml)
    // const glob = require("glob")
    // let XML = glob.sync('**/*.xml')
    it('well-formed collection.xconf', function () {
      // needs to use sync see https://github.com/Leonidas-from-XIV/node-xml2js/pull/240 https://github.com/isaacs/sax-js/issues/138
      let XML = fs.readFileSync('collection.xconf', 'utf8')
      let doc = new xmldoc.XmlDocument(XML).toString()
      expect(doc).xml.to.be.valid()
    })

    it('xhtml not hmtl', function () {
      let html = fs.readFileSync('templates/page.html', 'utf8')
      let page = new xmldoc.XmlDocument(html).toString()
      expect(page).xml.to.be.valid()
    })
  })
  // This requires an update to xqlint
  // it('linted XQuery', function () {
  //   let xq = fs.readFileSync('modules/app.xql')
  //   let xql = new xmldoc.XmlDocument(xq).toString()
  //   expect(doc).xml.to.be.valid()
  // })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
