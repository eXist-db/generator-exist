# <%- title %>
[![License][license-img]][license-url]
[![GitHub release][release-img]][release-url]
<%_ if (ci == 'travis') { -%>
[![Build Status][travis-image]][travis-url]
<%_ } else { _%>
![exist-db CI](https://github.com/<%- ghuser %>/<%- title %>/workflows/exist-db%20CI/badge.svg)
<% } -%>
[![Coverage percentage][coveralls-image]][coveralls-url]

<img src="icon.png" align="left" width="25%"/>

<%- desc %>

## Requirements
*   [exist-db](http://exist-db.org/exist/apps/homepage/index.html) version: `5.x` or greater

*   [ant](http://ant.apache.org) version: `1.10.7` \(for building from source\)
<% if (apptype == 'exist-design' || 'plain') { %>
*   [node](http://nodejs.org) version: `12.x` \(for building from source\)
<% } %>    

## Installation
1.  Download  the `<%- title %>-<%- version %>.xar` file from GitHub [releases](https://github.com/<%- ghuser %>/<%- title %>/releases) page.
2.  Open the [dashboard](http://localhost:8080/exist/apps/dashboard/index.html) of your eXist-db instance and click on `package manager`.
    1.  Click on the `add package` symbol in the upper left corner and select the `.xar` file you just downloaded.
3.  You have successfully installed <%- title %> into exist.

### Building from source
1.  Download, fork or clone this GitHub repository
2.  There are two default build targets in `build.xml`:
    *   `dev` including *all* files from the source folder including those with potentially sensitive information.
    *   `deploy` is the official release. It excludes files necessary for development but that have no effect upon deployment.
  
3.  Calling `ant`in your CLI will build both files:    
```bash
cd <%- title %>
ant
```
   1. to only build a specific target call either `dev` or `deploy` like this:
   ```bash   
   ant dev
   ```   

If you see `BUILD SUCCESSFUL` ant has generated a `<%- title %>-<%- version %>.xar` file in the `build/` folder. To install it, follow the instructions [above](#installation).

<%_ if (apptype == 'exist-design' || 'plain') { %>
## Running Tests
To run tests locally your app needs to be installed in a running exist-db instance at the default port `8080` and with the default dba user `admin` with the default empty password.

A quick way to set this up for docker users is to simply issue:
```bash
docker run -dit -p 8080:8080 existdb/existdb:release
```

After you finished installing the application, you can run the full testsuite locally.

### Unit-tests
This app uses [mochajs](https://mochajs.org) as a test-runner. To run both xquery and javascript unit-tests type:
```bash
npm test
```
### Integration-tests
This app uses [cypress](https://www.cypress.io) for integration tests, just type:

```bash
npm run cypress
```

Alternatively, use npx:
```bash
npx cypress open
```
<% } -%>

<%_ if (apptype == 'polymer') { %>
  First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

  ## Viewing Your Application

  ```bash
  polymer serve
  ```

  ## Building Your Application

  ```bash
  polymer build
  ```

  This will create builds of your application in the `build/` directory, optimized to be served in production. You can then serve the built versions by giving `polymer serve` a folder to serve from:

  ```bash
  polymer serve build/default
  ```

  ## Running Tests

  ```bash
  polymer test
  ```

  Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
<% } -%>

## Contributing
You can take a look at the [Contribution guidelines for this project](.github/CONTRIBUTING.md)

## License

<%- license %> © [<%- author %>](<%- website %>)

[license-img]: https://img.shields.io/badge/license-<%- badge %>-blue.svg
[license-url]: <%- badgelink %>
[release-img]: https://img.shields.io/badge/release-<%- version %>-green.svg
[release-url]: https://github.com/<%- ghuser %>/<%- title %>/releases/latest
<%_ if (ci == 'travis') { %>
[travis-image]: https://travis-ci.com/<%- ghuser %>/<%- title %>.svg?branch=master
[travis-url]: https://travis-ci.com/<%- ghuser %>/<%- title %>
<% } -%>
[coveralls-image]: https://coveralls.io/repos/<%- ghuser %>/<%- title %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%- ghuser %>/<%- title %>
