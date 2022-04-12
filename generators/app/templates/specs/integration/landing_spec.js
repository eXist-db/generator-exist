/* global cy */
describe('The landing page', function () {
  it <%_ if (apptype == 'empty') { %>.skip <% } _%> ('should load ', function () {
    cy.visit('/exist/<%- defcoll %>/<%- short %>/index.html')
      .get('.alert')
      .contains('app.xqm')
  })

  <%_ if (mysec) { %>
  // TODO: add more mysec tests, broken upstream
  it.skip('navbar link should forward to admin page', function () {
    cy.get()
  })

  // TODO: The navbar should have uniform background color
  it.skip('navbar should render properly', function () {
    cy.get()
  })
  <% } _%> 
})
