exports.checkWellFormed = function () {
  const chai = require('chai')
  const chaiXml = require('chai-xml')
  const expect = require('chai').expect
  const fs = require('fs-extra')
  const glob = require('glob')
  const xmldoc = require('xmldoc')

  describe('existing markup files are well-formed', function () {
    chai.use(chaiXml)
    it('*.html is xhtml', function () {
      glob('**/*.html', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
        files.forEach(function (html) {
          let xhtml = fs.readFileSync(html, 'utf8')
          var hParsed = new xmldoc.XmlDocument(xhtml).toString()
          expect(hParsed).xml.to.be.valid()
        })
      })
    })

    it('*.xml', function () {
      glob('**/*.xml', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
        files.forEach(function (xmls) {
          let xml = fs.readFileSync(xmls, 'utf8')
          var xParsed = new xmldoc.XmlDocument(xml).toString()
          expect(xParsed).xml.to.be.valid()
        })
      })
    })

    it('*.xconf', function () {
      glob('**/*.xconf', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
        files.forEach(function (xconfs) {
          let xconf = fs.readFileSync(xconfs, 'utf8')
          var cParsed = new xmldoc.XmlDocument(xconf).toString()
          expect(cParsed).xml.to.be.valid()
        })
      })
    })
    it('*.odd', function () {
      this.slow(1000)
      glob('**/*.odd', {ignore: 'node_modules/**'}, function (err, files) {
        if (err) throw err
        files.forEach(function (odds) {
          let odd = fs.readFileSync(odds, 'utf8')
          var xParsed = new xmldoc.XmlDocument(odd).toString()
          expect(xParsed).xml.to.be.valid()
        })
      })
    })
  })
}
