exports.StartServer = function() {

const restify = require('restify')

var body = "<testsuites><testsuite package='http://exist-db.org/apps/my-app/tests' tests='1' failures='0' errors='0' pending='0'><testcase name='templating-foo' class='tests:templating-foo'/></testsuite></testsuites>"

// this rest server mocks the reponses of exist-db's rest api for unit testing without a running eXist instance.
let server = restify.createServer({
  name: 'mock-exist',
  version: '1.0.0'
});

// can be reached at eXist api's URI
function respond(req, res, next) {
  res.setHeader('content-type', 'application/xml')
  res.charSet('utf-8')
  res.send('<hello>world</hello>')
    next();
  }

// respond with the result of running XQsuite test
function runs(req, res, next) {
    res.setHeader('content-type', 'text/plain')
    res.charSet('utf-8')
    res.send(200, body)
    next()
}

server.get('/exist/rest/db/', respond)
server.head('/exist/rest/db/', respond)

server.get('/exist/rest/db/my-app/modules/test-runner.xq', runs)
server.head('/exist/rest/db/my-app/modules/test-runner.xq', runs)

//  do not use 8080!
server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
})
}
