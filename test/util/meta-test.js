exports.metaTest = function () {

  const path = require('path')
  const assert = require('yeoman-assert')
  const helpers = require('yeoman-test')
  const fs = require('fs-extra')

  it('unit-tests', function(done) {
    assert.file(['tests/mocha/app.js', 'tests/mocha/xqSuite.js'])
    done()
  })

  it('integration-tests', function(done) {
    assert.file(['cypress.json', 'tests/cypress/integration/dashboard_spec.js', 'reports/videos/.gitkeep'])
    done()
  })

}
