'use strict'

const chai = require('chai')
const chaiXml = require('chai-xml')
const expect = require('chai').expect
const fs = require('fs-extra')
const glob = require('glob')
const xmldoc = require('xmldoc')

// TODO export these as named functions and reuse in each app generator

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
  it('odd (if present)', function () {
    this.slow(1000)
    let odd = glob('**/*.odd', {ignore: 'node_modules/**'}, function (err, files) {
      if (err) throw err
    })
    var i = 0

    while (odd[i]) {
      let teiOdd = fs.readFileSync(odd[i], 'utf8')
      var oddParsed = new xmldoc.XmlDocument(teiOdd).toString()
      expect(oddParsed).xml.to.be.valid()
    }
  })
})
