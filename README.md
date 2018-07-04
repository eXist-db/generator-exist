# generator-exist [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> exist app scaffolding

The generator creates directory and file scaffolds for different types of exist-db EXpath packages. Just answer the prompts about what you want to build, and a sensible directory structure with configured readmes, buildfiles, etc will be set up for you.

No more manual closing of html5 tags, or manually inserting app names into config files.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-exist using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-exist
npm install -g git://duncdrum/generator-exist.git
```

Then generate your new project: Create a new project folder and navigate to it in you CLI.

```bash
mkdir myApp
cd myApp
```

Then run the generator:
```bash
yo exist
```

Note: If you told yeoman to use Github for your new project, your project will start initialized with all files added, out of the box.

## Development
If you want to contribute another template or option, please take a look at the issue tracker. Pull request are always welcome. This generator uses `mocha` for unit testing. Please make sure to add tests when opening a PR. 

## Getting To Know Yeoman

*   Yeoman has a heart of gold.
*   Yeoman is a person with feelings and opinions, but is very easy to work with.
*   Yeoman can be too opinionated at times but is easily convinced not to be.
*   Feel free to [learn more about Yeoman](http://yeoman.io/).

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
