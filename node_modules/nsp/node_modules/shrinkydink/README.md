## shrinkydink

this is a simple utility to turn your npm-shrinkwrap.json from this:

```js
{
  "name": "sampleproject",
  "version": "1.0.0",
  "dependencies": {
    "hapi": {
      "version": "13.4.0",
      "from": "hapi@latest",
      "resolved": "https://registry.npmjs.org/hapi/-/hapi-13.4.0.tgz",
      "dependencies": {
        "accept": {
          "version": "2.1.1",
          "from": "accept@2.1.1",
          "resolved": "https://registry.npmjs.org/accept/-/accept-2.1.1.tgz"
        },
        "ammo": {
          "version": "2.0.0",
          "from": "ammo@2.0.0",
          "resolved": "https://registry.npmjs.org/ammo/-/ammo-2.0.0.tgz",
          "dependencies": {
            "hoek": {
              "version": "3.0.4",
              "from": "hoek@>=3.0.0 <4.0.0",
              "resolved": "https://registry.npmjs.org/hoek/-/hoek-3.0.4.tgz"
            }
          }
        },
        "boom": {
          "version": "3.1.3",
          "from": "boom@3.1.3",
          "resolved": "https://registry.npmjs.org/boom/-/boom-3.1.3.tgz"
        },
        "call": {
          "version": "3.0.0",
          "from": "call@3.0.0",
          "resolved": "https://registry.npmjs.org/call/-/call-3.0.0.tgz",
          "dependencies": {
            "hoek": {
              "version": "3.0.4",
              "from": "hoek@>=3.0.0 <4.0.0",
              "resolved": "https://registry.npmjs.org/hoek/-/hoek-3.0.4.tgz"
            }
          }
        },
        ...
```

to this:

```js
{
  "name": "sampleproject",
  "version": "1.0.0",
  "dependencies": {
    "hapi": {
      "version": "13.4.0",
      "dependencies": {
        "accept": {
          "version": "2.1.1"
        },
        "ammo": {
          "version": "2.0.0",
          "dependencies": {
            "hoek": {
              "version": "3.0.4"
            }
          }
        },
        "boom": {
          "version": "3.1.3"
        },
        "call": {
          "version": "3.0.0",
          "dependencies": {
            "hoek": {
              "version": "3.0.4"
            }
          }
        },
        ...
```

usage:

```shell
npm install -g shrinkydink
cd path/to/your/project
npm shrinkwrap
shrinkydink
```

options:
- `--no-git`: also remove any dependencies that were installed from a git repo
- `--blacklist <property>`: remove `property` from all dependencies, may be specified multiple times. defaults to `['from', 'resolved']`


shrinkydink can also be used programmatically by calling the exported `shrink` method:

```js
'use strict';
const Shrinkydink = require('shrinkydink');
const myShrinkwrap = require('./npm-shrinkwrap');

Shrinkydink.shrink(myShrinkwrap, { allowGit: true, blacklist: ['from', 'resolved'] });
```
