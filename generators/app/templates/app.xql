xquery version "3.1";

(:~ This is the default application library module of the <%- title %> app.
 :
 : @author <%- author %>
 : @version <%- version %>
 : @see <%- website %>
 :)

(: Module for app-specific template functions :)
module namespace app="<%- defuri %>/<%- defcoll %>/<%- short %>/templates";
import module namespace templates="http://exist-db.org/xquery/templates";
import module namespace config="<%- defuri %>/<%- defcoll %>/<%- short %>/config" at "config.xqm";


(:~
 : This is a sample templating function. It will be called by the templating module if
 : it encounters an HTML element with an attribute: data-template="app:test" or class="app:test" (deprecated).
 : The function has to take 2 default parameters. Additional parameters are automatically mapped to
 : any matching request or function parameter.
 :
 : @param $node the HTML node with the attribute which triggered this call
 : @param $model a map containing arbitrary data - used to pass information between template calls
 :)

declare
    %templates:wrap
function app:foo($node as node(), $model as map(*)) {
    <p>Dummy templating function.</p>
};
