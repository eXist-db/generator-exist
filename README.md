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

Then run the generator:
-   If you installed from a fork or from GitHub.

    ```bash
    yo exist
    ```

-   If you installed from npm or from a clone of this repo.

    ```bash
    yo @existdb/exist
    ```

If you are unsure about which command is right simply run `yo` to see the list of currently installed generators.

[![asciicast](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj.png)](https://asciinema.org/a/MqB6TyzdyBJImItHLsfC99Ufj)

Note: If you told yeoman to use Github for your new project, your project will start initialized with all files added, out of the box.

Some of the answers, such as username will be stored after the initial run of the generator. So you only have to type them once.

### The Scaffold

The generator creates sensible default structures for `expath` packages for exist-db, which includes default folders for `xquery` code, meta-data files, `html`, etc. modelled on eXide's package generation scripts. In addition there are optional features such as `dockerfile`, CI scripts, github templates, secure area, … depending on the options selected by the user. The idea is that if you select e.g. to include a secure area in your application from the start, the files will contain the necessary parts, after the intial run of the generator. Saving you from having to manualy add sections, or repeatedly providing the same information over and over agian. There are 4 basic app types.

-   exist-design
-   plain
-   empty
-   xquery library

Since if would be impractical to go through all possible combinations of option here are some sample scaffolds created with the generator.

#### exist-design (with. secure area selected)

```shell
├── Dockerfile
├── LICENSE
├── README.md
├── admin
│   ├── controller.xq
│   ├── index.html
│   └── security.html
├── build
│   ├── exide_demo-1.0.0-dev.xar
│   └── exide_demo-1.0.0.xar
├── build.xml
├── collection.xconf
├── controller.xq
├── cypress.json
├── error-page.html
├── expath-pkg.xml
├── icon.png
├── index.html
├── modules
│   ├── app.xqm
│   ├── config.xqm
│   └── view.xql
├── node_modules
│   └── pruned …
├── package-lock.json
├── package.json
├── post-install.xq
├── pre-install.xq
├── repo.xml
├── reports
│   ├── screenshots
│   └── videos
├── resources
│   ├── css
│   │   └── style.css
│   └── images
│       ├── bgmenu.gif
│       ├── bgmenuhi.gif
│       ├── body-base.gif
│       ├── body.gif
│       ├── bold.gif
│       ├── code.gif
│       ├── delete-icon.png
│       ├── existdb.png
│       ├── glyphicons-halflings.png
│       ├── grey-box-bot.gif
│       ├── grey-box-rpt.gif
│       ├── grey-box-top.gif
│       ├── header.gif
│       ├── horizontal.gif
│       ├── italic.gif
│       ├── nav-dropdown.gif
│       ├── nav-dropdown.png
│       ├── nav.gif
│       └── page-edit-icon.png
├── templates
│   ├── login-panel.html
│   └── page.html
└── test
    ├── cypress
    │   ├── fixtures
    │   │   └── example.json
    │   ├── integration
    │   │   ├── landing_spec.js
    │   │   ├── login-fail_spec.js
    │   │   └── login-ok_spec.js
    │   ├── plugins
    │   │   └── index.js
    │   └── support
    │       ├── commands.js
    │       └── index.js
    ├── mocha
    │   ├── app_spec.js
    │   └── rest_spec.js
    └── xqs
        ├── test-runner.xq
        ├── test-suite.xqm
        └── xqSuite.js
```

#### plain (with most options)

```shell
├── LICENSE
├── README.md
├── build
│   ├── plain_demo-1.0.0-dev.xar
│   └── plain_demo-1.0.0.xar
├── build.xml
├── collection.xconf
├── controller.xq
├── cypress.json
├── error-page.html
├── expath-pkg.xml
├── icon.png
├── index.html
├── modules
│   ├── app.xqm
│   ├── config.xqm
│   └── view.xql
├── node_modules
│   └── pruned …
├── package-lock.json
├── package.json
├── post-install.xq
├── pre-install.xq
├── repo.xml
├── reports
│   ├── screenshots
│   └── videos
├── resources
│   └── css
│       └── style.css
├── templates
│   └── page.html
└── test
    ├── cypress
    │   ├── fixtures
    │   │   └── example.json
    │   ├── integration
    │   │   └── landing_spec.js
    │   ├── plugins
    │   │   └── index.js
    │   └── support
    │       ├── commands.js
    │       └── index.js
    ├── mocha
    │   ├── app_spec.js
    │   └── rest_spec.js
    └── xqs
        ├── test-runner.xq
        ├── test-suite.xqm
        └── xqSuite.js
```

#### empty (without extras)

```shell
├── LICENSE
├── build
│   ├── empty_demo-1.0.0-dev.xar
│   └── empty_demo-1.0.0.xar
├── build.xml
├── cypress.json
├── expath-pkg.xml
├── icon.png
├── node_modules
│   └── pruned …
├── package-lock.json
├── package.json
├── repo.xml
├── reports
│   ├── screenshots
│   └── videos
└── test
    ├── cypress
    │   ├── fixtures
    │   │   └── example.json
    │   ├── integration
    │   │   └── landing_spec.js
    │   ├── plugins
    │   │   └── index.js
    │   └── support
    │       ├── commands.js
    │       └── index.js
    ├── mocha
    │   ├── app_spec.js
    │   └── rest_spec.js
    └── xqs
        ├── test-runner.xq
        ├── test-suite.xqm
        └── xqSuite.js
```

#### xquery library

```shell
├── LICENSE
├── README.md
├── build
│   ├── lib_demo-1.0.0-dev.xar
│   └── lib_demo-1.0.0.xar
├── build.xml
├── expath-pkg.xml
├── node_modules
│   └── pruned …
├── package-lock.json
├── package.json
├── post-install.xq
├── pre-install.xq
├── repo.xml
└── test
    ├── mocha
    │   ├── app_spec.js
    │   └── rest_spec.js
    └── xqs
        ├── test-runner.xq
        ├── test-suite.xqm
        └── xqSuite.js
```

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
[codacy-image]: https://api.codacy.com/project/badge/Grade/340ad1d77d624bcf8edf036c181d4459
[codacy-url]: https://app.codacy.com/gh/eXist-db/generator-exist?utm_source=github.com&utm_medium=referral&utm_content=eXist-db/generator-exist&utm_campaign=Badge_Grade_Settings
