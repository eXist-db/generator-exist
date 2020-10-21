'use strict'

const Mocha = require('mocha')
const expect = require('chai').expect

const monoCase = require('./fixtures/mono-case.json')
const multiCase = require('./fixtures/multi-case.json')
const multiSuite = require('./fixtures/multi-suite.json')

describe('mock xqs runs', function () {
  it('should pass the mono test', function (done) {
    /* eslint-disable-next-line */
    expect(xqsMock(monoCase)).to.not.throw
    done()
  })

  it('should fail the multi case', function (done) {
    /* eslint-disable-next-line */
    expect(xqsMock(multiCase)).to.throw
    done()
  })

  it('should pass the mutli suite', function (done) {
    /* eslint-disable-next-line */
    expect(xqsMock(multiSuite)).to.not.throw
    done()
  })
})

function xqsMock (mockRun) {
  // Dynamically generate a mocha testsuite for xqsuite tests. Requires its own process, hence && in package.json
  const Test = Mocha.Test

  const xqsReport = mockRun
  const xqsPkg = xqsReport.testsuite.package
  const xqstCount = xqsReport.testsuite.tests
  const xqstCase = xqsReport.testsuite.testcase

  // TODO: get rid of first "0 passing message"

  const mochaInstance = new Mocha()

  if (Array.isArray(xqsReport.testsuite)) {
    const xqsSuites = xqsReport.testsuite
    console.warn('support for multiple testsuites per run is experimental')
    xqsSuites.forEach((entry) => {
      xqsTests(mochaInstance, entry.package, entry.tests, entry.testcase)
    })
  } else {
    xqsTests(mochaInstance, xqsPkg, xqstCount, xqstCase)
  }
  // enable repeated runs
  // see https://github.com/mochajs/mocha/issues/995
  // see https://mochajs.org/api/mocha#unloadFiles
  const suiteRun = mochaInstance.cleanReferencesAfterRun(true).run()
  process.on('exit', () => {
    process.exit(suiteRun.stats.failures > 0)
  })

  // TODO: mark %pending xqstests as pending in mocha report
  function xqsTests (mochaInstance, xqsPkg, xqstCount, xqstCase) {
    const suiteInstance = Mocha.Suite.create(mochaInstance.suite, 'Xqsuite tests for ' + xqsPkg)

    if (xqstCase === undefined) {
      // if xqs contains 0 tests close open mocha instance
      mochaInstance.unloadFiles()
      suiteInstance.dispose()
      console.log('no test cases defined by suite ' + xqsPkg)
    } else if (Array.isArray(xqstCase)) {
      for (let i = 0; i < xqstCount; i++) {
        xqsResult(suiteInstance, xqstCase[i])
      }
    } else {
      xqsResult(suiteInstance, xqstCase)
    }
  }

  function xqsResult (suiteInstance, xqstCase) {
    suiteInstance.addTest(new Test('Test: ' + xqstCase.name, () => {
      switch (Object.prototype.hasOwnProperty.call(xqstCase, '')

      ) {
        // Red xqs test: filter to dynamically ouput messages only when record contains them
        case 'failure':
          expect(xqstCase, 'Function ' + xqstCase.class + ' ' + xqstCase.failure.message).to.not.have.own.property('failure')
          break
        case 'error':
          expect(xqstCase, 'Function ' + xqstCase.class + ' ' + xqstCase.error.message).to.not.have.own.property('error')
          break
          // TODO: Blue xqs tests: pending not yet implemented
        case 'pending':
          Test.isPending(true)
          break
          // Green xqs tests: pass passing tests
        default:
          /* eslint-disable-next-line */
                    expect(xqstCase.failure).to.not.exist
          /* eslint-disable-next-line */
                    expect(xqstCase.error).to.not.exist
          break
      }
    }
    ))
  }
}
