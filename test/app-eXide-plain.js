'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const chai = require('chai')
const expect = require('chai').expect
const chaiXml = require('chai-xml')
const helpers = require('yeoman-test')
const fs = require('fs-extra')
const xmldoc = require('xmldoc')

describe('eXide plain app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
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
      .then(function () {
        return assert.noFile(['resources/images/bold.gif', 'pre-install.xql'])
      })
  })

  describe('plain app has', function () {
    it('recommended files', function () {
      assert.file(['expath-pkg.xml', 'modules/config.xqm', 'modules/test-runner.xq', '.travis.yml'])
    })

    it('with proper server uri', function () {
      assert.fileContent('.existdb.json', 'http://localhost:8080/exist')
    })

    chai.use(chaiXml)
    it('well-formed expath-pkg', function () {
      let XML = fs.readFileSync('expath-pkg.xml', 'utf8')
      let doc = new xmldoc.XmlDocument(XML).toString()
      expect(doc).xml.to.be.valid()
    })

    it('xhtml not hmtl', function () {
      let html = fs.readFileSync('index.html', 'utf8')
      let page = new xmldoc.XmlDocument(html).toString()
      expect(page).xml.to.be.valid()
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
