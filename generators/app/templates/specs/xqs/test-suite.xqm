xquery version "3.1";

(:~ This library module contains XQSuite tests for the <%- title %> app.
 :
 : @author <%- author %>
 : @version <%- version %>
 : @see <%- website %>
 :)

module namespace tests = "<%- defuri %>/<%- defcoll %>/<%- short %>/tests";
<%_ if (apptype !== 'empty') { %>
import module namespace app = "<%- defuri %>/<%- defcoll %>/<%- short %>/templates" at "../../modules/app.xqm";
 <% } -%>

declare namespace test="http://exist-db.org/xquery/xqsuite";

<%_ if (apptype !== 'empty') { %>
declare variable $tests:map := map {1: 1};

declare
    %test:name('dummy-templating-call')
    %test:arg('n', 'div')
    %test:assertEquals("<p>Dummy templating function.</p>")
    function tests:templating-foo($n as xs:string) as node(){
        app:foo(element {$n} {}, $tests:map)
};
<% } else { %>

declare
    %test:name('one-is-one')
    %test:assertTrue
    function tests:tautology() {
        1 = 1
};
<% } -%>
