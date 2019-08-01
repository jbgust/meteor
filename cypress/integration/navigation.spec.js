describe('Navigation check', function() {
    it('Should open meteor from menu', function() {
        cy.visit('http://localhost:8080')
        cy.get('i#btnMeteor').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should open meteor from demo page', function() {
        cy.visit('http://localhost:8080/#/demo')
        cy.contains('Try it !').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should open meteor from home page', function() {
        cy.visit('http://localhost:8080/')
        cy.get('#btnTryIt').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })
})
