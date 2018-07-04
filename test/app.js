'use strict';
var path = require('path');
var fs = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-exist:basic-app', function() {
  it('should generate an exide style app via mock input', function() {
    return helpers.run(path.join(__dirname, '../app'))
    .inTmpDir(function (dir) {
    var done = this.async(); // `this` is the RunContext object.
    fs.copy(path.join(__dirname, '../templates/common'), dir, done);
  })
      .withPrompts({
        title: "foo",
        apptype: "exist-design",
        author: "tester",
        email: "te@st.er"
      })
      .then(function(dir) {
        assert.file(['repo.xml', 'README.md', 'pre-install.xql', 'post-install.xql', 'modules/app.xql']);
      });
  });
});
