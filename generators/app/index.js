'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

var d = new Date();
var n = d.toISOString();

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
    },{
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
      default: this.appname
    },{
      type: 'input',
      name: 'short',
      message: 'How should I abbreviate that?',
      default: 'None'
    },
    // This needs shortening
    {
      type: 'list',
      choices: ['alpha', 'beta', 'stable', ''],
      name: 'status',
      message: 'What is the release status of your app',
      default: 'alpha'
    },{
      type: 'input',
      name: 'version',
      message: 'What is the version number?',
      default: '0.1'
    },{
      type: 'confirm',
      name: 'pre',
      message: 'Would you like to generate a pre-install script?',
      default: 'true'
    },{
      when: function (response) {
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
    },{
      when: function (response) {
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
    },{
      type: 'input',
      name: 'website',
      message: 'What is the website of your app?',
      default: 'http://localhost:8080/exist/'
    },{
      type: 'input',
      name: 'desc',
      message: 'Can you add a short description of the app?',
      default: this.appdescription
    },{
      type: 'confirm',
      name: 'setperm',
      message: 'Would you like to assign user roles and permissions for your app?',
      default: 'false'
    },{
      when: function (response) {
        return response.setperm;
      },
        type: 'input',
        name: 'owner',
        message: 'What\'s the owner\'s username?',
        default: 'guest'
      },{
        when: function (response) {
          return response.setperm;
        },
        type: 'password',
        name: 'userpw',
        message: 'Please type the user\'s password',
        default: 'guest'
      },{
        when: function (response) {
          return response.setperm;
        },
        type: 'input',
        name: 'group',
        message: 'What\'s the owner\'s usergroup?',
        default: 'guest'
      },{
        when: function (response) {
          return response.setperm;
        },
        type: 'input', // make this checkbox
        // choices: ['read', 'write', 'execute'],
        name: 'mode',
        message: 'Please select the user\'s permissions',
        default: 'rw-rw-r--'
      },


  ];

    // missing prompts: atom, ,js, css, git, gulp, funcdoc,
    // initiate and commit inside user git directory




    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('exist-design/modules/**'),
      this.destinationPath('modules/')
    );
    this.fs.copy(
      this.templatePath('exist-design/resources/images/**'),
      this.destinationPath('resources/images/'),
    );
    this.fs.copy(
      this.templatePath('exist-design/collection.xconf'),
      this.destinationPath('collection.xconf')
    );

    // The basics: build, expath-pkg, and repo.
    this.fs.copyTpl(
      this.templatePath('build.xml'),
      this.destinationPath('build.xml'),
      {'title': this.props.title}
    );
    this.fs.copyTpl(
      this.templatePath('repo.xml'),
      this.destinationPath('repo.xml'),
      {
        'desc': this.props.desc,
        'short': this.props.short,
        'author': this.props.author,
        'apptype': this.props.apptype,
        'status': this.props.status,
        'pre':this.props.pre,
        'prexq': this.props.prexq,
        'post': this.props.post,
        'postxq': this.props.postxq,
        'setperm': this.props.setperm,
        'website': this.props.website,
        'owner': this.props.owner,
        'group': this.props.group,
        'mode': this.props.mode,
        'moment': n
      });
    this.fs.copyTpl(
      this.templatePath('expath-pkg.xml'),
      this.destinationPath('expath-pkg.xml'),
      {
        'short': this.props.short,
        'defcoll': this.props.defcoll,
        'defuri': this.props.defuri,
        'version': this.props.version,
        'desc': this.props.desc
      });

    // html (with exist templating)
    this.fs.copyTpl(
      this.templatePath('exist-design/templates/page.html'),
      this.destinationPath('templates/page.html'),
      {'title': this.props.title}
    )}

  install() {
    this.installDependencies();
  }
};
