'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

describe('eXide plain app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er',
        apptype: ['plain', 'application'],
        pre: false,
        post: false,
        setperm: false,
        github: false,
        atom: true
      })
      .then(function () {
        return assert.noFile(['resources/images/bold.gif', 'pre-install.xql'])
      })
  })

  describe('plain package has', function () {
    it('recommended files', function () {
      assert.file(['expath-pkg.xml', 'modules/config.xqm', 'modules/test-runner.xq', '.travis.yml'])
    })

    it('user specified uri for atom', function () {
      assert.fileContent('.existdb.json', 'http://localhost:8080/exist')
    })

    it('expanded title on index.html', function () {
      assert.fileContent('templates/page.html', 'foo')
    })
  })
  describe('consistency checks', function () {
    require('../app').checkWellFormed()
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
