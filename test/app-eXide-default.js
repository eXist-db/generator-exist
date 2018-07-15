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
