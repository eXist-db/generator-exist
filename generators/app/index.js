'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.blue('exist-app') + ' generator!'
    ));

    const prompts = [
// this needs to become subgenerators
      {
      type: 'list',
      choices: ['exist-design', 'plain-bootstrap', 'empty'],
      name: 'design',
      message: 'Which exist-db template would you like to use',
      default: 'exist-design'
    },
    // {
    //   type: 'confirm',
    //   name: 'app-lib',
    //   message: 'this would be a .xar package?',
    //   default: true
    // },

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
    },{
      type: 'input',
      name: 'uri',
      message: 'please tell me the URI of your app',
      default: ['http://exist-db/apps/', 'this.props.someAnswer.short']
    },{
      type: 'confirm',
      name: 'collection',
      message: 'will the application be deployed in the apps collection?',
      default: 'true'
    },
    // Version number comes from elsewhere
    // {
    //   type: 'input',
    //   name: 'version',
    //   message: 'what is the version number?'
    // },
    {
      type: 'list',
      choices: ['alpha', 'beta', 'release'],
      name: 'status',
      message: 'what is the release status of your app',
      default: 'None'
    },{
      type: 'confirm',
      name: 'pre-install',
      message: 'Would you like a pre-install.xql?',
      default: 'true'
    },{
      type: 'confirm',
      name: 'post-install',
      message: 'Would you like a pre-install.xql?',
      default: 'true'
    },];

    // missing prompts: atom, , js, css, git, gulp,
    // initiate and commit inside user git directory

    // Author, webpage and website from generator

    // permissions of app


    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('modules/**'),
      this.destinationPath('modules/')
    );
    this.fs.copy(
      this.templatePath('resources/images/**'),
      this.destinationPath('resources/images/'),
    );
    this.fs.copy(
      this.templatePath('collection.xconf'),
      this.destinationPath('collection.xconf')
    );
  }

  install() {
    this.installDependencies();
  }
};
