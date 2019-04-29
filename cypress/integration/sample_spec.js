describe('First test', function() {
    it('Should display demo', function() {
        cy.visit('http://localhost:8080')
        cy.contains('View demo').click()

        cy.url().should('include', '/#/demo')

        cy.get('input#name').should('have.value', 'Demo')
    })

    it('Should Try app from demo', function() {
        // cy.visit('http://localhost:8080/#/demo');
        cy.contains('Try it !').click()

        cy.url().should('include', '/#/motorDesign')

        cy.get('input#name').should('have.value', '')
    })

    it('Should run computation', function() {
        cy.url().should('include', '/#/motorDesign')

        cy.contains('SI').click()
        cy.get('input#name').should('have.value', '')

        let selects = cy.get('.v-select__selections')
        selects.eq(0).click()
        cy.contains('KNDX').click()

        cy.get('.v-select__selections').eq(1).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('.v-select__selections').eq(2).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('.v-select__selections').eq(3).click()
        cy.get('div.menuable__content__active')
            .contains('Inhibited').click()

        cy.get('input#throatDiameter').type(17.39)
        cy.get('input#coreDiameter').type(20)
        cy.get('input#outerDiameter').type(69)
        cy.get('input#segmentLength').type(4)
        cy.get('input#numberOfSegment').type(115)
        cy.get('input#chamberInnerDiameter').type(75)
        cy.get('input#chamberLength').type(470)

        cy.contains('Submit').click()
    })
})
