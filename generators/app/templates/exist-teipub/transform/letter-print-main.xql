import module namespace m='http://www.tei-c.org/pm/models/letter/fo' at '/db/<%- defcoll %>/<%- short %>/transform/letter-print.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/letter.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)