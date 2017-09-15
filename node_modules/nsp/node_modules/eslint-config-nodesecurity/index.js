module.exports = {
  extends: ['nodesecurity/es5'],
  env: {
    es6: true
  },
  rules: {
    'hapi/no-arrowception': 2,

    'arrow-parens': [2, 'always'],
    'arrow-spacing': [2, { before: true, after: true }],
    'constructor-super': 2,
    'no-const-assign': 2,
    'no-this-before-super': 2,
    'no-var': 2,
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-template': 2
  }
};
