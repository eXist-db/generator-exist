exports.metaTest = function () {
  const assert = require('yeoman-assert')

  it('unit-tests', function (done) {
    assert.file(['test/mocha/app.js', 'test/mocha/xqSuite.js'])
    done()
  })

  it('integration-tests', function (done) {
    assert.file(['cypress.json', 'test/cypress/integration/dashboard_spec.js', 'reports/videos/.gitkeep'])
    done()
  })
}
