exports.metaTest = function () {
  const assert = require('yeoman-assert')

  it('unit-tests', function (done) {
    assert.file(['test/mocha/app_spec.js', 'test/xqs/xqSuite.js'])
    done()
  })

  it('integration-tests', function (done) {
    assert.file(['cypress.json', 'test/cypress/integration/landing_spec.js', 'reports/videos/.gitkeep'])
    done()
  })
}
