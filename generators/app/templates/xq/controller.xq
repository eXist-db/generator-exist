xquery version "3.1";

(:~ The controller library contains URL routing functions.
 :
 : @see http://www.exist-db.org/exist/apps/doc/urlrewrite.xml
 :)

<%_ if (mysec) { %>
import module namespace login="http://exist-db.org/xquery/login" at "resource:org/exist/xquery/modules/persistentlogin/login.xql";
<% } -%>

declare variable $exist:path external;
declare variable $exist:resource external;
declare variable $exist:controller external;
declare variable $exist:prefix external;
declare variable $exist:root external;

<%_ if (mysec) { %>
declare variable $local:login_domain := "org.exist-db.mysec";
declare variable $local:user := $local:login_domain || '.user';

let $logout := request:get-parameter("logout", ())
let $set-user := login:set-user($local:login_domain, (), false())
return
<% } %>

if ($exist:path eq '') then
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <redirect url="{request:get-uri()}/"/>
    </dispatch>

  else if ($exist:path eq "/") then
  (: forward root path to index.xql :)
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
      <redirect url="index.html"/>
    </dispatch>

  else if (ends-with($exist:resource, ".html")) then (
  (: the html page is run through view.xql to expand templates :)
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <view>
          <forward url="{$exist:controller}/modules/view.xql"/>
        </view>
        <error-handler>
      	  <forward url="{$exist:controller}/error-page.html" method="get"/>
      		<forward url="{$exist:controller}/modules/view.xql"/>
      	</error-handler>
    </dispatch>)
    else
          (: everything else is passed through :)
          <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
              <cache-control cache="yes"/>
          </dispatch>
