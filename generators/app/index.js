'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')
const prettyData = require('gulp-pretty-data')
const stripBom = require('gulp-stripbom')

// Var isodate = (new Date()).toISOString();

// Potential location for teipub defaults. see https://github.com/enquirer/enquirer/issues/15
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
      default: this.appname, // Defaults to current folder name
      required: true
    },
    {
      type: 'input',
      name: 'short',
      message: 'How should I abbreviate that?',
      default: response => {
        let short = response.title

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
      default: 'I am lazy',
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
        name: 'teipub',
        value: ['teipub', 'application']
      },
        // TODO compose with polymer-cli should work
        // {
        //   name: 'polymer',
        //   value: ['polymer', 'application']
        // },
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
      when: function (response) {
        return response.apptype[0] === 'teipub'
      },
      type: 'list',
      name: 'odd',
      message: 'Pick an odd template',
      choices: [{
        name: 'tei-c: simple Print',
        value: 'tei_simplePrint'
      }, {
        name: 'exist: teipub',
        value: 'teipublisher'
      }, {
        name: 'teipub: my tei simple',
        value: 'myteisimple'
      }, {
        name: 'teipub: letter',
        value: 'letter'
      }, {
        name: 'teipub: Deutsches Textarchiv (dta)',
        value: 'dta'
      }, {
        name: 'teipub: documentation',
        value: 'documentation'
      }, {
        name: 'teipup: beamer',
        value: 'beamer'
      }],
      default: 1
    },
    {
      when: function (response) {
        return response.apptype[0] === 'teipub'
      },
      type: 'list',
      name: 'defview',
      message: 'Users should see divisions (chapter, sections, etc) or pages by default?',
      choices: ['div', 'page'],
      default: 'div'
    },
    {
      when: function (response) {
        return response.apptype[0] === 'teipub'
      },
      type: 'list',
      name: 'index',
      message: 'The default full-text index is based on?',
      choices: ['div', 'body'],
      default: 'div'
    },
    {
      when: function (response) {
        return response.apptype[0] === 'teipub'
      },
      type: 'confirm',
      name: 'dataloc',
      message: 'Will this app use external tei data?',
      default: false
    },
    {
      when: function (response) {
        return response.dataloc
      },
      type: 'input',
      name: 'datasrc',
      message: 'What is the location of external tei data?',
      default: '/db/data/'
    },
      // TODO: [yo] Make these options meaningful
      // {
      //   type: 'checkbox',
      //   choices: ['ant', 'gulp', 'maven'],
      //   name: 'builder',
      //   message: 'How would you like to build your app?',
      //   default: 'ant'
      // },

      // Path related
    {
      type: 'input',
      name: 'defcoll',
      message: 'Will your application be deployed in the apps collection? (hit return for yes)',
      default: 'apps',
      required: true
    },
    {
      type: 'input',
      name: 'defuri',
      message: 'Will your module name begin with the default http://exist-db.org? (hit return for yes)',
      default: 'http://exist-db.org'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Pick a version number?',
      default: '1.0.0'
    },
    {
      type: 'list',
      choices: ['alpha', 'beta', 'stable', 'SNAPHOT'],
      name: 'status',
      message: 'Pick the release status',
      default: 'SNAPHOT'
    },
      // TODO: [teipup] autoanswer pre,post, setperm, (license?) see#
    {
      type: 'confirm',
      name: 'pre',
      message: 'Would you like to generate a pre-install script?',
      default: true
    },
    {
      when: function (response) {
        return response.pre
      },
      type: 'input',
      name: 'prexq',
      message: 'What should it be called?',
      default: 'pre-install.xql'
    },
    {
      type: 'confirm',
      name: 'post',
      message: 'Would you like to generate a post-install script?',
      default: 'true'
    },
    {
      when: function (response) {
        return response.post
      },
      type: 'input',
      name: 'postxq',
      message: 'What should it be called?',
      default: 'post-install.xql'
    },
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
      message: 'What is your email?',
      default: this.appemail,
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
        name: 'GPL-3.0',
        value: ['GPL-3.0', 'GPL%20v3', 'https://www.gnu.org/licenses/gpl-3.0']
      }, {
        name: 'unlicense',
        value: ['unlicense', 'unlicense', 'https://choosealicense.com/licenses/unlicense/']
      }]
    },
    {
      type: 'confirm',
      name: 'github',
      message: 'Will you host your code on GitHub?',
      default: true,
      store: true
    },
    {
      when: function (response) {
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
      when: function (response) {
        return response.setperm
      },
      type: 'input',
      name: 'owner',
      message: 'What is the owner\'s username?',
      default: 'tei'
    },
    {
      when: function (response) {
        return response.setperm
      },
      type: 'password',
      name: 'userpw',
      message: 'Please type the user\'s password',
      default: 'simple'
    },
    {
      when: function (response) {
        return response.setperm
      },
      type: 'input',
      name: 'group',
      message: 'What is the app owner\'s usergroup?',
      default: response => { return response.owner }
    },
    {
      when: function (response) {
        return response.setperm
      },
      type: 'input', // Make this checkbox
      // choices: ['read', 'write', 'execute'],
      name: 'mode',
      message: 'Please select the user\'s permissions',
      default: 'rw-rw-r--'
    },
    {
      type: 'confirm',
      name: 'atom',
      message: 'Would you like to add an atom configuration file?',
      default: true,
      store: true
    },
    {
      when: function (response) {
        return response.atom
      },
      type: 'input',
      name: 'instance',
      message: 'What is the instance\'s URI?',
      default: 'http://localhost:8080/exist',
      store: true
    },
    {
      when: function (response) {
        return response.atom
      },
      type: 'input',
      name: 'admin',
      message: 'Please provide an admin user id',
      default: 'admin',
      store: true
    },
    {
      when: function (response) {
        return response.atom
      },
      type: 'password',
      name: 'adminpw',
      message: 'What is the admin user\'s password',
      store: true
    }]

    // TODO: [yo]: js, css, gulp, funcdoc,
    // TODO: [CI] https://www.argos-ci.com, travis, appveyor
    // TODO: [gulp] https://github.com/bnjjj/generator-gulpfile-advanced

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
    })
  }

  writing () {
    this.registerTransformStream(
      stripBom({ ext: ['xml', 'odd', 'xconf'], showLog: false })
    )
    this.registerTransformStream(prettyData({
      type: 'prettify',
      extensions: {
        xconf: 'xml',
        odd: 'xml'
      }
    }))

    // Fixed items
    // library package only
    if (this.props.apptype[1] === 'library') {
      this.fs.copy(
        this.templatePath('github/.gitkeep'),
        this.destinationPath('content/.gitkeep')
      )
    }

    if (this.props.apptype[1] === 'application') {
      this.fs.copy(
        this.templatePath('img/icon.png'),
        this.destinationPath('icon.png')
      )
    }
    if (this.props.apptype[0] !== 'empty') {
      this.fs.copyTpl(
        this.templatePath('pages/error-page.html'),
        this.destinationPath('error-page.html'), {
          apptype: this.props.apptype[0]
        }
      )
      this.fs.copyTpl(
        this.templatePath('controller.xql'),
        this.destinationPath('controller.xql'), {
          apptype: this.props.apptype[0]
        }
      )
    }
    switch (this.props.apptype[0]) {
      case 'exist-design':
        this.fs.copy(
          this.templatePath('exist-design/images/**'),
          this.destinationPath('resources/images/')
        )
        break

      case 'teipub':
        this.fs.copy(
          this.templatePath('exist-teipub/modules/lib/**'),
          this.destinationPath('modules/lib/')
        )
        this.fs.copyTpl(
          this.templatePath('exist-teipub/modules/fixed/**'),
          this.destinationPath('modules/')
        )
        this.fs.copy(
          this.templatePath('exist-teipub/*.html'), this.destinationPath('')
        )
        // TODO [teipub] CSS, JS, FONT, and less via gulp & npm
        this.fs.copy(
          this.templatePath('exist-teipub/resources/**'),
          this.destinationPath('resources/')
        )
        this.fs.copy(
          this.templatePath('exist-teipub/transform/' + this.props.odd + '*'),
          this.destinationPath('transform/')
        )
        switch (this.props.odd) {
          case 'teipublisher':
            this.fs.copy(
              this.templatePath('exist-teipub/odd/tei_simplePrint.odd'),
              this.destinationPath('resources/odd/tei_simplePrint.odd')
            )
            this.fs.copy(
              this.templatePath('exist-teipub/odd/teipublisher.odd'),
              this.destinationPath('resources/odd/teipublisher.odd')
            )
            break
          case 'tei_simplePrint':
            this.fs.copy(
              this.templatePath('exist-teipub/odd/tei_simplePrint.odd'),
              this.destinationPath('resources/odd/tei_simplePrint.odd')
            )
            break
          default:
            this.fs.copy(
              this.templatePath('exist-teipub/odd/tei_simplePrint.odd'),
              this.destinationPath('resources/odd/tei_simplePrint.odd')
            )
            this.fs.copy(
              this.templatePath('exist-teipub/odd/teipublisher.odd'),
              this.destinationPath('resources/odd/teipublisher.odd')
            )
            this.fs.copy(
              this.templatePath('exist-teipub/odd/' + this.props.odd + '.odd'),
              this.destinationPath('resources/odd/' + this.props.odd + '.odd')
            )
        }
        break
      default:
      {}
    }

    // Flexible
    // Applies to all (build, expath-pkg, repo)
    this.fs.copyTpl(
      this.templatePath('build.xml'),
      this.destinationPath('build.xml'), {
        title: this.props.title,
        github: this.props.github,
        gitfiles: ', README.md, **/.git*/**'
      })

    this.fs.copyTpl(
      this.templatePath('repo.xml'),
      this.destinationPath('repo.xml'), {
        desc: this.props.desc,
        short: this.props.short,
        author: this.props.author,
        apptype: this.props.apptype[1],
        status: this.props.status,
        pre: this.props.pre,
        prexq: this.props.prexq,
        post: this.props.post,
        postxq: this.props.postxq,
        setperm: this.props.setperm,
        website: this.props.website,
        license: this.props.license[0],
        owner: this.props.owner,
        userpw: this.props.userpw,
        group: this.props.group,
        mode: this.props.mode
      })

    this.fs.copyTpl(
      this.templatePath('expath-pkg.xml'),
      this.destinationPath('expath-pkg.xml'), {
        short: this.props.short,
        defcoll: this.props.defcoll,
        defuri: this.props.defuri,
        version: this.props.version,
        desc: this.props.desc,
        apptype: this.props.apptype[0]
      })

    // Plain and exist design stuff
    if (this.props.apptype[0] !== 'empty') {
      // XQuery
      this.fs.copyTpl(
        this.templatePath('view.xql'),
        this.destinationPath('modules/view.xql'), {
          short: this.props.short,
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          apptype: this.props.apptype[0]
        })
      this.fs.copyTpl(
        this.templatePath('app.xql'),
        this.destinationPath('modules/app.xql'), {
          short: this.props.short,
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          apptype: this.props.apptype[0]
        })
      this.fs.copyTpl(
        this.templatePath('config.xqm'),
        this.destinationPath('modules/config.xqm'), {
          short: this.props.short,
          defcoll: this.props.defcoll,
          defuri: this.props.defuri,
          apptype: this.props.apptype[0],
          defview: this.props.defview,
          index: this.props.index,
          dataloc: this.props.dataloc,
          datasrc: this.props.datasrc,
          odd: this.props.odd
        })

      // Page.html
      switch (this.props.apptype[0]) {
        case 'exist-design':
          this.fs.copyTpl(
            this.templatePath('exist-design/page.html'),
            this.destinationPath('templates/page.html'), {
              title: this.props.title
            })
          break
        case 'plain':
          this.fs.copyTpl(
            this.templatePath('exist-plain/page.html'),
            this.destinationPath('templates/page.html'), {
              title: this.props.title
            })
          break
        case 'teipub':
          this.fs.copyTpl(
            this.templatePath('exist-teipub/templates/**'),
            this.destinationPath('templates/'), {
              title: this.props.title
            })
          this.fs.copyTpl(
            this.templatePath('exist-teipub/modules/pm-config.xql'),
            this.destinationPath('modules/pm-config.xql'), {
              odd: this.props.odd
            }
          )
          this.fs.copyTpl(
            this.templatePath('exist-teipub/odd/configuration.xml'),
            this.destinationPath('resources/odd/configuration.xml'), {
              odd: this.props.odd
            })
          break
        default:
        {}
      }
      if (this.props.apptype[0] !== 'teipub') {
        this.fs.copyTpl(
          this.templatePath('pages/index.html'),
          this.destinationPath('index.html'), {
            apptype: this.props.apptype[0]
          })
        this.fs.copyTpl(
          this.templatePath('style.css'),
          this.destinationPath('resources/css/style.css'), {
            apptype: this.props.apptype[0]
          })
      }
    }

    // Pre-install
    if (this.props.pre) {
      this.fs.copy(
        this.templatePath('pre-install.xql'),
        this.destinationPath(this.props.prexq)
      )
      this.fs.copyTpl(
        this.templatePath('collection.xconf'),
        this.destinationPath('collection.xconf'), {
          apptype: this.props.apptype[0],
          index: this.props.index
        })
    }
    // Post-install
    // TODO [teipub] updated xql & post partial from gitlab
    if (this.props.post) {
      this.fs.copyTpl(
        this.templatePath('post-install.xql'),
        this.destinationPath(this.props.postxq), {
          apptype: this.props.apptype[0]
        })
    }

    // Github
    if (this.props.github) {
      this.fs.copy(
        this.templatePath('github/.gitignore'),
        this.destinationPath('.gitignore')
      )
      // Is this needed how so?
      this.fs.copy(
        this.templatePath('github/.gitattributes'),
        this.destinationPath('.gitattributes')
      )
      this.fs.copy(
        this.templatePath('github/PULL_REQUEST_TEMPLATE.md'),
        this.destinationPath('.github/PULL_REQUEST_TEMPLATE.md')
      )
      // Git-flex
      this.fs.copyTpl(
        this.templatePath('github/readme.md'),
        this.destinationPath('README.md'), {
          title: this.props.title,
          desc: this.props.desc,
          version: this.props.version,
          ghuser: this.props.ghuser,
          website: this.props.website,
          author: this.props.author,
          license: this.props.license[0],
          badge: this.props.license[1],
          badgelink: this.props.license[2]
        })
      this.fs.copyTpl(
        this.templatePath('github/contributing.md'),
        this.destinationPath('.github/CONTRIBUTING.md'), {
          title: this.props.title
        })
      this.fs.copyTpl(
        this.templatePath('github/ISSUE_TEMPLATE.md'),
        this.destinationPath('.github/ISSUE_TEMPLATE.md'), {
          title: this.props.title
        })
    }

    // Atom
    if (this.props.atom) {
      this.fs.copyTpl(
        this.templatePath('.existdb.json'),
        this.destinationPath('.existdb.json'), {
          short: this.props.short,
          defcoll: this.props.defcoll,
          instance: this.props.instance,
          admin: this.props.admin,
          adminpw: this.props.adminpw
        })
    }

    const pkg = {
      name: _.snakeCase(this.props.title),
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
      repository: ''
    }

    if (this.props.github) {
      Object.assign(pkg, {
        homepage: 'https://github.com/' + this.props.ghuser + '/' + _.snakeCase(this.props.title) + '#readme'
      }, {
        bugs: 'https://github.com/' + this.props.ghuser + '/' + _.snakeCase(this.props.title) + '/issues'
      }, {
        repository: {
          type: 'git',
          url: 'https://github.com/' + this.props.ghuser + '/' + _.snakeCase(this.props.title),
          license: this.props.license[0]
        }
      })
    }

    // TODO add option to run npm init
    this.fs.writeJSON(this.destinationPath('package.json'), pkg)
  }

  install () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    })
  }

  // TODO: conditionally run polymer-cli init
  // TODO: conditionally gulp watch
  // TODO: conditionally upload / release xar
  end () {
    if (this.props.github) {
      this.spawnCommandSync('git', ['init'])
      this.spawnCommandSync('git', ['add', '--all'])
      this.spawnCommandSync('git', ['commit', '-m', '\'initial scaffolding by Yeoman\''])
    }
    this.spawnCommandSync('ant', '-q')
    console.log(yosay('I believe we\'re done here.'))
  }
}
