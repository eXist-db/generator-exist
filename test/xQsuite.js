'use strict'
const supertest = require('supertest')
const expect = require('chai').expect

// The client listening to the mock rest server
var client = supertest.agent('http://localhost:3000')

// mock test report

describe('mocking xqSuite rest responses', function () {
  before(function (done) {
    require('../server').StartServer()
    done()
  })

  describe('mock-exist returns', function () {
    it('404 from random page', function (done) {
      client
        .get('/random')
        .expect(404)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.status).to.equal(404)
          done()
        })
    })

    it('200 from default rest endpoint', function (done) {
      client
        .get('/exist/rest/db/')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          done()
        })
    })

    it.skip('200 from startpage (index.html)', function (done) {
      client
        .get('/exist/rest/db/<%- defcoll %>/<%- short %>/index.html')
        .expect(200)
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          if (err) return done(err)
          done()
        })
    })
  })

  describe('running mock XQsuite test', function () {
    it('returns 0 errors or failures', function (done) {
      client
        .get('/exist/rest/db/my-app/modules/test-runner.xq')
        .set('Accept', 'application/json')
        .expect('content-type', 'application/json; charset=utf-8')
        .end(function (err, res) {
          try {
            console.group()
            console.group()
            console.group()
            console.group()
            console.info(res.body.testsuite.tests + ' xqsuite tests:')
          }
          catch (err) {
            done(err)
          }
          finally {
            console.group()
            res.body.testsuite.testcase.forEach(function(entry) {
                if (entry.failure) console.error([entry.name, entry.failure.message])
                else if (entry.error) console.error([entry.name, entry.error.message])
                else (console.log(entry.name))
            })
            console.groupEnd()
          }
          console.groupEnd()
          console.groupEnd()
          console.groupEnd()
          console.groupEnd()
          done()
        })
    })
  })
  // see http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
  after('shutdown mock server', function (done) {
    done()
  })
})
