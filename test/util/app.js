exports.checkWellFormed = function () {
  const chai = require('chai')
  const chaiXml = require('chai-xml')
  const expect = require('chai').expect
  const fs = require('fs-extra')
  const glob = require('glob')
  const xmldoc = require('xmldoc')

  chai.use(chaiXml)
  it.skip('*.html is xhtml', function (done) {
    glob('**/*.html', { ignore: ['node_modules/**', 'bower_components/**'] }, function (err, files) {
      if (err) throw err
      // console.log(files)
      files.forEach(function (html) {
        const xhtml = fs.readFileSync(html, 'utf8')
        const hParsed = new xmldoc.XmlDocument(xhtml).toString()
        expect(hParsed).xml.to.be.valid()
      })
    })
    done()
  })

  it.skip('*.xml', function (done) {
    glob('**/*.xml', { ignore: ['node_modules/**', 'bower_components/**'] }, function (err, files) {
      if (err) throw err
      // console.log(files)
      files.forEach(function (xmls) {
        const xml = fs.readFileSync(xmls, 'utf8')
        const xParsed = new xmldoc.XmlDocument(xml).toString()
        expect(xParsed).xml.to.be.valid()
      })
    })
    done()
  })

  it.skip('*.xconf', function (done) {
    glob('**/*.xconf', { ignore: ['node_modules/**', 'bower_components/**'] }, function (err, files) {
      if (err) throw err
      // console.log(files)
      files.forEach(function (xconfs) {
        const xconf = fs.readFileSync(xconfs, 'utf8')
        const cParsed = new xmldoc.XmlDocument(xconf).toString()
        expect(cParsed).xml.to.be.valid()
      })
    })
    done()
  })
  it.skip('*.odd', function (done) {
    this.slow(1000)
    glob('**/*.odd', { ignore: ['node_modules/**', 'bower_components/**'] }, function (err, files) {
      if (err) throw err
      // console.log(files)
      files.forEach(function (odds) {
        const odd = fs.readFileSync(odds, 'utf8')
        const xParsed = new xmldoc.XmlDocument(odd).toString()
        expect(xParsed).xml.to.be.valid()
      })
    })
    done()
  })
}
