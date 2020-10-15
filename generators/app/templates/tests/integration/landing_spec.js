/* global cy */
describe('The landing page', function () {
  it('should load ', function () {
    cy.visit('/exist//<%- defcoll %>/<%- short %>/index.html')
      .get('.alert')
      .contains('app.xql')
  })

  // TODO: add mysec test
})
