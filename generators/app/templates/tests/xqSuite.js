'use strict'
const supertest = require('supertest')
const xmldoc = require('xmldoc')
const expect = require('chai').expect

// The client listening to the mock rest server
var client = supertest.agent('http://localhost:8080')

describe('checking xqSuite test results via rest', function () {

  describe('connection tests', function () {
    it('should return 404 from random page', function (done) {
      this.timeout(10000)
      client
        .get('/random')
        .expect(404)
        .end(function (err, res) {
          expect(res.status).to.equal(404)
          if (err) console.log(err)
          done()
        })
    })

    it('should return 200 at destination exist', function (done) {
      client
        .get('/exist/rest/db/')
        .expect(200)
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          if (err) console.log(err)
          done()
        })
    })
  })

  // add authentication
  describe('check xqSuite test-report', function () {
    let runner = '/exist/rest/db/<%- defcoll %>/<%- short %>/modules/test-runner.xq'

    it('check xQuery output', function (done) {
      client
        .get(runner)
        .set('Accept', 'application/xml')
        .expect('content-type', 'application/xml; charset=utf-8')
        // TODO this should be checking the report
        .end(function (res) {
          var doc = new xmldoc.XmlDocument(res).toString()
          expect(doc).xml.to.be.valid()
          done()
        })
    })

    it('should have 0 failures', function (done) {
      client
        .get(runner)
        .set('Accept', 'application/xml')
        .end(function(res) {
        var doc = new xmldoc.XmlDocument(res)
        expect(doc.childNamed('testsuite').attr.failures).to.equal('0')
        })
    })

    it('should have 0 errors', function (done) {
      client
        .get(runner)
        .set('Accept', 'application/xml')
        .end(function(res) {
        var doc = new xmldoc.XmlDocument(res)
        expect(doc.childNamed('testsuite').attr.errors).to.equal('0')
        })
    })
  })
})
