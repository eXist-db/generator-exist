/* global cy */
describe('Secure are bad user', function () {
    it('should load ', function () {
        cy.visit('/exist/<%- defcoll %>/<%- short %>/admin/index.html')
            .get('.alert')
            .contains('This is a protected page.')
    })

    it('should fail bad user', function () {
        cy.contains('Login').click()
        cy.get('.modal-content')
            .find('input[name=user]').type('baduser{enter}')
        cy.get('body')
            .contains('This is a protected page.')
    })

    it('navbar shows current user', function () {
        cy.get('.navbar-right > :nth-child(1) > a')
            .contains('Hello Guest')
    })

    after('logout', function () {
        cy.get(':nth-child(2) > .btn').click()
    })
})