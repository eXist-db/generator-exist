(: run tests on GitLab Runner :)
let $jobId := try {file:read("/tmp/ci.job") => xs:int()} catch * { 0 }
return
if ($jobId gt 0)
then
    (
        let $tests := util:eval(xs:anyURI('test.xq')),
            $file-name := system:get-exist-home()||"/../sade_job-"||string($jobId)||".log.xml",
            $file := file:serialize(<tests time="{current-dateTime()}">{$tests}</tests>, $file-name, ())
        return
            (
                util:log-system-out("wrote test results to " || $file-name),
                system:shutdown(15)
            )
    )
else
    util:log-system-out("CI_JOB_ID: not found; not on a GitLab Runner")
)
