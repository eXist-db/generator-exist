exports.metaTest = function () {
  const assert = require('yeoman-assert')

  it('unit-tests', function (done) {
    assert.file(['test/mocha/app_spec.js', 'test/xqs/xqSuite.js'])
    done()
  })

  it('integration-tests', function (done) {
    assert.file(['cypress.config.js', 'test/cypress/e2e/landing.cy.js', 'reports/videos/.gitkeep'])
    done()
  })
}
