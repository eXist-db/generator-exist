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

// add templating for app name
  describe('check xqSuite test-report', function () {
    it('check xQuery output', function (done) {
      client
        .get('/exist/rest/db/my-app/modules/test-runner.xq')
        .set('Accept', 'application/xml')
        .expect('content-type', 'application/xml; charset=utf-8')
        // TODO this should be checking the report
        .end(function (err, res) {
          expect(res.text).to.equal(results)
          if (err) console.log(err)
          done()
        })
    })

    describe('xqSuite report', function () {
      var doc = new xmldoc.XmlDocument(results)
      it('should have 0 failures', function (done) {
        expect(doc.childNamed('testsuite').attr.failures).to.equal('0')
        done()
      })
      it('should have 0 errors', function (done) {
        expect(doc.childNamed('testsuite').attr.errors).to.equal('0')
        done()
      })
    })
  })
})
