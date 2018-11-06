import module namespace m='http://www.tei-c.org/pm/models/serafin/fo' at '/db/<%- defcoll %>/<%- short %>/transform/serafin-print.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/serafin.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)