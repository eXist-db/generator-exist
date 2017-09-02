# <%- title %>
[![AUR][license-img]][license-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]

<img src="icon.png" align="left" width="25%"/>

<%- desc %>

## Requirements
*   [exist-db](http://exist-db.org/exist/apps/homepage/index.html) version: ``3.0.4`` or greater
*   [ant](http://ant.apache.org) version: ``1.10.1`` \(for building from source\)

## Installation
1.  Download  the ``<%- title %>-<%- version %>.xar`` file from GitHub [releases](https://github.com/<%- ghuser %>/<%- title %>/releases) page.
2.  Open the [dashboard](http://localhost:8080/exist/apps/dashboard/index.html) of your eXist-db instance and click on ``package manager``.
    1.  Click on the ``add package`` symbol in the upper left corner and select the ``.xar`` file you just downloaded.
3.   You have successfully installed <%- title %> into exist.

### Building from source
1.  Download, fork or clone this GitHub repository
    1.  If there are different build targets in ``build.xml`` un-/comment the one that best suits your needs, or simply build all and pick later.
2.  Type the following into your CLI:    
```bash
cd <%- title %>
ant
```

If you see ``BUILD SUCCESSFUL`` ant has generated a ``<%- title %>-<%- version %>.xar`` file in the ``build`` folder. To install it, follow the instructions [above](#installation).



## License

<%- license %> © [<%- author %>](<%- website %>)


[license-img]: https://img.shields.io/badge/license-<%- license %>-blue.svg
[license-url]: https://choosealicense.com/licenses/<%- license %>/
[npm-image]: https://badge.fury.io/js/<%- title %>.svg
[npm-url]: https://npmjs.org/package/<%- title %>
[travis-image]: https://travis-ci.org/<%- ghuser %>/<%- title %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%- ghuser %>/<%- title %>
[daviddm-image]: https://david-dm.org/<%- ghuser %>/<%- title %>.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/<%- ghuser %>/<%- title %>
[coveralls-image]: https://coveralls.io/repos/<%- ghuser %>/<%- title %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%- ghuser %>/<%- title %>
