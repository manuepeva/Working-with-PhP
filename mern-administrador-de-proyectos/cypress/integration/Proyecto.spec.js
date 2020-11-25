/// <reference types="cypress"/>


describe('<Administrador />', () => {
    it('<Login /> - Autenticación', () => {
        cy.visit('http://localhost:3000/')
        // Llenar el formulario
        cy.get('[data-cy=email-input]').type('usuario0000@manuel.com')
        cy.get('[data-cy=contraseña-input]').type('121212')
        cy.get('[data-cy=loginForm]').click()

    })

    it('<Proyectos /> - Validar Proyectos', () => {
        // Validación
        cy.get('[data-cy=boton-nuevo-proyecto]').click()
        cy.get('[data-cy=submit-nuevo-proyecto]').click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'El Nombre del Proyecto es Obligatorio')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'mensaje error')

    })

    it('<Proyectos /> - Creación de Proyectos', () => {
        cy.get('[data-cy=input-nuevo-proyecto]').type('Tienda Virtual')
        cy.get('[data-cy=submit-nuevo-proyecto]').click()

        // Seleccionar el proyecto
        cy.get('[data-cy=listado-proyectos] li:nth-child(1) button').click()
    })

    it('<Tareas /> - Validación y creación de tareas', () => {
        cy.get('[data-cy=submit-tarea]').click()

        cy.get('[data-cy=alerta]').should('exist')
        .invoke('text').should('eq', 'El Nombre de la Tarea es Obligatorio')
        cy.get('[data-cy=alerta]')
        .should('have.class', 'mensaje error')

        // Creación de tarea
        cy.get('[data-cy=input-tarea]').type('Definir Diseño')
        cy.get('[data-cy=submit-tarea]').click()

        cy.get('[data-cy=input-tarea]').type('Definir Fotos')
        cy.get('[data-cy=submit-tarea]').click()

        cy.get('[data-cy=input-tarea]').type('Definir Colores')
        cy.get('[data-cy=submit-tarea]').click()
    })

    it('<Tareas /> - Completar, descompletar, editar y eliminar tareas', () => {
        // Selecciona la primera tarea
        cy.get('[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]').click()
        cy.get('[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]')
        .should('have.class', 'incompleto')

        // Selecciona la primera tarea y la marca como completa
        // cy.get('[data-cy=tarea]:nth-child(1) [data-cy=tarea-completa]').click()
        // cy.get('[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]')
        // .should('have.class', 'completo')

        // Edición 
        cy.get('[data-cy=btn-editar]').click()
        cy.get('[data-cy=input-tarea]').clear().type('Definir Diseño')
        cy.get('[data-cy=submit-tarea]').click()
        // Eliminar
        cy.get('[data-cy=btn-eliminar]:nth-child(1) [data-cy=btn-eliminar]').click()
        cy.get('[data-cy=btn-eliminar]:nth-child(1)').invoke('text')
        .should('not.equal', 'Definir Diseño')

    })

})