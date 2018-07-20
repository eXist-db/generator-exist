xquery version "3.1";

(:~ This library module contains XQSuite tests for the <%- title %> app.
 :
 : @author <%- author %>
 : @version <%- version %>
 : @see <%- website %>
 :)

module namespace tests = "<%- defuri %>/<%- defcoll %>/<%- short %>/tests";
<%_ if (apptype == 'teipub') { %>
  import module namespace app="teipublisher.com/app" at "app.xql";
<% } else { %>
  import module namespace app = "<%- defuri %>/<%- defcoll %>/<%- short %>/templates" at "app.xql";
<% } _%>
declare namespace test="http://exist-db.org/xquery/xqsuite";

declare variable $tests:map := map {1: 1};

declare
    %test:arg('n', 'div')
    %test:assertEquals("<p>Dummy templating function.</p>")
    function tests:templating-foo($n as xs:string) as node(){
        app:foo(element {$n} {}, $tests:map)
};
