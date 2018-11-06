import module namespace m='http://www.tei-c.org/pm/models/shakespeare/epub' at '/db/<%- defcoll %>/<%- short %>/transform/shakespeare-epub.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/shakespeare.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)