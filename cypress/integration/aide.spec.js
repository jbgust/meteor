describe('Help page', function() {

    it('Go to Meteor', function() {
        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
    })

    it('Should display help content', function() {
        cy.get('i').contains('import_contacts').click()

        cy.contains("Meteor Manual")

    })

    it('Should close help', function() {
        cy.get('i').contains('close').click()

        cy.should('not.contain', 'Meteor Manual')

    })

    it('Should display help when computation failed', function() {

        cy.contains('SI').click()
        cy.get('input#name').should('have.value', '')

        cy.get('.v-select__selections')
            .as('coreSurfaces').eq(0)
            .click()
        cy.contains('KNSB (oxidizer finely milled)').click()

        cy.get('@coreSurfaces').eq(1).click()
        cy.get('div.menuable__content__active')
            .contains('Inhibited').click()

        cy.get('@coreSurfaces').eq(2).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('@coreSurfaces').eq(3).click()
        cy.get('div.menuable__content__active')
            .contains('Inhibited').click()

        cy.get('input#throatDiameter')
            .type(7)
            .parent()
            .contains('mm')

        cy.get('input#coreDiameter')
            .type(10)
            .parent()
            .contains('mm')

        cy.get('input#outerDiameter')
            .type(28)
            .parent()
            .contains('mm')

        cy.get('input#segmentLength')
            .type(80)
            .parent()
            .contains('mm')

        cy.get('input#numberOfSegment')
            .type(1)

        cy.get('input#chamberInnerDiameter')
            .type(28)
            .parent()
            .contains('mm')

        cy.get('input#chamberLength')
            .type(80)
            .parent()
            .contains('mm')

        cy.contains('Submit').click()

        cy.contains('Read documentation').click()

        cy.contains("Meteor Manual")
    })

})
