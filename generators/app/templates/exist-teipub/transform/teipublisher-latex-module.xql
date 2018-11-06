module namespace pml='http://www.tei-c.org/pm/models/teipublisher/latex/module';

import module namespace m='http://www.tei-c.org/pm/models/teipublisher/latex' at '/db/<%- defcoll %>/<%- short %>/transform/teipublisher-latex.xql';

(: Generated library module to be directly imported into code which
 : needs to transform TEI nodes using the ODD this module is based on.
 :)
declare function pml:transform($xml as node()*, $parameters as map(*)?) {

   let $options := map {
    "class": "article",
    "section-numbers": false(),
    "font-size": "11pt",
       "styles": ["../transform/teipublisher.css"],
       "collection": "/db/<%- defcoll %>/<%- short %>/transform",
       "parameters": if (exists($parameters)) then $parameters else map {}
   }
   return m:transform($options, $xml)
};