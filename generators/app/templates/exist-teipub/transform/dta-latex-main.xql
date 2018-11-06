import module namespace m='http://www.tei-c.org/pm/models/dta/latex' at '/db/<%- defcoll %>/<%- short %>/transform/dta-latex.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "class": "article",
    "section-numbers": false(),
    "font-size": "11pt",
    "styles": ["../transform/dta.css"],
    "collection": "/db/<%- defcoll %>/<%- short %>/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)