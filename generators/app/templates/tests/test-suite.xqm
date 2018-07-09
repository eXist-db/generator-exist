xquery version "3.1";

(:~ This library module contains XQSuite tests for the <%- title %> app.
 :
 : @author <%- author %>
 : @version <%- version %>
 : @see <%- website %>
 :)

module namespace tests = "<%- defuri %>/<%- defcoll %>/<%- short %>/tests";

import module namespace app = "<%- defuri %>/<%- defcoll %>/<%- short %>/templates" at "app.xql";

declare namespace test="http://exist-db.org/xquery/xqsuite";



declare
    %test:args("June 30, 2014")
    %test:assertXPath("deep-equal($result, <date>June 30, 2014</date>)")
    function iu-test:analyze-date-string-simple-date($string as xs:string) {
        iu:analyze-date-string($string)
};

declare
    %test:args("Sep. 30, 2014")
    %test:assertXPath("deep-equal($result, <date>Sep. 30, 2014</date>)")
    function iu-test:analyze-date-string-simple-date-abbreviation($string as xs:string) {
        iu:analyze-date-string($string)
};

declare
    %test:args("April 3-15, 1943")
    %test:assertXPath("deep-equal($result, <range type=""intra-month"">
            <date>April 3, 1943</date>
            <date>April 15, 1943</date>
        </range>)")
    function iu-test:analyze-date-string-intra-month-range($string as xs:string) {
        iu:analyze-date-string($string)
};

declare
    %test:args("September 30-October 1, 1973")
    %test:assertXPath("deep-equal($result, <range type=""inter-month"">
            <date>September 30, 1973</date>
            <date>October 1, 1973</date>
        </range>)")
    function iu-test:analyze-date-string-inter-month-range($string as xs:string) {
        iu:analyze-date-string($string)
};

declare
    %test:args("December 7, 1941-August 15, 1945")
    %test:assertXPath("deep-equal($result, <range type=""inter-year"">
            <date>December 7, 1941</date>
            <date>August 15, 1945</date>
        </range>)")
    function iu-test:analyze-date-string-inter-year-range($string as xs:string) {
        iu:analyze-date-string($string)
};

declare
    %test:args("May 3, 8, 1963")
    %test:assertTrue
    function iu-test:analyze-date-string-fail-on-date-sequence($string as xs:string) {
        iu:analyze-date-string($string)/self::error
};
