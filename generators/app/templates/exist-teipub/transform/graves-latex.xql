(:~

    Transformation module generated from TEI ODD extensions for processing models.
    ODD: /db/<%- defcoll %>/<%- short %>/<%- odd %>/graves.odd
 :)
xquery version "3.1";

module namespace model="http://www.tei-c.org/pm/models/graves/latex";

declare default element namespace "http://www.tei-c.org/ns/1.0";

declare namespace xhtml='http://www.w3.org/1999/xhtml';

declare namespace xi='http://www.w3.org/2001/XInclude';

declare namespace pb='http://teipublisher.com/1.0';

import module namespace css="http://www.tei-c.org/tei-simple/xquery/css";

import module namespace latex="http://www.tei-c.org/tei-simple/xquery/functions/latex";

(: Generated behaviour function for pb:behaviour/@ident=glossary :)
declare %private function model:glossary($config as map(*), $node as node()*, $class as xs:string+, $content, $name, $note) {
    $node ! (
        let $id := @xml:id

        return

        ``[\newglossaryentry{`{string-join($config?apply-children($config, $node, $id))}`} { 
name=`{string-join($config?apply-children($config, $node, $name))}`,
description={`{string-join($config?apply-children($config, $node, $note))}`}
}]``
    )
};
(: generated template function for element spec: teiHeader :)
declare %private function model:template1($config as map(*), $node as node()*, $params as map(*)) {
    ``[\def\volume{`{string-join($config?apply-children($config, $node, $params?content))}`}]``
};
(: generated template function for element spec: TEI :)
declare %private function model:template2($config as map(*), $node as node()*, $params as map(*)) {
    ``[\documentclass[10pt,a4paper,fromalign=right]{scrlttr2}
\usepackage[british]{babel}
\usepackage{hyperref}
\usepackage{glossaries}
\makenoidxglossaries
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[LO,RE]{\footnotesize\volume}
\fancyfoot[LE,RO]{\footnotesize\thepage}
\setkomavar{date}{`{string-join($config?apply-children($config, $node, $params?date))}`}
`{string-join($config?apply-children($config, $node, $params?glossary))}`
\begin{document}
`{string-join($config?apply-children($config, $node, $params?header))}`
\begin{letter}`{string-join($config?apply-children($config, $node, $params?to))}`
`{string-join($config?apply-children($config, $node, $params?from))}`
`{string-join($config?apply-children($config, $node, $params?content))}`
\end{letter}
\printnoidxglossaries
\end{document}]``
};
(: generated template function for element spec: opener :)
declare %private function model:template3($config as map(*), $node as node()*, $params as map(*)) {
    ``[\opening{`{string-join($config?apply-children($config, $node, $params?content))}`}]``
};
(: generated template function for element spec: closer :)
declare %private function model:template4($config as map(*), $node as node()*, $params as map(*)) {
    ``[\closing{`{string-join($config?apply-children($config, $node, $params?content))}`}]``
};
(: generated template function for element spec: name :)
declare %private function model:template5($config as map(*), $node as node()*, $params as map(*)) {
    ``[\glslink{`{string-join($config?apply-children($config, $node, $params?id))}`}{`{string-join($config?apply-children($config, $node, $params?content))}`}]``
};
(: generated template function for element spec: postscript :)
declare %private function model:template6($config as map(*), $node as node()*, $params as map(*)) {
    ``[\ps `{string-join($config?apply-children($config, $node, $params?content))}`]``
};
(: generated template function for element spec: correspAction :)
declare %private function model:template7($config as map(*), $node as node()*, $params as map(*)) {
    ``[\setkomavar{fromname}{`{string-join($config?apply-children($config, $node, $params?name))}`}
\setkomavar{fromaddress}{`{string-join($config?apply-children($config, $node, $params?location))}`}]``
};
(: generated template function for element spec: correspAction :)
declare %private function model:template8($config as map(*), $node as node()*, $params as map(*)) {
    ``[{`{string-join($config?apply-children($config, $node, $params?name))}`\\`{string-join($config?apply-children($config, $node, $params?location))}`}]``
};
(:~

    Main entry point for the transformation.
    
 :)
