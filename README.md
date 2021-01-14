# generator-exist

[![NPM version][npm-image]][npm-url] ![Node.js CI](https://github.com/eXist-db/generator-exist/workflows/Node.js%20CI/badge.svg) [![semantic-release][sem-rel-img]][sem-rel-url] [![Codacy Badge][codacy-image]][codacy-url]

> exist app scaffolding

Let [Yeoman](http://yeoman.io) take care of creating directory and file scaffolds for different types of [exist-db](https://exist-db.org) EXpath packages. Just answer the prompts about what you want to build, and a sensible directory structure with fully configured readmes, buildfiles, etc will be set up for you.

No more manual closing of html5 tags, inserting app names into config files, or wondering if you actually increase the version number in all the places.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exist using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

### From GitHub

To install a pre-release version:

```bash
npm i -g yo
npm i -g git://github.com/eXist-db/generator-exist.git
```

### Official release

To install a version published to npm:

```bash
npm i -g yo
npm i -g @existdb/generator-exist
```

### From Source

Alternatively, if you have cloned this repo from GitHub. You can symlink your local clone into your global node environment. This is particularly useful during development. From inside the folder with the cloned repo:

```bash
npm install -g yo
npm i
npm link
```

## Using the Generator

Then generate your new project: Create a new project folder and navigate to it in you CLI.

```bash
mkdir myApp
cd myApp
```

Then run the generator. If you installed from source or GitHub,

```bash
yo exist
```

or if you installed from npm:

```bash
yo @existdb/exist
```

[![asciicast](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj.png)](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj)

Note: If you told yeoman to use Github for your new project, your project will start initialized with all files added, out of the box.

Some of the answers, such as username will be stored after the initial run of the generator. So you only have to type them once.

## Development

If you want to contribute another template or option, please take a look at the issue tracker. Pull request are always welcome. This generator uses `mocha` for unit testing. Please make sure to add tests when opening a PR.

This application uses [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) to determine semantic versioning of releases, please adhere to these conventions, like so:

| Commit message  | Release type |
|-----------------|--------------|
| `fix(pencil): stop graphite breaking when too much pressure applied` | Patch Release |
| `feat(pencil): add 'graphiteWidth' option` | ~~Minor~~ Feature Release |
| `perf(pencil): remove graphiteWidth option`<br/><br/>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br/>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## License

MIT © [Duncan Paterson](https://github.com/duncdrum)

[npm-image]: https://badge.fury.io/js/%40existdb%2Fgenerator-exist.svg
[npm-url]: https://www.npmjs.com/package/@existdb/generator-exist
[sem-rel-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[sem-rel-url]: https://github.com/semantic-release/semantic-release
[codacy-image]: https://api.codacy.com/project/badge/Grade/a03a4fbd291a48739e69cdd2af50df05
[codacy-url]: https://www.codacy.com/app/eXist-db/generator-exist?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=eXist-db/generator-exist&amp;utm_campaign=Badge_Grade
