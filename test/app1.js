'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('eXide style app', function() {

  before(function() {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: "foo",
        author: "tester",
        email: "te@st.er"
      })
      .then(function() {
        return true;
      });
  });


  describe('basic app has', function() {
    it('default files', function() {
      assert.file(['repo.xml', 'modules/app.xql'])
    });

    it('with proper names inside', function() {
      assert.fileContent('repo.xml', /<target>foo<\/target>/)
    });
  });


  after('teardown', function() {
    fs.emptydirSync(process.cwd())
  });
});
