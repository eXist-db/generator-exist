'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var chai = require('chai')
var expect = require('chai').expect
var chaiXml = require('chai-xml')
var helpers = require('yeoman-test')
var fs = require('fs-extra')
var xmldoc = require('xmldoc')

describe('eXide style …', function () {
  before(function () {
    this.timeout(4000)
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: 'foo',
        author: 'tester',
        email: 'te@st.er'
      })
      .then(function () {
        return assert(true)
      })
  })

  describe('package has …', function () {
    it('recommended files', function () {
      assert.file(['repo.xml', 'modules/app.xql'])
    })

    it('with templates expanded', function () {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    })

    chai.use(chaiXml)
    it('well formed xml', function () {
      var XML = fs.readFile('repo.xml', 'utf8')
      var doc = new xmldoc.XmlDocument(XML).toString()
      expect(doc).xml.to.be.valid()
    })
  })

  after('teardown', function () {
    fs.emptydirSync(process.cwd())
  })
})
