'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-exist:app', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({title: "foo",
      author: "tester",
      email: "te@st.er"});
  });

  it('creates files', () => {
      assert.file(['repo.xml', 'README.md', 'pre-install.xql', 'post-install.xql', 'modules/app.xql']);
    });
  });
