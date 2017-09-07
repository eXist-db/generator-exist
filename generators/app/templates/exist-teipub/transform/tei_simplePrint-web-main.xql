import module namespace m='http://www.tei-c.org/pm/models/tei_simplePrint/web' at '/db/apps/yo-teipub/transform/tei_simplePrint-web.xql';

declare variable $xml external;

declare variable $parameters external;

let $options := map {
    "styles": ["../transform/tei_simplePrint.css"],
    "collection": "/db/apps/yo-teipub/transform",
    "parameters": if (exists($parameters)) then $parameters else map {}
}
return m:transform($options, $xml)