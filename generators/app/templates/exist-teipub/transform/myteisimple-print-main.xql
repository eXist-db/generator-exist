import module namespace m='http://www.tei-c.org/pm/models/myteisimple/fo' at '/db/<%- defcoll %>/<%- short %>/transform/myteisimple-print.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/myteisimple.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)