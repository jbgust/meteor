describe('Check default unit in SI', function() {
    it('Should open meteor from menu', function() {
        localStorage.removeItem('unitSelected')
        cy.visit('/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').click().parent().contains('mm')

        // check message about default unit
        cy.contains('By default you are on metric units. You can change it above.')
    })
})
