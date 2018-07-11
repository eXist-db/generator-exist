'use strict'
const supertest = require('supertest')
const xmldoc = require('xmldoc')
const expect = require('chai').expect

// The client listening to the mock rest server
var client = supertest.agent('http://localhost:3000')

// a mock test report
var results = "<testsuites><testsuite package='http://exist-db.org/apps/my-app/tests' tests='1' failures='0' errors='0' pending='0'><testcase name='templating-foo' class='tests:templating-foo'/></testsuite></testsuites>"

describe('mocking exist rest responses', function () {
  before(function (done) {
    require('../server').StartServer()
    done()
  })

  describe('connection tests', function () {
    it('should return 404 from random page', function (done) {
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

  describe('run mock XQsuite', function () {
    // to get application.xml from send needs more restify trickery
    it('should get XQsuite report', function (done) {
      client
        .get('/exist/rest/db/my-app/modules/test-runner.xq')
        .set('Accept', 'text/plain')
        .expect('content-type', 'text/plain; charset=utf-8')
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

  after('shutdown mock server', function () {
    return process.exit()
  })
})
