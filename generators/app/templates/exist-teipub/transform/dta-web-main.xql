import module namespace m='http://www.tei-c.org/pm/models/dta/web' at '/db/<%- defcoll %>/<%- short %>/transform/dta-web.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/dta.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)