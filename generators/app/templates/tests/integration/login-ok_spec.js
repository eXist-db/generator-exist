/* global cy */
describe('Secure area login success', function () {
    it('should load ', function () {
        cy.visit('/exist/<%- defcoll %>/<%- short %>/admin/index.html')
            .get('.alert')
            .contains('This is a protected page.')
    })

    it('should accept admin user', function () {
        cy.contains('Login').click()
        cy.get('.modal-content')
            .find('input[name=user]').type('admin{enter}')
        cy.get('body')
            .contains('You are now logged in.')
    })

    it('navbar shows current user', function () {
        cy.get('.navbar-right > :nth-child(1) > a')
            .contains('Hello admin')
    })

    after('logout', function () {
        cy.get(':nth-child(2) > .btn').click()
    })
})