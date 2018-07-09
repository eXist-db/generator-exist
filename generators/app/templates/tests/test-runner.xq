xquery version "3.1";

(:~ This library runs the XQSuite unit tests for the <%- title %> app.
 :
 : @author <%- author %>
 : @version <%- version %>
 : @see <%- website %>
 :)
import module namespace test="http://exist-db.org/xquery/xqsuite" at "resource:org/exist/xquery/lib/xqsuite/xqsuite.xql";
import module namespace tests="<%- defuri %>/<%- defcoll %>/<%- short %>/tests" at "test-suite.xqm";

test:suite(util:list-functions("<%- defuri %>/<%- defcoll %>/<%- short %>/tests"))
