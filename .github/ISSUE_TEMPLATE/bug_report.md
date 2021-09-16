---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: ''
assignees: ''

---

:balloon: First off, thank you for contributing to eXist-db's yeoman generator. :balloon:

**Describe the bug**
> A clear and concise description of what the bug is.

**Expected behavior**
> A clear and concise description of what you expected to happen.

**To Reproduce**
> The *best* way is to provide an [SSCCE (Short, Self Contained, Correct (Compilable), Example)](http://sscce.org/). One type of SSCCE could be a small test which reproduces the issue and can be run without dependencies. Please locate the existing test-suite and follow the examples provided there:

**Unit Test**
The generator uses uses [mocha](https://mochajs.org) and the `yeoman-test` framework for for its unit and integration tests. 

You can find mock app configs inside `test/generated-pkg`. When a bug effects multiple app types, it is generally sufficient to add another test case for just one app type.  

```javascript
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const fs = require('fs-extra')

// this is a dummy test 
describe('exist design has …', function () {
    it('default files', function (done) {
      assert.file(['repo.xml', 'modules/app.xql'])
      done()
    })

    it('type specific files', function (done) {
      assert.file(['resources/css/exist-2.2.css'])
      done()
    })
  })
```

If none of the above is working, please tell us the exact steps you took when you encountered the problem:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Logs, error messages**
> Paste the contents of error messages or log files here (exist.log, stdout). What does `npm test` produce?

**Context (please always complete the following information):**
-   node version: `x.x.x`
-   eXist-db version: `x.x.x`
-   generator version: `x.x.x`
-   install method: `npm / github`