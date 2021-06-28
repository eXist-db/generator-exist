exports.isConsistent = function () {
  const chai = require('chai')
  const chaiXml = require('chai-xml')
  const expect = require('chai').expect
  const fs = require('fs-extra')
  const xmldoc = require('xmldoc')
  const assert = require('yeoman-assert')

  chai.use(chaiXml)

  it('description is consistent', function (done) {
    if (fs.existsSync('build.xml')) {
      const build = fs.readFileSync('build.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(build)
      var buildDesc = parsed.childNamed('description').val
    }

    if (fs.existsSync('package.json')) {
      const pkg = fs.readFileSync('package.json', 'utf8')
      const parsed = JSON.parse(pkg)
      var pkgDesc = parsed.description
    }

    if (fs.existsSync('repo.xml')) {
      const repo = fs.readFileSync('repo.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(repo)
      var repoDesc = parsed.childNamed('description').val
    }

    if (fs.existsSync('expath-pkg.xml')) {
      const exPkg = fs.readFileSync('expath-pkg.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(exPkg)
      var exPkgDesc = parsed.childNamed('title').val
    }

    const desc = [exPkgDesc, buildDesc, pkgDesc, repoDesc, buildDesc].filter(Boolean)
    let i = 0
    // console.log(desc)
    desc.forEach(function () {
      expect(desc[i]).to.equal(exPkgDesc)
      i++
    })
    done()
  })

  it('version string is consistent', function (done) {
    if (fs.existsSync('package.json')) {
      const pkg = fs.readFileSync('package.json', 'utf8')
      const parsed = JSON.parse(pkg)
      var pkgVer = parsed.version
    }

    if (fs.existsSync('expath-pkg.xml')) {
      const exPkg = fs.readFileSync('expath-pkg.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(exPkg)
      var exPkgVer = parsed.attr.version
    }

    const vers = [exPkgVer, pkgVer].filter(Boolean)
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
      var pkgLic = parsed.license
    }

    if (fs.existsSync('repo.xml')) {
      const exRepo = fs.readFileSync('repo.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(exRepo)
      var repoLic = parsed.childNamed('license').val
    }

    const lic = [repoLic, pkgLic].filter(Boolean)
    let i = 0
    // console.log(lic)
    lic.forEach(function () {
      expect(lic[i]).to.equal(pkgLic)
      i++
    })
    done()
  })

  it('title is consistent', function (done) {
    if (fs.existsSync('build.xml')) {
      const build = fs.readFileSync('build.xml', 'utf8')
      const parsed = new xmldoc.XmlDocument(build)
      var buildTit = parsed.attr.name.toLowerCase()
    }

    if (fs.existsSync('package.json')) {
      const pkg = fs.readFileSync('package.json', 'utf8')
      const parsed = JSON.parse(pkg)
      var pkgTitle = parsed.name
    }

    if (fs.existsSync('templates/page.html')) {
      const page = fs.readFileSync('templates/page.html', 'utf8')
      const parsed = new xmldoc.XmlDocument(page)
      var pageTitle = parsed.descendantWithPath('head.title').val
    }

    const titles = [buildTit, pkgTitle, pageTitle].filter(Boolean)
    let i = 0

    // console.log(titles)
    titles.forEach(function () {
      expect(titles[i]).to.equal(pkgTitle)
      i++
    })
    done()
  })

  it('Readme is consistent with meta-data', function (done) {
    const pkg = fs.readFileSync('package.json', 'utf8')
    const parsed = JSON.parse(pkg)

    if (fs.existsSync('README.md')) {
      assert.fileContent('README.md', '# ' + parsed.name)
      assert.fileContent('README.md', parsed.version)
      assert.fileContent('README.md', parsed.description)
    } else {
      // skip checks for non existing files
      this.skip()
    }
    done()
  })
}
