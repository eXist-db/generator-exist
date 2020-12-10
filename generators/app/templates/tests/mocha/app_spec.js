'use strict'

const chai = require('chai')
const chaiXml = require('chai-xml')
const expect = require('chai').expect
const fs = require('fs-extra')
const glob = require('glob')
const xmldoc = require('xmldoc')
const assert = require('yeoman-assert')

// this is not equivalent to using a real xml parser
describe('file system checks', function () {
  describe('markup files are well-formed', function () {
    chai.use(chaiXml)
    it('*.html is xhtml', function (done) {
      glob('**/*.html', { ignore: 'node_modules/**' }, function (err, files) {
        if (err) throw err
        // console.log(files)
        files.forEach(function (html) {
          const xhtml = fs.readFileSync(html, 'utf8')
          let hParsed = new xmldoc.XmlDocument(xhtml).toString()
          expect(hParsed).xml.to.be.valid()
        })
      })
      done()
    })

    it('*.xml', function (done) {
      glob('**/*.xml', { ignore: 'node_modules/**' }, function (err, files) {
        if (err) throw err
        // console.log(files)
        files.forEach(function (xmls) {
          const xml = fs.readFileSync(xmls, 'utf8')
          let xParsed = new xmldoc.XmlDocument(xml).toString()
          expect(xParsed).xml.to.be.valid()
        })
      })
      done()
    })

    it('*.xconf', function (done) {
      glob('**/*.xconf', { ignore: 'node_modules/**' }, function (err, files) {
        if (err) throw err
        // console.log(files)
        files.forEach(function (xconfs) {
          const xconf = fs.readFileSync(xconfs, 'utf8')
          let cParsed = new xmldoc.XmlDocument(xconf).toString()
          expect(cParsed).xml.to.be.valid()
        })
      })
      done()
    })
    it('*.odd', function (done) {
      this.slow(1000)
      glob('**/*.odd', { ignore: 'node_modules/**' }, function (err, files) {
        if (err) throw err
        // console.log(files)
        files.forEach(function (odds) {
          const odd = fs.readFileSync(odds, 'utf8')
          let xParsed = new xmldoc.XmlDocument(odd).toString()
          expect(xParsed).xml.to.be.valid()
        })
      })
      done()
    })
  })

  describe('Consistent data in aux files', function () {
    it('should contain identical descriptions', function (done) {
      if (fs.existsSync('build.xml')) {
        const build = fs.readFileSync('build.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(build)
        let buildDesc = parsed.childNamed('description').val
      }

      if (fs.existsSync('package.json')) {
        const pkg = fs.readFileSync('package.json', 'utf8')
        const parsed = JSON.parse(pkg)
        let pkgDesc = parsed.description
      }

      if (fs.existsSync('repo.xml')) {
        const repo = fs.readFileSync('repo.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(repo)
        let repoDesc = parsed.childNamed('description').val
      }

      if (fs.existsSync('expath-pkg.xml')) {
        const exPkg = fs.readFileSync('expath-pkg.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(exPkg)
        let exPkgDesc = parsed.childNamed('title').val
      }

      let desc = [exPkgDesc, buildDesc, pkgDesc, repoDesc, buildDesc].filter(Boolean)
      let i = 0
      // console.log(desc)
      desc.forEach(function () {
        expect(desc[i]).to.equal(exPkgDesc)
        i++
      })
      done()
    })

    it('should contain identical versions', function (done) {
      if (fs.existsSync('package.json')) {
        const pkg = fs.readFileSync('package.json', 'utf8')
        const parsed = JSON.parse(pkg)
        let pkgVer = parsed.version
      }

      if (fs.existsSync('expath-pkg.xml')) {
        const exPkg = fs.readFileSync('expath-pkg.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(exPkg)
        let exPkgVer = parsed.attr.version
      }

      let vers = [exPkgVer, pkgVer].filter(Boolean)
      let i = 0
      // console.log(vers)
      vers.forEach(function () {
        expect(vers[i]).to.equal(exPkgVer)
        i++
      })
      done()
    })

    it('should contain identical licenses', function (done) {
      if (fs.existsSync('package.json')) {
        const pkg = fs.readFileSync('package.json', 'utf8')
        const parsed = JSON.parse(pkg)
        let pkgLic = parsed.license
      }

      if (fs.existsSync('repo.xml')) {
        const exRepo = fs.readFileSync('repo.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(exRepo)
        let repoLic = parsed.childNamed('license').val
      }
  
      let lic = [repoLic, pkgLic].filter(Boolean)
      let i = 0
      // console.log(lic)
      lic.forEach(function () {
        expect(lic[i]).to.equal(pkgLic)
        i++
      })
      done()
    })

    it('should contain identical titles', function (done) {
      if (fs.existsSync('build.xml')) {
        const build = fs.readFileSync('build.xml', 'utf8')
        const parsed = new xmldoc.XmlDocument(build)
        let buildTit = parsed.attr.name.toLowerCase()
      }

      if (fs.existsSync('package.json')) {
        const pkg = fs.readFileSync('package.json', 'utf8')
        const parsed = JSON.parse(pkg)
        let pkgTitle = parsed.name
      }

      if (fs.existsSync('templates/page.html')) {
        const page = fs.readFileSync('templates/page.html', 'utf8')
        const parsed = new xmldoc.XmlDocument(page)
        let pageTitle = parsed.descendantWithPath('head.title').val
      }

      let titles = [buildTit, pkgTitle, pageTitle].filter(Boolean)
      let i = 0

      // console.log(titles)
      titles.forEach(function () {
        expect(titles[i]).to.equal(pkgTitle)
        i++
      })
      done()
    })

    it('Readme should have latest meta-data', function (done) {
      const pkg = fs.readFileSync('package.json', 'utf8')
      const parsed = JSON.parse(pkg)

      if (fs.existsSync('README.md')) {
        assert.fileContent('README.md', '# ' + parsed.name)
        assert.fileContent('README.md', parsed.version)
        assert.fileContent('README.md', parsed.description)
      } else { this.skip() }
      done()
    })
  })
})
