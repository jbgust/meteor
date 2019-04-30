describe('Run computation with advanced settings', function() {

    it('Should set advanced config settings', function() {

        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()
        cy.get('input#name').should('have.value', '')

        cy.get('button').contains('settings').click()

        cy.get('label').contains('Optimal nozzle design:').click()
        cy.get('input#nozzleExpansionRatio').type(1)

        cy.get('div.v-card__title').contains('Advanced settings').parent().contains('Close').click()
    })

    it('Should fill and submit the form', function(){

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
            .type(14)
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
    })

    it('Should check result', () => {
        cy.get('input#motor-class')
            .should('have.value', 'F72')

        cy.get('input#thrust-time')
            .should('have.value', '0.91')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '95.25')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '64.90')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '102.43')
            .parent()
            .contains('s')

        cy.get('input#max-pressure')
            .should('have.value', '21.87')
            .parent()
            .contains('MPa')

        cy.get('input#average-pressure')
            .should('have.value', '16.00')
            .parent()
            .contains('MPa')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '1.00')
            .parent()
            .contains('Mach')

        cy.get('span').should('not.contain', 'Optimally designed')
    })
})
