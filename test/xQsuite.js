'use strict'
const supertest = require('supertest')
const expect = require('chai').expect

// The client listening to the mock rest server
var client = supertest.agent('http://localhost:3000')

// mock test report

describe.only('mocking exist rest responses', function () {
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
          if (err) return done(err)
          done()
        })
    })

    it('should return 200 at destination exist', function (done) {
      client
        .get('/exist/rest/db/')
        .expect(200)
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          if (err) return done(err)
          done()
        })
    })
  })

  describe.skip('run mock XQsuite', function () {
    // to get application.xml from send needs more restify trickery
    it('should get XQsuite report', function (done) {
      client
        .get('/exist/rest/db/my-app/modules/test-runner.xq')
        .set('Accept', 'application/json')
        .expect('content-type', 'application/json;charset=utf-8')
        .end(function (err, res) {
          if (err) return done(err)
          // expect(res.body.failures, '0')
          // expect(res.body.errors, '0')
          console.log(res)
          done()
        })
    })
  })

  after('shutdown mock server', function () {
    return process.exit()
  })
})
