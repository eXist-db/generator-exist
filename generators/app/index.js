'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const prettyData = require('gulp-pretty-data')
const stripBom = require('gulp-stripbom')

module.exports = class extends Generator {
  initializing () {
    this.props = {}
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.blue('exist-app') + ' generator!'
    ))

    const prompts = [{
      type: 'input',
      name: 'title',
      message: 'What would you like to call your exist-db application?',
      default: this.appname.toLowerCase(), // Defaults to current folder name
      validate: value => {
        const invalid = value.includes(' ')
        if (invalid) {
          return 'Please avoid spaces'
        }
        return true
      },
      required: true
    },
    {
      type: 'input',
      name: 'short',
      message: 'How should I abbreviate that?',
      default: response => {
        const short = response.title

        if (short.length > 6) {
          return short.substring(0, 6)
        }
        return short
      },
      required: true
    },
    {
      type: 'input',
      name: 'desc',
      message: 'Please add a short description?',
      default: response => { return 'My amazing ' + response.title + ' application' },
      required: true
    },
    {
      type: 'list',
      name: 'apptype',
      message: 'Pick an app template:',
      default: 0, // Aka 'exist-design'
      choices: [{
        name: 'exist-design',
        value: ['exist-design', 'application']
      },
      {
        name: 'plain',
        value: ['plain', 'application']
      },
      {
        name: 'empty',
        value: ['empty', 'application']
      },
      {
        name: 'library',
        value: ['empty', 'library']
      }]
    },
    {
      when: response => {
        return response.apptype[1] === 'application'
      },
      type: 'confirm',
      name: 'mysec',
      message: 'should your app have a secure area?',
      default: false,
      store: true
    },

    // Path related
    {
      when: response => {
        return response.apptype[1] === 'application'
      },
      type: 'input',
      name: 'defcoll',
      message: 'Will your application be deployed in the apps collection? (hit return for yes)',
      default: 'apps',
      required: true
    },
    {
      type: 'input',
      name: 'defuri',
      message: 'What should your module namespace begin with?',
      default: 'http://exist-db.org',
      validate: value => {
        if (encodeURI(value) === value) {
          return true
        }
        return 'Please select a valid URI'
      }
    },
    {
      type: 'input',
      name: 'version',
      message: 'Pick a version number?',
      default: '1.0.0'
    },
    {
      type: 'list',
      choices: ['alpha', 'beta', 'stable', 'SNAPSHOT'],
      name: 'status',
      message: 'Pick the release status',
      default: 'SNAPSHOT'
    },
    {
      type: 'checkbox',
      choices: ['ant', 'gulp', 'hybrid'],
      name: 'builder',
      message: 'How would you like to build your app?',
      default: 'ant',
      store: true
    },
    {
      type: 'confirm',
      name: 'pre',
      message: 'Would you like to generate a pre-install script?',
      default: true
    },
    {
      type: 'confirm',
      name: 'post',
      message: 'Would you like to generate a post-install script?',
      default: 'post-install.xql'
    },
    // TODO multi authors see #41
    {
      type: 'input',
      name: 'author',
      message: 'Who is the author of the application?',
      default: this.appauthor,
      store: true
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
      default: this.appemail,
      validate: value => {
        const pass = value.match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
        if (pass) {
          return true
        }
        return 'Please provide a valid email address'
      },
      store: true
    },
    {
      type: 'input',
      name: 'website',
      message: 'What is the author\'s website?',
      default: 'http://exist-db.org',
      store: true
    },
    {
      type: 'list',
      name: 'license',
      message: 'Please pick a license',
      default: 2, // Aka AGPL-3.0
      choices: [{
        name: 'Apache-2.0',
        value: ['Apache-2.0', 'Apache%202.0', 'https://opensource.org/licenses/Apache-2.0']
      }, {
        name: 'MIT',
        value: ['MIT', 'MIT', 'https://opensource.org/licenses/MIT']
      }, {
        name: 'AGPL-3.0',
        value: ['AGPL-3.0', 'AGPL%20v3', 'https://www.gnu.org/licenses/agpl-3.0']
      }, {
        name: 'LGPL-3.0',
        value: ['LGPL-3.0', 'LGPL%20v3', 'https://www.gnu.org/licenses/lgpl-3.0']
      }, {
        name: 'GPL-3.0',
        value: ['GPL-3.0', 'GPL%20v3', 'https://www.gnu.org/licenses/gpl-3.0']
      }, {
        name: 'unlicense',
        value: ['unlicense', 'unlicense', 'https://choosealicense.com/licenses/unlicense/']
      }]
    },
    // See #601
    {
      type: 'confirm',
      name: 'github',
      message: 'Will you host your code on GitHub?',
      default: true,
      store: true
    },
    {
      when: response => {
        return response.github
      },
      type: 'input',
      name: 'ghuser',
      message: 'What is your GitHub username?',
      default: this.appuser,
      store: true
    },
    {
      type: 'confirm',
      name: 'setperm',
      message: 'Would you like to assign db user roles and permissions for your app?',
      default: false
    },
    {
      when: response => {
        return response.setperm
      },
      type: 'input',
      name: 'owner',
      message: 'What is the owner\'s username?',
      default: 'tei'
    },
    {
      when: response => {
        return response.setperm
      },
      type: 'password',
      name: 'userpw',
      message: 'Please type the user\'s password',
      default: 'simple'
    },
    {
      when: response => {
        return response.setperm
      },
      type: 'input',
      name: 'group',
      message: 'What is the app owner\'s usergroup?',
      default: response => { return response.owner }
    },
    {
      when: response => {
        return response.setperm
      },
      type: 'input',
      name: 'mode',
      message: 'Please select the user\'s permissions',
      default: 'rw-rw-r--',
      validate: value => {
        const pass = value.match(/^[rwx-]{9}$/g)
        if (pass) {
          return true
        }
        return 'Must be a string of 9 unix permission flags (rwx-)'
      }
    },
    {
      type: 'list',
      choices: ['travis', 'GitHub Action'],
      name: 'ci',
      message: 'Pick a CI service provider',
      default: 'GitHub Action',
      store: true
    },
    {
      type: 'confirm',
      name: 'docker',
      message: 'Would you like to use docker for your app?',
      default: true,
      store: true
    },
    {
      when: response => {
        return response.docker
      },
      type: 'input',
      name: 'dockertag',
      message: 'Please type the docker tag you wish to use for your container.',
      default: 'release',
      store: true
    },
    // TODO add multi-stage option
    {
      type: 'confirm',
      name: 'atom',
      message: 'Would you like to add a' + chalk.grey('.existdb.json') + 'IDE config file for:' + chalk.green('atom') + ' or ' + chalk.magenta('vs-code') + '?',
      default: true,
      store: true
    },
    {
      when: response => {
        return response.atom
      },
      type: 'input',
      name: 'instance',
      message: 'What is the ' + chalk.blue('eXist') + ' instance\'s URI?',
      default: 'http://localhost:8080/exist',
      store: true
    },
    {
      when: response => {
        return response.atom
      },
      type: 'input',
      name: 'admin',
      message: 'What is user-name of the admin user?',
      default: 'admin',
      store: true
    },
    {
      when: response => {
        return response.atom
      },
      type: 'password',
      name: 'adminpw',
      message: 'What is the admin user\'s password',
      store: true
    }]

    // TODO: [yo]: js, css, gulp, funcdoc,
    // TODO: TODO: [gulp] line-o we could also extend this module https://github.com/bnjjj/generator-gulpfile-advanced

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
      this.composeWith(require.resolve('generator-license'), {
        name: this.props.author, // (optional) Owner's name
        email: this.props.email, // (optional) Owner's email
        website: this.props.website, // (optional) Owner's website
        year: (new Date()).getFullYear(), // (optional) License year (defaults to current year)
        licensePrompt: 'Pick a license, default (AGPL-3.0)', // (optional) customize license prompt text
        defaultLicense: 'AGPL-3.0', // (optional) Select a default license
        license: this.props.license[0] // (optional) Select a license, so no license prompt will happen, in case you want to handle it outside of this generator
      })
      if (this.props.name) {
        this.props.elementClassName = this.props.name.replace(/(^|-)(\w)/g, (_match, _p0, p1) => p1.toUpperCase())
      }
    })
  }

  writing () {
    // try to clean invalid xml from streams
    this.registerTransformStream(
      stripBom({
        ext: ['xml', 'odd', 'xconf'],
        showLog: false
      }))
    // minify xml first …
    this.registerTransformStream(prettyData({
      type: 'minify',
      preserveComments: true,
      extensions: {
        xconf: 'xml',
        odd: 'xml'
      }
    }))
    // … then pretty print xml
    this.registerTransformStream(prettyData({
      type: 'prettify',
      extensions: {
        xconf: 'xml',
        odd: 'xml'
      }
    }))
    // global pkgJson
    const pkgJson = {
      name: this.props.title.toLowerCase(),
      version: this.props.version,
      description: this.props.desc,
      homepage: '',
      bugs: '',
      keywords: ['exist', 'exist-db', 'xml', 'xql', 'xquery'],
      author: {
        name: this.props.author,
        email: this.props.email
      },
      license: this.props.license[0],
      scripts: {
        test: 'mocha test/mocha/ --recursive --exit && mocha test/xqs/*.js'
      },
      repository: ''
    }

    this.npmInstall(['chai'], { 'save-dev': true })
    this.npmInstall(['chai-xml'], { 'save-dev': true })
    this.npmInstall(['fs-extra'], { 'save-dev': true })
    this.npmInstall(['mocha'], { 'save-dev': true })
    this.npmInstall(['supertest'], { 'save-dev': true })
    this.npmInstall(['xmldoc'], { 'save-dev': true })
    this.npmInstall(['yeoman-assert'], { 'save-dev': true })

    // EXPATH
    // Applies to all (build, expath-pkg, repo, xqs)
    // TODO #56 html -> xhtml

    this.fs.copyTpl(
      this.templatePath('repo.xml'),
      this.destinationPath('repo.xml'), {
        apptype: this.props.apptype[1],
        author: this.props.author,
        desc: this.props.desc,
        group: this.props.group,
        license: this.props.license[0],
        mode: this.props.mode,
        owner: this.props.owner,
        post: this.props.post,
        postxq: 'post-install.xql',
        pre: this.props.pre,
        prexq: 'pre-install.xql',
        setperm: this.props.setperm,
        short: this.props.short,
        status: this.props.status,
        userpw: this.props.userpw,
        website: this.props.website
      })

    this.fs.copyTpl(
      this.templatePath('expath-pkg.xml'),
      this.destinationPath('expath-pkg.xml'), {
        apptype: this.props.apptype[0],
        defcoll: this.props.defcoll,
        defuri: this.props.defuri,
        desc: this.props.desc,
        short: this.props.short,
        version: this.props.version
      })

    // Unit Test
    this.fs.copyTpl(
      this.templatePath('tests/xqs/test-suite.xql'),
      this.destinationPath('test/xqs/test-suite.xql'), {
        apptype: this.props.apptype[0],
        author: this.props.author,
        defcoll: this.props.defcoll,
        defuri: this.props.defuri,
        short: this.props.short,
        title: this.props.title,
        version: this.props.version,
        website: this.props.website
      })
    this.fs.copyTpl(
      this.templatePath('tests/xqs/test-runner.xq'),
      this.destinationPath('test/xqs/test-runner.xq'), {
        author: this.props.author,
        defcoll: this.props.defcoll,
        defuri: this.props.defuri,
        short: this.props.short,
        title: this.props.title,
        version: this.props.version
      })

    this.fs.copy(
      this.templatePath('tests/mocha/app_spec.js'),
      this.destinationPath('test/mocha/app_spec.js')
    )

    this.fs.copyTpl(
      this.templatePath('tests/mocha/rest_spec.js'),
      this.destinationPath('test/mocha/rest_spec.js'), {
        apptype: this.props.apptype[0],
        defcoll: this.props.defcoll,
        short: this.props.short
      })

    this.fs.copyTpl(
      this.templatePath('tests/xqs/xqSuite.js'),
      this.destinationPath('test/xqs/xqSuite.js'), {
        apptype: this.props.apptype[1],
        defcoll: this.props.defcoll,
        short: this.props.short,
        version: this.props.version
      })

    // all application packages, …
    if (this.props.apptype[1] === 'application') {
      this.fs.copy(
        this.templatePath('img/icon.png'),
        this.destinationPath('icon.png')
      )
      this.fs.copy(
        this.templatePath('tests/cypress/'),
        this.destinationPath('test/cypress/')
      )

      this.fs.copy(
        this.templatePath('tests/cypress.json'),
        this.destinationPath('cypress.json')
      )

      this.fs.copy(
        this.templatePath('github/.gitkeep'),
        this.destinationPath('reports/screenshots/.gitkeep')
      )

      this.fs.copy(
        this.templatePath('github/.gitkeep'),
        this.destinationPath('reports/videos/.gitkeep')
      )

      this.fs.copyTpl(
        this.templatePath('tests/integration/landing_spec.js'),
        this.destinationPath('test/cypress/integration/landing_spec.js'), {
          apptype: this.props.apptype[0],
          defcoll: this.props.defcoll,
          desc: this.props.desc,
          mysec: this.props.mysec,
          short: this.props.short
        })

      this.npmInstall(['cypress'], { 'save-dev': true })

      Object.assign(pkgJson.scripts, {
        cypress: 'cypress run'
      })
    }
    // … except empty (flexible)
    if (this.props.apptype[0] !== 'empty') {
      this.fs.copyTpl(
        this.templatePath('pages/error-page.html'),
        this.destinationPath('error-page.html'), {
          apptype: this.props.apptype[0]
        })

      this.fs.copyTpl(
        this.templatePath('pages/index.html'),
        this.destinationPath('index.html'), {
          apptype: this.props.apptype[0]
        })
      this.fs.copyTpl(
        this.templatePath('styles/style.css'),
        this.destinationPath('resources/css/style.css'), {
          apptype: this.props.apptype[0]
        })

      this.fs.copyTpl(
        this.templatePath('collection.xconf'),
        this.destinationPath('collection.xconf'), {
          apptype: this.props.apptype[0],
          index: this.props.index
        })

      // XQuery
      this.fs.copyTpl(
        this.templatePath('xq/controller.xql'),
        this.destinationPath('controller.xql'), {
          apptype: this.props.apptype[0],
          mysec: this.props.mysec
        })

      this.fs.copyTpl(
        this.templatePath('xq/view.xql'),
        this.destinationPath('modules/view.xql'), {
          apptype: this.props.apptype[0],
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          short: this.props.short,
          version: this.props.version
        })
      this.fs.copyTpl(
        this.templatePath('xq/app.xql'),
        this.destinationPath('modules/app.xql'), {
          apptype: this.props.apptype[0],
          author: this.props.author,
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          mysec: this.props.mysec,
          short: this.props.short,
          title: this.props.title,
          version: this.props.version,
          website: this.props.website
        })
      this.fs.copyTpl(
        this.templatePath('xq/config.xqm'),
        this.destinationPath('modules/config.xqm'), {
          apptype: this.props.apptype[0],
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          defview: this.props.defview,
          index: this.props.index,
          short: this.props.short
        })
      // #36 shared-resources
      this.fs.copy(
        this.templatePath('img/exist_icon_16x16.ico'),
        this.destinationPath('resources/images/exist_icon_16x16.ico')
      )

      this.fs.copy(
        this.templatePath('js/**'),
        this.destinationPath('resources/scripts/')
      )

      this.npmInstall(['jquery@1'])
      this.npmInstall(['bootstrap@3'])

      // distinct contents (flexible)
      // see #28
      switch (this.props.apptype[0]) {
        case 'exist-design':
          this.fs.copyTpl(
            this.templatePath('exist-design/page.html'),
            this.destinationPath('templates/page.html'), {
              title: this.props.title,
              mysec: this.props.mysec
            })
          this.fs.copy(
            this.templatePath('img/exist-design/**'),
            this.destinationPath('resources/images/')
          )
          this.fs.copy(
            this.templatePath('styles/exist-2.2.css'),
            this.destinationPath('resources/styles/exist-2.2.css')
          )
          break
        case 'plain':
          this.fs.copyTpl(
            this.templatePath('exist-plain/page.html'),
            this.destinationPath('templates/page.html'), {
              title: this.props.title,
              mysec: this.props.mysec
            })
          break
        default:
      }
    }

    // Prompt based
    // Builder
    if (this.props.builder !== 'gulp') {
      this.fs.copyTpl(
        this.templatePath('builder/build.xml'),
        this.destinationPath('build.xml'), {
          apptype: this.props.apptype[0],
          builder: this.props.builder,
          desc: this.props.desc,
          docker: this.props.docker,
          dockerfiles: ', Dockerfile, .dockerignore',
          github: this.props.github,
          gitfiles: ', README.md, **/.git*/**',
          title: this.props.title
        })
    }

    switch (this.props.builder) {
      case 'ant':
        break
      case 'gulp':
        this.fs.copyTpl(
          this.templatePath('builder/gulpfile.js'),
          this.destinationPath('gulpfile.js'), {
            apptype: this.props.apptype[1]
          }
        )
        this.npmInstall(['@existdb/gulp-exist'], { 'save-dev': true })
        this.npmInstall(['@existdb/gulp-replace-tmpl'], { 'save-dev': true })
        this.npmInstall(['del'], { 'save-dev': true })
        this.npmInstall(['gulp'], { 'save-dev': true })
        this.npmInstall(['gulp-autoprefixer'], { 'save-dev': true })
        this.npmInstall(['gulp-concat'], { 'save-dev': true })
        this.npmInstall(['gulp-cssnano'], { 'save-dev': true })
        this.npmInstall(['gulp-flatmap'], { 'save-dev': true })
        this.npmInstall(['gulp-header'], { 'save-dev': true })
        this.npmInstall(['gulp-muxml'], { 'save-dev': true })
        this.npmInstall(['gulp-rename'], { 'save-dev': true })
        this.npmInstall(['gulp-sass'], { 'save-dev': true })
        this.npmInstall(['gulp-sourcemaps'], { 'save-dev': true })
        this.npmInstall(['gulp-svgmin'], { 'save-dev': true })
        this.npmInstall(['gulp-uglify'], { 'save-dev': true })
        this.npmInstall(['gulp-zip'], { 'save-dev': true })
        this.npmInstall(['lazypipe'], { 'save-dev': true })

        Object.assign(pkgJson.scripts, {
          build: 'gulp build',
          deploy: 'gulp install'
        })
        break
      default:
    }
    // Pre-install
    if (this.props.pre) {
      this.fs.copyTpl(
        this.templatePath('xq/pre-install.xql'),
        this.destinationPath('pre-install.xql'), {
          author: this.props.author,
          version: this.props.version,
          website: this.props.website
        }
      )
    }
    // Post-install
    if (this.props.post) {
      this.fs.copyTpl(
        this.templatePath('xq/post-install.xql'),
        this.destinationPath('post-install.xql'), {
          apptype: this.props.apptype[0],
          author: this.props.author,
          version: this.props.version,
          website: this.props.website
        })
    }

    // Secure area (mysec)
    if (this.props.mysec) {
      this.fs.copy(
        this.templatePath('mysec/**'),
        this.destinationPath('')
      )
      this.fs.copyTpl(
        this.templatePath('tests/integration/login-*_spec.js'),
        this.destinationPath('test/cypress/integration/'), {
          defcoll: this.props.defcoll,
          short: this.props.short
        })
    }

    // Github
    // TODO #601
    if (this.props.github) {
      this.fs.copy(
        this.templatePath('github/__gitignore__'),
        this.destinationPath('.gitignore')
      )
      // Is this needed how so?
      this.fs.copy(
        this.templatePath('github/.gitattributes'),
        this.destinationPath('.gitattributes')
      )
      this.fs.copy(
        this.templatePath('github/feature_request.md'),
        this.destinationPath('.github/ISSUE_TEMPLATE/feature_request.md')
      )
      this.fs.copy(
        this.templatePath('github/PULL_REQUEST_TEMPLATE.md'),
        this.destinationPath('.github/pull_request_template.md')
      )
      // Git-flex
      this.fs.copyTpl(
        this.templatePath('github/readme.md'),
        this.destinationPath('README.md'), {
          apptype: this.props.apptype[0],
          author: this.props.author,
          badge: this.props.license[1],
          badgelink: this.props.license[2],
          ci: this.props.ci,
          desc: this.props.desc,
          ghuser: this.props.ghuser,
          license: this.props.license[0],
          title: this.props.title,
          version: this.props.version,
          website: this.props.website
        })
      this.fs.copyTpl(
        this.templatePath('github/contributing.md'),
        this.destinationPath('.github/CONTRIBUTING.md'), {
          title: this.props.title
        })
      this.fs.copyTpl(
        this.templatePath('github/ISSUE_TEMPLATE.md'),
        this.destinationPath('.github/ISSUE_TEMPLATE/bug_report.md'), {
          title: this.props.title
        })
      // insert responses into pkgJson
      Object.assign(pkgJson, {
        homepage: 'https://github.com/' + this.props.ghuser + '/' + this.props.title.toLowerCase() + '#readme'
      }, {
        bugs: 'https://github.com/' + this.props.ghuser + '/' + this.props.title.toLowerCase() + '/issues'
      }, {
        repository: {
          type: 'git',
          url: 'https://github.com/' + this.props.ghuser + '/' + this.props.title.toLowerCase(),
          license: this.props.license[0]
        }
      })
    }

    // DOCKER
    if (this.props.docker) {
      this.fs.copy(
        this.templatePath('.dockerignore'),
        this.destinationPath('.dockerignore')
      )
      this.fs.copyTpl(
        this.templatePath('Dockerfile'),
        this.destinationPath('Dockerfile'), {
          dockertag: this.props.dockertag,
          title: this.props.title,
          version: this.props.version
        })
    }

    // Atom
    if (this.props.atom) {
      this.fs.copyTpl(
        this.templatePath('.existdb.json'),
        this.destinationPath('.existdb.json'), {
          admin: this.props.admin,
          adminpw: this.props.adminpw,
          defcoll: this.props.defcoll,
          short: this.props.short,
          instance: this.props.instance
        })
    }

    // CI
    switch (this.props.ci) {
      case 'travis':
        this.fs.copyTpl(
          this.templatePath('ci/.travis.yml'),
          this.destinationPath('.travis.yml'), {
            apptype: this.props.apptype[1]
          })
        break
      default:
        this.fs.copyTpl(
          this.templatePath('ci/exist.yml'),
          this.destinationPath('.github/workflows/exist.yml'), {
            apptype: this.props.apptype[1]
          }
        )
    }

    // Write the constructed pkgJson
    this.fs.writeJSON(this.destinationPath('package.json'), pkgJson)
  }

  install () {
    this.npmInstall()
  }

  end () {
    // TODO insert new project layout here?
    // #513 could run cypress here

    // #36 Shared-resources
    // TODO: test successful move of vendor scripts into resources
    // if (this.props.apptype[0] !== 'empty') {
    //   this.fs.copyDestination (
    //     this.destinationRoot('node_modules/bootstrap/dist/js/bootstrap.min.js'),
    //     this.destinationPath('resources/scripts/bootstrap.min.js')
    //   )
    //   this.fs.copyDestination (
    //     this.destinationRoot('node_modules/jquery/dist/jquery.min.js'),
    //     this.destinationPath('resources/scripts/jquery.min.js')
    //   )
    //   this.fs.copyDestination(
    //     this.destinationRoot('node_modules/bootstrap/dist/css/bootstrap.min.css'),
    //     this.destinationPath('resources/styles/bootstrap.min.css')
    //   )
    // }

    if (this.props.github) {
      this.spawnCommandSync('git', ['init'])
      this.spawnCommandSync('git', ['add', '--all'])
      this.spawnCommandSync('git', ['commit', '-q', '-m', '\'chore(init): scaffolding by Yeoman\''])
    }
    // TODO: [gulp] line-o make conditional on selected build tool
    this.spawnCommandSync('ant', '-q')

    console.log(yosay('I believe we\'re done here.'))
  }
}
