'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide plain app', function () {
  before(async function () {
    this.timeout(10000)
    await helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['plain', 'application'],
        pre: false,
        post: false,
        license: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT'],
        setperm: false,
        github: false,
        docker: true,
        dockertag: '5.0.0',
        atom: true
      })
    assert.noFile(['resources/images/bold.gif', 'pre-install.xql', 'test/cypress/integration/secure_spec.js'])
  })

  describe('plain package has', function () {
    it('recommended files', function (done) {
      assert.file(['expath-pkg.xml', 'modules/config.xqm', 'test/xqs/test-runner.xq', '.travis.yml', 'controller.xql', 'Dockerfile'])
      done()
    })

    it('atom file with proper uri', function (done) {
      assert.fileContent('.existdb.json', 'http://localhost:8080/exist')
      done()
    })

    it('dockerfile with expanded package name', function (done) {
      assert.fileContent('Dockerfile', 'foo-1.0.0.xar')
      done()
    })

    it('integration tests for travis', function (done) {
      assert.fileContent('.travis.yml', 'cypress')
      done()
    })

    it('expanded title on index.html', function (done) {
      assert.fileContent('templates/page.html', 'foo')
      done()
    })
  })
  describe('markup files are well-formed', function () {
    return require('../util/app').checkWellFormed()
  })

  describe('app meta-data', function () {
    return require('../util/consistency').isConsistent()
  })

  describe('test_suite has …', function () {
    return require('../util/meta-test').metaTest()
  })

  after('teardown', function (done) {
    fs.emptyDirSync(process.cwd())
    done()
  })
})
