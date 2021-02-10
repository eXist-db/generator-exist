/* global cy */
describe('On a protected page', function () {
  it('the page should load ', function () {
    cy.visit('/exist/<%- defcoll %>/<%- short %>/admin/index.html')
      .get('.alert')
      .contains('This is a protected page.')
  })

  it('login should accept admin user', function () {
    cy.contains('Login').click()
    cy.get('.modal-content')
      .find('input[name=user]').type('admin{enter}')
    cy.get('body')
      .contains('You are now logged in.')
  })

  it('navigation bar shows the admin user is logged in', function () {
    cy.get('.navbar-right > :nth-child(1) > a')
      .contains('Hello admin')
  })

  after('logout', function () {
    cy.get(':nth-child(2) > .btn').click()
  })
})
