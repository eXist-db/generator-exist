'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const chai = require('chai')
const expect = require('chai').expect
const chaiXml = require('chai-xml')
const helpers = require('yeoman-test')
const fs = require('fs-extra')
const glob = require('glob')
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

  describe('markup well-formedness', function () {
    chai.use(chaiXml)
    it('html is xhtml', function () {
      let html = glob('**/*.html', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
      })
      var i = 0

      while (html[i]) {
        let xhtml = fs.readFileSync(html[i], 'utf8')
        var hParsed = new xmldoc.XmlDocument(xhtml).toString()
        expect(hParsed).xml.to.be.valid()
        i++
      }
    })

    it('xml (and xconf)', function () {
      let xml = glob('**/*.xml', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
      })
      var i = 0

      while (xml[i]) {
        let ml = fs.readFileSync(xml[i], 'utf8')
        var xParsed = new xmldoc.XmlDocument(ml).toString()
        expect(xParsed).xml.to.be.valid()
        i++
      }

      if (fs.existsSync('collection.xconf')) {
        let xconf = fs.readFileSync('collection.xconf', 'utf8')
        var cParsed = new xmldoc.XmlDocument(xconf).toString()
        expect(cParsed).xml.to.be.valid()
      }
    })

    it('well-formed odd', function () {
      this.slow(1000)
      let XML = fs.readFileSync('resources/odd/tei_simplePrint.odd', 'utf8')
      let doc = new xmldoc.XmlDocument(XML).toString()
      expect(doc).xml.to.be.valid()
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
