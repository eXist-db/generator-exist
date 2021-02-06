/* global cy */
describe('On a protected pages when not logged in', function () {
  it('the page should load ', function () {
    cy.visit('/exist/<%- defcoll %>/<%- short %>/admin/index.html')
      .get('.alert')
      .contains('This is a protected page.')
  })

  it('login should fail with bad credentials', function () {
    cy.contains('Login').click()
    cy.get('.modal-content')
      .find('input[name=user]').type('baduser{enter}')
    cy.get('body')
      .contains('This is a protected page.')
  })

  it('Navigation Bar should show guest user', function () {
    cy.get('.navbar-right > :nth-child(1) > a')
      .contains('Hello Guest')
  })

  after('logout', function () {
    cy.get(':nth-child(2) > .btn').click()
  })
})