declare function model:transform($options as map(*), $input as node()*) {
        
    let $config :=
        map:new(($options,
            map {
                "output": ["latex","print"],
                "odd": "/db/<%- defcoll %>/<%- short %>/<%- odd %>/graves.odd",
                "apply": model:apply#2,
                "apply-children": model:apply-children#3
            }
        ))
    let $config := latex:init($config, $input)
    
    return (
        
        let $output := model:apply($config, $input)
        return
            $output
    )
};

declare function model:apply($config as map(*), $input as node()*) {
        let $parameters := 
        if (exists($config?parameters)) then $config?parameters else map {}
    return
    $input !         (
            let $node := 
                .
            return
                            typeswitch(.)
                    case element(castItem) return
                        (: Insert item, rendered as described in parent list rendition. :)
                        latex:listItem($config, ., ("tei-castItem"), .)
                    case element(item) return
                        latex:listItem($config, ., ("tei-item"), .)
                    case element(figure) return
                        if (head or @rendition='simple:display') then
                            latex:block($config, ., ("tei-figure1"), .)
                        else
                            latex:inline($config, ., ("tei-figure2"), .)
                    case element(teiHeader) return
                        let $params := 
                            map {
                                "content": (fileDesc/titleStmt/title[not(@type)])
                            }

                                                let $content := 
                            model:template1($config, ., $params)
                        return
                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-teiHeader1"), $content)
                    case element(supplied) return
                        if (parent::choice) then
                            latex:inline($config, ., ("tei-supplied1"), .)
                        else
                            if (@reason='damage') then
                                latex:inline($config, ., ("tei-supplied2"), .)
                            else
                                if (@reason='illegible' or not(@reason)) then
                                    latex:inline($config, ., ("tei-supplied3"), .)
                                else
                                    if (@reason='omitted') then
                                        latex:inline($config, ., ("tei-supplied4"), .)
                                    else
                                        latex:inline($config, ., ("tei-supplied5"), .)
                    case element(milestone) return
                        latex:inline($config, ., ("tei-milestone"), .)
                    case element(label) return
                        latex:inline($config, ., ("tei-label"), .)
                    case element(signed) return
                        if (parent::closer) then
                            latex:block($config, ., ("tei-signed1"), .)
                        else
                            latex:inline($config, ., ("tei-signed2"), .)
                    case element(pb) return
                        latex:omit($config, ., ("tei-pb"), .)
                    case element(pc) return
                        latex:inline($config, ., ("tei-pc"), .)
                    case element(anchor) return
                        latex:anchor($config, ., ("tei-anchor"), ., @xml:id)
                    case element(TEI) return
                        let $params := 
                            map {
                                "glossary": (teiHeader//particDesc/listPerson/person, teiHeader//settingDesc/listPlace/place),
                                "content": text,
                                "header": teiHeader,
                                "date": text/body/opener/dateline/date,
                                "from": teiHeader//correspDesc/correspAction[@type='sending'],
                                "to": teiHeader//correspDesc/correspAction[@type='receiving']
                            }

                                                let $content := 
                            model:template2($config, ., $params)
                        return
                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-TEI1"), $content)
                    case element(formula) return
                        if (@rendition='simple:display') then
                            latex:block($config, ., ("tei-formula1"), .)
                        else
                            latex:inline($config, ., ("tei-formula2"), .)
                    case element(choice) return
                        if (sic and corr) then
                            latex:alternate($config, ., ("tei-choice4"), ., corr[1], sic[1])
                        else
                            if (abbr and expan) then
                                latex:alternate($config, ., ("tei-choice5"), ., expan[1], abbr[1])
                            else
                                if (orig and reg) then
                                    latex:alternate($config, ., ("tei-choice6"), ., reg[1], orig[1])
                                else
                                    $config?apply($config, ./node())
                    case element(hi) return
                        if (@rendition) then
                            latex:inline($config, ., css:get-rendition(., ("tei-hi1")), .)
                        else
                            if (not(@rendition)) then
                                latex:inline($config, ., ("tei-hi2"), .)
                            else
                                $config?apply($config, ./node())
                    case element(code) return
                        latex:inline($config, ., ("tei-code"), .)
                    case element(note) return
                        if (@place) then
                            latex:note($config, ., ("tei-note1"), ., @place, @n)
                        else
                            if (parent::div and not(@place)) then
                                latex:block($config, ., ("tei-note2"), .)
                            else
                                if (not(@place)) then
                                    latex:inline($config, ., ("tei-note3"), .)
                                else
                                    $config?apply($config, ./node())
                    case element(dateline) return
                        latex:omit($config, ., ("tei-dateline1"), .)
                    case element(back) return
                        latex:block($config, ., ("tei-back"), .)
                    case element(del) return
                        latex:inline($config, ., ("tei-del"), .)
                    case element(trailer) return
                        latex:block($config, ., ("tei-trailer"), .)
                    case element(titlePart) return
                        latex:block($config, ., css:get-rendition(., ("tei-titlePart")), .)
                    case element(ab) return
                        latex:paragraph($config, ., ("tei-ab"), .)
                    case element(revisionDesc) return
                        latex:omit($config, ., ("tei-revisionDesc"), .)
                    case element(am) return
                        latex:inline($config, ., ("tei-am"), .)
                    case element(subst) return
                        latex:inline($config, ., ("tei-subst"), .)
                    case element(roleDesc) return
                        latex:block($config, ., ("tei-roleDesc"), .)
                    case element(orig) return
                        latex:inline($config, ., ("tei-orig"), .)
                    case element(opener) return
                        let $params := 
                            map {
                                "content": .
                            }

                                                let $content := 
                            model:template3($config, ., $params)
                        return
                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-opener1"), $content)
                    case element(speaker) return
                        latex:block($config, ., ("tei-speaker"), .)
                    case element(imprimatur) return
                        latex:block($config, ., ("tei-imprimatur"), .)
                    case element(publisher) return
                        if (ancestor::teiHeader) then
                            (: Omit if located in teiHeader. :)
                            latex:omit($config, ., ("tei-publisher"), .)
                        else
                            $config?apply($config, ./node())
                    case element(figDesc) return
                        latex:inline($config, ., ("tei-figDesc"), .)
                    case element(rs) return
                        latex:inline($config, ., ("tei-rs"), .)
                    case element(foreign) return
                        latex:inline($config, ., ("tei-foreign"), .)
                    case element(fileDesc) return
                        if ($parameters?header='short') then
                            (
                                latex:block($config, ., ("tei-fileDesc1", "header-short"), titleStmt),
                                latex:block($config, ., ("tei-fileDesc2", "header-short"), editionStmt),
                                latex:block($config, ., ("tei-fileDesc3", "header-short"), publicationStmt)
                            )

                        else
                            latex:title($config, ., ("tei-fileDesc4"), titleStmt)
                    case element(seg) return
                        latex:inline($config, ., css:get-rendition(., ("tei-seg")), .)
                    case element(profileDesc) return
                        latex:omit($config, ., ("tei-profileDesc"), .)
                    case element(email) return
                        latex:inline($config, ., ("tei-email"), .)
                    case element(text) return
                        latex:body($config, ., ("tei-text"), .)
                    case element(floatingText) return
                        latex:block($config, ., ("tei-floatingText"), .)
                    case element(sp) return
                        latex:block($config, ., ("tei-sp"), .)
                    case element(abbr) return
                        latex:inline($config, ., ("tei-abbr"), .)
                    case element(table) return
                        latex:table($config, ., ("tei-table"), ., map {})
                    case element(cb) return
                        latex:break($config, ., ("tei-cb"), ., 'column', @n)
                    case element(group) return
                        latex:block($config, ., ("tei-group"), .)
                    case element(licence) return
                        latex:omit($config, ., ("tei-licence2"), .)
                    case element(editor) return
                        if (ancestor::teiHeader) then
                            latex:omit($config, ., ("tei-editor1"), .)
                        else
                            latex:inline($config, ., ("tei-editor2"), .)
                    case element(c) return
                        latex:inline($config, ., ("tei-c"), .)
                    case element(listBibl) return
                        if (bibl) then
                            latex:list($config, ., ("tei-listBibl1"), bibl)
                        else
                            latex:block($config, ., ("tei-listBibl2"), .)
                    case element(address) return
                        latex:block($config, ., ("tei-address"), .)
                    case element(g) return
                        if (not(text())) then
                            latex:glyph($config, ., ("tei-g1"), .)
                        else
                            latex:inline($config, ., ("tei-g2"), .)
                    case element(author) return
                        if (ancestor::teiHeader) then
                            latex:block($config, ., ("tei-author1"), .)
                        else
                            latex:inline($config, ., ("tei-author2"), .)
                    case element(castList) return
                        if (child::*) then
                            latex:list($config, ., css:get-rendition(., ("tei-castList")), castItem)
                        else
                            $config?apply($config, ./node())
                    case element(l) return
                        latex:block($config, ., css:get-rendition(., ("tei-l")), .)
                    case element(closer) return
                        let $params := 
                            map {
                                "content": .
                            }

                                                let $content := 
                            model:template4($config, ., $params)
                        return
                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-closer1"), $content)
                    case element(rhyme) return
                        latex:inline($config, ., ("tei-rhyme"), .)
                    case element(list) return
                        if (@rendition) then
                            latex:list($config, ., css:get-rendition(., ("tei-list1")), item)
                        else
                            if (not(@rendition)) then
                                latex:list($config, ., ("tei-list2"), item)
                            else
                                $config?apply($config, ./node())
                    case element(p) return
                        latex:paragraph($config, ., css:get-rendition(., ("tei-p")), .)
                    case element(measure) return
                        latex:inline($config, ., ("tei-measure"), .)
                    case element(q) return
                        if (l) then
                            latex:block($config, ., css:get-rendition(., ("tei-q1")), .)
                        else
                            if (ancestor::p or ancestor::cell) then
                                latex:inline($config, ., css:get-rendition(., ("tei-q2")), .)
                            else
                                latex:block($config, ., css:get-rendition(., ("tei-q3")), .)
                    case element(actor) return
                        latex:inline($config, ., ("tei-actor"), .)
                    case element(epigraph) return
                        latex:block($config, ., ("tei-epigraph"), .)
                    case element(s) return
                        latex:inline($config, ., ("tei-s"), .)
                    case element(docTitle) return
                        latex:block($config, ., css:get-rendition(., ("tei-docTitle")), .)
                    case element(lb) return
                        latex:break($config, ., css:get-rendition(., ("tei-lb")), ., 'line', @n)
                    case element(w) return
                        latex:inline($config, ., ("tei-w"), .)
                    case element(stage) return
                        latex:block($config, ., ("tei-stage"), .)
                    case element(titlePage) return
                        latex:block($config, ., css:get-rendition(., ("tei-titlePage")), .)
                    case element(name) return
                        let $params := 
                            map {
                                "id": substring-after(@ref, '#'),
                                "content": .
                            }

                                                let $content := 
                            model:template5($config, ., $params)
                        return
                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-name1"), $content)
                    case element(front) return
                        latex:block($config, ., ("tei-front"), .)
                    case element(lg) return
                        latex:block($config, ., ("tei-lg"), .)
                    case element(publicationStmt) return
                        latex:omit($config, ., ("tei-publicationStmt2"), .)
                    case element(biblScope) return
                        latex:inline($config, ., ("tei-biblScope"), .)
                    case element(desc) return
                        latex:inline($config, ., ("tei-desc"), .)
                    case element(role) return
                        latex:block($config, ., ("tei-role"), .)
                    case element(docEdition) return
                        latex:inline($config, ., ("tei-docEdition"), .)
                    case element(num) return
                        latex:inline($config, ., ("tei-num"), .)
                    case element(docImprint) return
                        latex:inline($config, ., ("tei-docImprint"), .)
                    case element(postscript) return
                        let $params := 
                            map {
                                "content": .
                            }

                                                let $content := 
                            model:template6($config, ., $params)
                        return
                                                latex:block(map:merge(($config, map:entry("template", true()))), ., ("tei-postscript1"), $content)
                    case element(edition) return
                        if (ancestor::teiHeader) then
                            latex:block($config, ., ("tei-edition"), .)
                        else
                            $config?apply($config, ./node())
                    case element(cell) return
                        (: Insert table cell. :)
                        latex:cell($config, ., ("tei-cell"), ., ())
                    case element(relatedItem) return
                        latex:inline($config, ., ("tei-relatedItem"), .)
                    case element(div) return
                        if (@type='title_page') then
                            latex:block($config, ., ("tei-div1"), .)
                        else
                            if (parent::body or parent::front or parent::back) then
                                latex:section($config, ., ("tei-div2"), .)
                            else
                                latex:block($config, ., ("tei-div3"), .)
                    case element(graphic) return
                        latex:graphic($config, ., ("tei-graphic"), ., @url, @width, @height, @scale, desc)
                    case element(reg) return
                        latex:inline($config, ., ("tei-reg"), .)
                    case element(ref) return
                        if (not(@target)) then
                            latex:inline($config, ., ("tei-ref1"), .)
                        else
                            if (not(text())) then
                                latex:link($config, ., ("tei-ref2"), @target, ())
                            else
                                latex:link($config, ., ("tei-ref3"), ., ())
                    case element(pubPlace) return
                        if (ancestor::teiHeader) then
                            (: Omit if located in teiHeader. :)
                            latex:omit($config, ., ("tei-pubPlace"), .)
                        else
                            $config?apply($config, ./node())
                    case element(add) return
                        latex:inline($config, ., ("tei-add"), .)
                    case element(docDate) return
                        latex:inline($config, ., ("tei-docDate"), .)
                    case element(head) return
                        if ($parameters?header='short') then
                            latex:inline($config, ., ("tei-head1"), replace(string-join(.//text()[not(parent::ref)]), '^(.*?)[^\w]*$', '$1'))
                        else
                            if (parent::figure) then
                                latex:block($config, ., ("tei-head2"), .)
                            else
                                if (parent::table) then
                                    latex:block($config, ., ("tei-head3"), .)
                                else
                                    if (parent::lg) then
                                        latex:block($config, ., ("tei-head4"), .)
                                    else
                                        if (parent::list) then
                                            latex:block($config, ., ("tei-head5"), .)
                                        else
                                            if (parent::div) then
                                                latex:heading($config, ., ("tei-head6"), .)
                                            else
                                                latex:block($config, ., ("tei-head7"), .)
                    case element(ex) return
                        latex:inline($config, ., ("tei-ex"), .)
                    case element(castGroup) return
                        if (child::*) then
                            (: Insert list. :)
                            latex:list($config, ., ("tei-castGroup"), castItem|castGroup)
                        else
                            $config?apply($config, ./node())
                    case element(time) return
                        latex:inline($config, ., ("tei-time"), .)
                    case element(bibl) return
                        if (parent::listBibl) then
                            latex:listItem($config, ., ("tei-bibl1"), .)
                        else
                            latex:inline($config, ., ("tei-bibl2"), .)
                    case element(salute) return
                        if (parent::closer) then
                            latex:inline($config, ., ("tei-salute1"), .)
                        else
                            latex:block($config, ., ("tei-salute2"), .)
                    case element(unclear) return
                        latex:inline($config, ., ("tei-unclear"), .)
                    case element(argument) return
                        latex:block($config, ., ("tei-argument"), .)
                    case element(date) return
                        if (text()) then
                            latex:inline($config, ., ("tei-date1"), .)
                        else
                            if (@when and not(text())) then
                                latex:inline($config, ., ("tei-date2"), @when)
                            else
                                if (text()) then
                                    latex:inline($config, ., ("tei-date4"), .)
                                else
                                    $config?apply($config, ./node())
                    case element(title) return
                        if ($parameters?header='short') then
                            latex:heading($config, ., ("tei-title1"), .)
                        else
                            if (parent::titleStmt/parent::fileDesc) then
                                (
                                    if (preceding-sibling::title) then
                                        latex:text($config, ., ("tei-title2"), ' — ')
                                    else
                                        (),
                                    latex:inline($config, ., ("tei-title3"), .)
                                )

                            else
                                if (not(@level) and parent::bibl) then
                                    latex:inline($config, ., ("tei-title4"), .)
                                else
                                    if (@level='m' or not(@level)) then
                                        (
                                            latex:inline($config, ., ("tei-title5"), .),
                                            if (ancestor::biblFull) then
                                                latex:text($config, ., ("tei-title6"), ', ')
                                            else
                                                ()
                                        )

                                    else
                                        if (@level='s' or @level='j') then
                                            (
                                                latex:inline($config, ., ("tei-title7"), .),
                                                if (following-sibling::* and     (  ancestor::biblFull)) then
                                                    latex:text($config, ., ("tei-title8"), ', ')
                                                else
                                                    ()
                                            )

                                        else
                                            if (@level='u' or @level='a') then
                                                (
                                                    latex:inline($config, ., ("tei-title9"), .),
                                                    if (following-sibling::* and     (    ancestor::biblFull)) then
                                                        latex:text($config, ., ("tei-title10"), '. ')
                                                    else
                                                        ()
                                                )

                                            else
                                                latex:inline($config, ., ("tei-title11"), .)
                    case element(corr) return
                        if (parent::choice and count(parent::*/*) gt 1) then
                            (: simple inline, if in parent choice. :)
                            latex:inline($config, ., ("tei-corr1"), .)
                        else
                            latex:inline($config, ., ("tei-corr2"), .)
                    case element(cit) return
                        if (child::quote and child::bibl) then
                            (: Insert citation :)
                            latex:cit($config, ., ("tei-cit"), ., ())
                        else
                            $config?apply($config, ./node())
                    case element(titleStmt) return
                        (: No function found for behavior: meta :)
                        $config?apply($config, ./node())
                    case element(sic) return
                        if (parent::choice and count(parent::*/*) gt 1) then
                            latex:inline($config, ., ("tei-sic1"), .)
                        else
                            latex:inline($config, ., ("tei-sic2"), .)
                    case element(expan) return
                        latex:inline($config, ., ("tei-expan"), .)
                    case element(body) return
                        if ($parameters?mode='facets') then
                            (
                                latex:heading($config, ., ("tei-body1"), 'Places'),
                                latex:block($config, ., ("tei-body2"), for $n in .//name[@type='place'] group by $ref := $n/@ref order by $ref return $n[1]),
                                latex:heading($config, ., ("tei-body3"), 'People'),
                                latex:section($config, ., ("tei-body4"), for $n in .//name[@type='person'] group by $ref := $n/@ref order by $ref return $n[1])
                            )

                        else
                            (
                                latex:index($config, ., ("tei-body5"), ., 'toc'),
                                latex:block($config, ., ("tei-body6"), .)
                            )

                    case element(spGrp) return
                        latex:block($config, ., ("tei-spGrp"), .)
                    case element(fw) return
                        if (ancestor::p or ancestor::ab) then
                            latex:inline($config, ., ("tei-fw1"), .)
                        else
                            latex:block($config, ., ("tei-fw2"), .)
                    case element(encodingDesc) return
                        latex:omit($config, ., ("tei-encodingDesc"), .)
                    case element(addrLine) return
                        latex:block($config, ., ("tei-addrLine"), .)
                    case element(gap) return
                        if (desc) then
                            latex:inline($config, ., ("tei-gap1"), .)
                        else
                            if (@extent) then
                                latex:inline($config, ., ("tei-gap2"), @extent)
                            else
                                latex:inline($config, ., ("tei-gap3"), .)
                    case element(quote) return
                        if (ancestor::p) then
                            (: If it is inside a paragraph then it is inline, otherwise it is block level :)
                            latex:inline($config, ., css:get-rendition(., ("tei-quote1")), .)
                        else
                            (: If it is inside a paragraph then it is inline, otherwise it is block level :)
                            latex:block($config, ., css:get-rendition(., ("tei-quote2")), .)
                    case element(row) return
                        if (@role='label') then
                            latex:row($config, ., ("tei-row1"), .)
                        else
                            (: Insert table row. :)
                            latex:row($config, ., ("tei-row2"), .)
                    case element(docAuthor) return
                        latex:inline($config, ., ("tei-docAuthor"), .)
                    case element(byline) return
                        latex:block($config, ., ("tei-byline"), .)
                    case element(place) return
                        model:glossary($config, ., ("tei-place1"), ., string-join(placeName, ', '), note)
                    case element(geo) return
                        (
                            latex:inline($config, ., ("tei-geo1"), 'Location: '),
                            latex:inline($config, ., ("tei-geo3"), .)
                        )

                    case element(person) return
                        model:glossary($config, ., ("tei-person1"), ., persName, note)
                    case element(persName) return
                        if (forename or surname) then
                            latex:inline($config, ., ("tei-persName1"), (forename, ' ', surname[not(@type='married')], if (surname[@type='married']) then (' (', string-join(surname[@type='married'], ', '), ')') else ()))
                        else
                            latex:inline($config, ., ("tei-persName2"), .)
                    case element(birth) return
                        if (following-sibling::death) then
                            latex:inline($config, ., ("tei-birth1"), ('* ', ., '; '))
                        else
                            latex:inline($config, ., ("tei-birth2"), ('* ', .))
                    case element(death) return
                        latex:inline($config, ., ("tei-death"), ('✝', .))
                    case element(occupation) return
                        latex:inline($config, ., ("tei-occupation"), (., ' '))
                    case element(idno) return
                        if (@type='VIAF' and following-sibling::idno) then
                            latex:link($config, ., ("tei-idno1"), 'VIAF', 'https://viaf.org/viaf/' || string() || '/')
                        else
                            if (@type='VIAF') then
                                latex:link($config, ., ("tei-idno2"), 'VIAF', 'https://viaf.org/viaf/' || string() || '/')
                            else
                                if (@type='LC-Name-Authority-File' and following-sibling::idno) then
                                    latex:link($config, ., ("tei-idno3"), 'LoC Authority', 'https://lccn.loc.gov/' || string())
                                else
                                    if (@type='LC-Name-Authority-File') then
                                        latex:link($config, ., ("tei-idno4"), 'LoC Authority', 'https://lccn.loc.gov/' || string())
                                    else
                                        $config?apply($config, ./node())
                    case element(correspAction) return
                        if (@type='sending') then
                            let $params := 
                                map {
                                    "name": persName,
                                    "location": settlement,
                                    "content": .
                                }

                                                        let $content := 
                                model:template7($config, ., $params)
                            return
                                                        latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-correspAction1"), $content)
                        else
                            if (@type='receiving') then
                                let $params := 
                                    map {
                                        "name": persName,
                                        "location": settlement,
                                        "content": .
                                    }

                                                                let $content := 
                                    model:template8($config, ., $params)
                                return
                                                                latex:inline(map:merge(($config, map:entry("template", true()))), ., ("tei-correspAction2"), $content)
                            else
                                $config?apply($config, ./node())
                    case element() return
                        if (namespace-uri(.) = 'http://www.tei-c.org/ns/1.0') then
                            $config?apply($config, ./node())
                        else
                            .
                    case text() | xs:anyAtomicType return
                        latex:escapeChars(.)
                    default return 
                        $config?apply($config, ./node())

        )

};

declare function model:apply-children($config as map(*), $node as element(), $content as item()*) {
        
    $content ! (
        typeswitch(.)
            case element() return
                if (. is $node) then
                    $config?apply($config, ./node())
                else
                    $config?apply($config, .)
            default return
                latex:escapeChars(.)
    )
};

