'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('library package', function() {
      describe('library', function() {
        it('create lib pkg', function(done) {
          helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
              title: "foo",
              author: "tester",
              email: "te@st.er",
              apptype: 'library',
            })
            .on('end', function() {
              describe('library has', function() {
                it('default files', function() {
                  assert.file(['repo.xml', 'content/.gitkeep'])
                });
              });
              done();
            })
        });
      });
    });
