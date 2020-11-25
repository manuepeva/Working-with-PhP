/// <reference types="cypress"/>

describe('<Formularios />', () => {
    it('<Login /> Verificar la pantalla de inicio', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-cy=loginForm]').should('have.class','btn-primario' )

        cy.visit('http://localhost:3000/nueva-cuenta')
    })
    it('<NuevaCuenta /> - Verificar componente de nueva cuenta', () =>{
        cy.get('[data-cy=nueva-cuenta]').should('exist').invoke('text').should('equal', 'Obtener una Cuenta')
        cy.get('[data-cy=form-cuenta]').should('exist')
        cy.get('[data-cy=nombreConfirmar]').should('exist')
        cy.get('[data-cy=nombreEmail]').should('exist')
        cy.get('[data-cy=nombreContraseña]').should('exist').should('have.prop', 'type')
        .should('eq', 'password')
        cy.get('[data-cy=nombreForm]').should('exist')
        cy.get('[data-cy=submit-nueva-cuenta]').should('exist')
        .should('have.class', 'btn-primario')
        .should('have.value', 'Registrar Nueva Cuenta')
        .should('not.have.value', 'Registrarme')
        cy.get('[data-cy=volver-a-iniciar]').should('have.attr', 'href')
        .should('exist')
        .should('eq', '/')

        cy.visit('http://localhost:3000/crear-cuenta')
    })
})