'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('exist scaffold app', function() {
  describe('eXide style app', function() {
    it('create app dir', function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          title: "foo",
          author: "tester",
          email: "te@st.er"
        })
        .on('end', function(){
          describe('basic app has', function() {
            it('default files', function() {
              assert.file(['repo.xml', 'modules/app.xql'])
            });

            it('with proper names inside', function() {
              assert.fileContent('repo.xml', /<target>foo<\/target>/)
            });

          });
          done();
        })
      });
  });




});
// it('does not have this', function() {
//   assert.noFile(['frrrrepo.xml']);
// });
