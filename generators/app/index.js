'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

var d = new Date();
var isodate = d.toISOString();

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.blue('exist-app') + ' generator!'
    ));

    const prompts = [
      //   {
      //   type: 'list',
      //   choices: ['exist-design', 'plain', 'teipub', 'empty'],
      //   name: 'design',
      //   message: 'Which exist-db template would you like to use',
      //   default: 'exist-design'
      // },
      {
        type: 'checkbox',
        choices: ['application', 'library'],
        name: 'apptype',
        message: 'Please choose the type of project?',
        default: 'application'
      },

      // Path related
      {
        type: 'input',
        name: 'defcoll',
        message: 'Will your application be deployed in the apps collection? (hit return for yes)',
        default: 'apps'
      }, {
        type: 'input',
        name: 'defuri',
        message: 'Will your module name begin with the default http://exist-db.org? (hit return for yes)',
        default: 'http://exist-db.org'
      },
      // name related
      {
        type: 'input',
        name: 'title',
        message: 'What would you like to call your exist-db application?',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'short',
        message: 'How should I abbreviate that?',
        default: 'None' // use substring of this.props.title
      },
      // This needs shortening
      {
        type: 'list',
        choices: ['alpha', 'beta', 'stable', ''],
        name: 'status',
        message: 'What is the release status of your app',
        default: 'alpha'
      }, {
        type: 'input',
        name: 'version',
        message: 'What is the version number?',
        default: '0.1'
      }, {
        type: 'confirm',
        name: 'pre',
        message: 'Would you like to generate a pre-install script?',
        default: 'true'
      }, {
        when: function(response) {
          return response.pre;
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
      }, {
        when: function(response) {
          return response.post;
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
      }, {
        type: 'input',
        name: 'website',
        message: 'What is the author\'s website?',
        default: 'http://exist-db.org',
        store: true
      }, {
        type: 'input',
        name: 'desc',
        message: 'Can you add a short description of the app?',
        default: this.appdescription
      }, {
        type: 'confirm',
        name: 'setperm',
        message: 'Would you like to assign user roles and permissions for your app?',
        default: 'false'
      }, {
        when: function(response) {
          return response.setperm;
        },
        type: 'input',
        name: 'owner',
        message: 'What\'s the owner\'s username?',
        default: 'guest'
      }, {
        when: function(response) {
          return response.setperm;
        },
        type: 'password',
        name: 'userpw',
        message: 'Please type the user\'s password',
        default: 'guest'
      }, {
        when: function(response) {
          return response.setperm;
        },
        type: 'input',
        name: 'group',
        message: 'What\'s the owner\'s usergroup?',
        default: 'guest'
      }, {
        when: function(response) {
          return response.setperm;
        },
        type: 'input', // make this checkbox
        // choices: ['read', 'write', 'execute'],
        name: 'mode',
        message: 'Please select the user\'s permissions',
        default: 'rw-rw-r--'
      },


    ];

    //TODO: missing prompts: atom, ,js, css, git, gulp, funcdoc,
    // initiate and commit inside user git directory
    //TODO: Check out https://www.argos-ci.com, travis, appveyor




    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // fixed
    this.fs.copy(
      this.templatePath('exist-design/resources/images/**'),
      this.destinationPath('resources/images/'),
    );
    this.fs.copy(
      this.templatePath('exist-design/resources/css/**'),
      this.destinationPath('resources/css/'),
    );
    this.fs.copy(
      this.templatePath('collection.xconf'),
      this.destinationPath('collection.xconf')
    );
    this.fs.copy(
      this.templatePath('exist-design/controller.xql'),
      this.destinationPath('controller.xql')
    );
    this.fs.copy(
      this.templatePath('exist-design/index.html'),
      this.destinationPath('index.html')
    );
    this.fs.copy(
      this.templatePath('exist-design/error-page.html'),
      this.destinationPath('error-page.html')
    );

    if (this.props.pre) {
      this.fs.copy(
        this.templatePath('pre-install.xql'),
        this.destinationPath(this.props.prexq)
      )
    };

    if (this.props.post) {
      this.fs.copy(
        this.templatePath('post-install.xql'),
        this.destinationPath(this.props.postxq)
      )
    };

    // flexible

    // The basics: build, expath-pkg, and repo.
    this.fs.copyTpl(
      this.templatePath('build.xml'),
      this.destinationPath('build.xml'), {
        'title': this.props.title
      }
    );
    this.fs.copyTpl(
      this.templatePath('repo.xml'),
      this.destinationPath('repo.xml'), {
        'desc': this.props.desc,
        'short': this.props.short,
        'author': this.props.author,
        'apptype': this.props.apptype,
        'status': this.props.status,
        'pre': this.props.pre,
        'prexq': this.props.prexq,
        'post': this.props.post,
        'postxq': this.props.postxq,
        'setperm': this.props.setperm,
        'website': this.props.website,
        'owner': this.props.owner,
        'userpw': this.props.userpw,
        'group': this.props.group,
        'mode': this.props.mode
      });
    this.fs.copyTpl(
      this.templatePath('expath-pkg.xml'),
      this.destinationPath('expath-pkg.xml'), {
        'short': this.props.short,
        'defcoll': this.props.defcoll,
        'defuri': this.props.defuri,
        'version': this.props.version,
        'desc': this.props.desc
      });

    // modules (app, view, config)
    this.fs.copyTpl(
      this.templatePath('modules/view.xql'),
      this.destinationPath('modules/view.xql'), {
        'short': this.props.short,
        'defcoll': this.props.defcoll,
        'defuri': this.props.defuri
      });
    this.fs.copyTpl(
      this.templatePath('modules/app.xql'),
      this.destinationPath('modules/app.xql'), {
        'short': this.props.short,
        'defcoll': this.props.defcoll,
        'defuri': this.props.defuri
      });
    this.fs.copyTpl(
      this.templatePath('modules/config.xqm'),
      this.destinationPath('modules/config.xqm'), {
        'short': this.props.short,
        'defcoll': this.props.defcoll,
        'defuri': this.props.defuri
      });

    // html (with exist templating)
    this.fs.copyTpl(
      this.templatePath('exist-design/templates/page.html'),
      this.destinationPath('templates/page.html'), {
        'title': this.props.title
      }
    )
  }


  install() {
    this.installDependencies();
  }
};
