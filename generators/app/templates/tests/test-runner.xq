xquery version "3.1";

(: TODO add xqdoc and templates for namespace uri  :)
import module namespace test="http://exist-db.org/xquery/xqsuite" at "resource:org/exist/xquery/lib/xqsuite/xqsuite.xql";
import module namespace tests="https://your.super.namespace.edu/tests" at "test.xqm";

test:suite(util:list-functions("https://your.super.namespace.edu/tests"))
