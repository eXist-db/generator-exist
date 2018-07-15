'use strict'

const chai = require('chai')
const chaiXml = require('chai-xml')
const expect = require('chai').expect
const fs = require('fs-extra')
const glob = require('glob')
const xmldoc = require('xmldoc')
const assert = require('yeoman-assert')


describe('consistency checks', function () {
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

  describe.skip('meta-data consistency', function (){
    it('app description', function () {
      let described = ['package.json', 'expath-pkg.xml', 'build.xml', 'README.MD', 'repo.xml']
      // var desc = <%- desc %>
      var desc = 'My amazing pkgJson application'
      var i = 0

      while(described[i]) {
        assert.fileContent(described[i], desc)
        i++
      }
    })

    it('app version', function () {
      let versioned = ['package.json', 'expath-pkg.xml', 'README.md']
      // var ver = <%- version %>
      var ver = '1.0.0'
      var i = 0

      while(versioned[i]) {
        assert.fileContent(versioned[i], ver)
        i++
      }
    })

    it('app title', function () {
      let titled = ['package.json', 'expath-pkg.xml', 'build.xml', 'templates/page.html', 'README.MD']
      // var ver = <%- title %>
      var title = 'pkgJson'
      var i = 0

      while(titled[i]) {
        assert.fileContent(titled[i], title)
        i++
      }
    })
  })

  describe('meta-data consistency', function () {
    // mandatory
    let exPkg = fs.readFileSync('expath-pkg.xml', 'utf8')
    var parsed = new xmldoc.XmlDocument(exPkg)
    var exPkgDesc = parsed.childNamed('title').val
    var exPkgVer = parsed.attr.version

    let repo = fs.readFileSync('repo.xml', 'utf8')
    var parsed = new xmldoc.XmlDocument(repo)
    var repoDesc = parsed.childNamed('description').val

    let pkg = fs.readFileSync('package.json', 'utf8')
    var parsed = JSON.parse(pkg)
    var pkgTitle = parsed.name.toLowerCase()
    var pkgDesc = parsed.description
    var pkgVer = parsed.version

    if (fs.existsSync('templates/page.html')) {
      let page = fs.readFileSync('templates/page.html', 'utf8')
      var parsed = new xmldoc.XmlDocument(page)
      var pageTitle = parsed.descendantWithPath('head.title').val.toLowerCase()
    }

    if (fs.existsSync('build.xml')) {
      let build = fs.readFileSync('build.xml', 'utf8')
      var parsed = new xmldoc.XmlDocument(build)
      var buildTit = parsed.attr.name.toLowerCase()
      var buildDesc = parsed.childNamed('description').val
    }

    it('titles are consistent (ignoring case)', function () {
      expect(pkgTitle).to.be.equal(pageTitle).to.be.equal(buildTit)
    })

    it ('version string is consistent', function (){
      expect(pkgVer).to.be.equal(exPkgVer)
    })

    it ('description is consistent', function () {
      expect(pkgDesc).to.be.equal(repoDesc).to.be.equal(exPkgDesc).to.be.equal(buildDesc)
    })
      it ('readme contains description and version strings', function () {
        assert.fileContent('README.md', pkgVer)
        assert.fileContent('README.md', pkgDesc)
        // assert.fileContent('README.md', pkgTitle)
      })
  })
  // TODO make sure that controller and main page in packge.json match (and are there)

})
