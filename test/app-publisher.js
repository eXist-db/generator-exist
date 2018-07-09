'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const chai = require('chai')
const expect = require('chai').expect
const chaiXml = require('chai-xml')
const helpers = require('yeoman-test')
const fs = require('fs-extra')
const xmldoc = require('xmldoc')

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
        owner: 'tei',
        userpw: 'simple',
        github: false
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('publisher app has', function () {
    it('expected files', function () {
      assert.file(['search.html', 'modules/pm-config.xql', 'transform/teipublisher-epub-main.xql', 'resources/i18n/collection-en.xml'])
    })

    it('with app permissions', function () {
      assert.fileContent('repo.xml', /<permissions user="tei" password="simple" group="tei" mode="rw-rw-r--"\/>/)
    })

    chai.use(chaiXml)
    it('well-formed odd', function () {
      this.timeout(1000)
      let XML = fs.readFileSync('resources/odd/tei_simplePrint.odd', 'utf8')
      let doc = new xmldoc.XmlDocument(XML).toString()
      expect(doc).xml.to.be.valid()
    })

    it('xhtml not hmtl', function () {
      let html = fs.readFileSync('search.html', 'utf8')
      let page = new xmldoc.XmlDocument(html).toString()
      expect(page).xml.to.be.valid()
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
