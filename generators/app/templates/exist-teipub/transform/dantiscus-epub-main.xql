import module namespace m='http://www.tei-c.org/pm/models/dantiscus/epub' at '/db/<%- defcoll %>/<%- short %>/transform/dantiscus-epub.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/dantiscus.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)