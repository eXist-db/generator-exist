'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.blue('generator-exist') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'GitHub',
      message: 'will your app live on GitHub',
      default: true
    },{
      type: 'confirm',
      name: 'atom',
      message: 'will you use atom for development?',
      default: true
    },{
      type: 'list',
      choices: ['less', 'sass', 'plain'],
      name: 'stylesheet',
      message: 'select how your stylesheets should be generated',
      default: 'None'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    this.fs.copy(
      this.templatePath('yo-exist/modules/**'),
      this.destinationPath('modules/')
    );
    this.fs.copy(
      this.templatePath('yo-exist/resources/**'),
      this.destinationPath('resources/'),
    );
    this.fs.copy(
      this.templatePath('yo-exist/collection.xconf'),
      this.destinationPath('collection.xconf')
    );
  }

  install() {
    this.installDependencies();
  }
};
