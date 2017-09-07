import module namespace m='http://www.tei-c.org/pm/models/teipublisher/fo' at '/db/apps/teipub/transform/teipublisher-print.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/teipublisher.css"],
    "collection": "/db/apps/teipub/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)