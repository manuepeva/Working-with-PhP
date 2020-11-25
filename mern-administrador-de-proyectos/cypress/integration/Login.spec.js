/// <reference types="cypress"/>

describe('<Login />', () => {
    it('<Login /> - Validación, Alertas y Autenticar usuario', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[data-cy=loginForm]').click()

        // cy.get('[data-cy=alerta]').should('exist')
        // .invoke('text').should('eq', 'Todos los Campos son Requeridos')
        // cy.get('[data-cy=alerta]')
        // .should('have.class', 'alerta-error')
        // Probar con un usuario inexistente
        cy.get('[data-cy=email-input]').type('email@email.com')
        cy.get('[data-cy=contraseña-input]').type('123')
        cy.get('[data-cy=loginForm]').click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'El Usuario no Existe')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'alerta-error')
        // Probando un password incorrecto
        cy.get('[data-cy=email-input]').clear().type('usuario0000@manuel.com')
        cy.get('[data-cy=contraseña-input]').clear().type('123')
        cy.get('[data-cy=loginForm]').click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'El Password es incorrecto')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'alerta-error')

        // Autenticar usuario
        cy.get('[data-cy=email-input]').clear().type('usuario0000@manuel.com')
        cy.get('[data-cy=contraseña-input]').clear().type('121212')
        cy.get('[data-cy=loginForm]').click()

    })

})