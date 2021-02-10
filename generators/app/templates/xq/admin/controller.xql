xquery version "3.0";

(:~ The controller library contains URL routing functions.
 :
 : @see http://www.exist-db.org/exist/apps/doc/urlrewrite.xml
 :)

import module namespace login="http://exist-db.org/xquery/login" at "resource:org/exist/xquery/modules/persistentlogin/login.xql";

declare variable $exist:path external;
declare variable $exist:resource external;
declare variable $exist:controller external;
declare variable $exist:prefix external;
declare variable $exist:root external;

declare variable $local:login_domain := "org.exist-db.mysec";
declare variable $local:user := $local:login_domain || '.user';

let $logout := request:get-parameter("logout", ())
let $set-user := login:set-user($local:login_domain, (), false())
return
  if ($exist:path eq '') then
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <redirect url="{request:get-uri()}/"/>
      </dispatch>
  else if (($exist:path eq "/") or ($logout)) then
    (: forward root path to index.xql :)
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <redirect url="index.html"/>
      </dispatch>

  else if (ends-with($exist:resource, ".html")) then
    (: the html page is run through view.xql to expand templates :)
      if (request:get-attribute("org.exist-db.mysec.user")) then
      (: secured area checks user status :)
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <view>
              <forward url="{$exist:controller}/../modules/view.xql">
                  <set-attribute name="isAdmin" value="true"/>
                  <set-attribute name="$exist:prefix" value="{$exist:prefix}"/>
                  <set-attribute name="$exist:controller" value="{$exist:controller}"/>
              </forward>
          </view>
  		<error-handler>
  			<forward url="{$exist:controller}/../error-page.html" method="get"/>
  			<forward url="{$exist:controller}/../modules/view.xql"/>
  		</error-handler>
      </dispatch>
      else
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <!-- This forwards the entry to the content page blog.html -->
          <forward url="{$exist:controller}/security.html"/>
          <!-- This send the page through the templating process -->
          <view>
              <forward url="{$exist:controller}/../modules/view.xql">
                  <set-attribute name="$exist:prefix" value="{$exist:prefix}"/>
                  <set-attribute name="$exist:controller" value="{$exist:controller}"/>
              </forward>
          </view>
          <error-handler>
              <forward url="{$exist:controller}/../error-page.html" method="get"/>
              <forward url="{$exist:controller}/../modules/view.xql"/>
          </error-handler>
      </dispatch>
  else if (starts-with($exist:path, "/resources")) then
      (: images, css are contained in the top /resources/ collection. :)
      (: Relative path requests from sub-collections are redirected there :)
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <forward url="{$exist:controller}/../{$exist:path}"/>
      </dispatch>
  else
      (: everything else is passed through :)
      <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <cache-control cache="yes"/>
      </dispatch>
