# generator-exist [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> exist app scaffolding

Let [Yeoman](http://yeoman.io) take care of creating directory and file scaffolds for different types of [exist-db](https://exist-db.org) EXpath packages. Just answer the prompts about what you want to build, and a sensible directory structure with fully configured readmes, buildfiles, etc will be set up for you.

No more manual closing of html5 tags, inserting app names into config files, or wondering if you actually increase the version number in all the places.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exist using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

### Pre-release Version
To install a pre-release version:
```bash
npm install -g yo
npm install -g git://github.com/duncdrum/generator-exist.git
```

### Official release
To install a version published to npm:
```bash
npm install -g yo
npm install -g generator-exist
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

Then run the generator:
```bash
yo exist
```

[![asciicast](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj.png)](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj)

Note: If you told yeoman to use Github for your new project, your project will start initialized with all files added, out of the box.

Some of the answers, such as username will be stored after the initial run of the generator. So you only have to type them once.

## Development
If you want to contribute another template or option, please take a look at the issue tracker. Pull request are always welcome. This generator uses `mocha` for unit testing. Please make sure to add tests when opening a PR.

## License

MIT © [Duncan Paterson](https://github.com/duncdrum)


[npm-image]: https://badge.fury.io/js/generator-exist.svg
[npm-url]: https://npmjs.org/package/generator-exist
[travis-image]: https://travis-ci.com/duncdrum/generator-exist.svg?token=qpLmm7SAUYJsXY8vZsRs&branch=master
[travis-url]: https://travis-ci.com/duncdrum/generator-exist
[daviddm-image]: https://david-dm.org/duncdrum/generator-exist.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/duncdrum/generator-exist
[coveralls-image]: https://coveralls.io/repos/duncdrum/generator-exist/badge.svg
[coveralls-url]: https://coveralls.io/r/duncdrum/generator-exist
