import module namespace m='http://www.tei-c.org/pm/models/graves/epub' at '/db/<%- defcoll %>/<%- short %>/transform/graves-epub.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/graves.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)