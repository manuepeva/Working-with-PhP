/// <reference types="cypress"/>

describe('<NuevaCuenta />', () => {
    it('<NuevaCuenta /> - Validación y Alertas', () => {
        cy.visit('http://localhost:3000/nueva-cuenta')

        cy.get('[data-cy=submit-nueva-cuenta]')
        .click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'Todos los Campos son Requeridos')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'alerta-error')

        // LLenar los formularios
        cy.get('[data-cy=nombreForm]').type('Manuel')
        cy.get('[data-cy=nombreEmail]').type('usuario0000@manuel.com')
        cy.get('[data-cy=nombreContraseña]').type('12')
        cy.get('[data-cy=nombreConfirmar]').type('12')
        cy.get('[data-cy=submit-nueva-cuenta]')
        .click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'La Contraseña debe ser al menos de seis Caracteres')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'alerta-error')

        // cy.get('[data-cy=alerta]').should('exist')
        // .invoke('text').should('eq', 'El usuario ya existe')
        // cy.get('[data-cy=alerta]')
        // .should('have.class', 'alerta-error')
        cy.get('[data-cy=nombreContraseña]').clear().type('121212')
        cy.get('[data-cy=nombreConfirmar]').clear().type('121211')
        cy.get('[data-cy=submit-nueva-cuenta]')
        .click()
        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'Ambas Contraseñas deben ser iguales')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'alerta-error')

        cy.get('[data-cy=nombreContraseña]').clear().type('121212')
        cy.get('[data-cy=nombreConfirmar]').clear().type('121212')
        cy.get('[data-cy=submit-nueva-cuenta]')
        .click()

        cy.get('[data-cy=selecciona-proyecto]').should('exist')
        .invoke('text').should('equal', 'Selecciona un Proyecto')

        cy.get('[data-cy=cerrar-sesion]').click()

        it('<NuevaCuenta /> - Revisar usuarios duplicados', () =>{
            cy.visit('http://localhost:3000/nueva-cuenta')

            cy.get('[data-cy=nombreForm]').type('Manuel')
            cy.get('[data-cy=nombreEmail]').type('usuario0000@manuel.com')
            cy.get('[data-cy=nombreContraseña]').type('121212')
            cy.get('[data-cy=nombreConfirmar]').type('121212')

            cy.get('[data-cy=submit-nueva-cuenta]').click()
        })
    })
    
})