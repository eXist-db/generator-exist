'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-exist:app', function () {
  before('create app dir', function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: "foo",
        author: "tester",
        email: "te@st.er"
      });
      this.timeout(200000);
  });

  it('has default files', function() {
      assert.file(['repo.xml', 'README.md', 'pre-install.xql', 'post-install.xql', 'modules/app.xql']);
    }),

    it('does not have this', function() {
      assert.noFile(['frrrrepo.xml']);
    });

  it('repo has correct name', function() {
    assert.fileContent('repo.xml', /<target>foo<\/target>/);
  });

  // after('cleanup', function() {
  // rm -rf .git
  // });
});
