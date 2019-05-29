describe('Run computation in SI units', function() {
    it('Should open meteor from menu', function() {
        cy.visit('http://localhost:8080/#/motorDesign')

        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should submit form', function() {
        cy.url().should('include', '/#/motorDesign')

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
            .should('have.value', 'F82')

        cy.get('input#thrust-time')
            .should('have.value', '0.91')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '111.61')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '73.99')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '116.78')
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
            .should('have.value', '2.53')
            .parent()
            .contains('Mach')

        cy.get('span')
            .contains('Optimally designed nozzle with an expansion ratio of 4.00')
    })

    it('Should design nozzle', () => {
        cy.get('button').contains('Nozzle design').click()

        cy.get('input#convergenceAngle')
            .clear()
            .type(38)

        cy.get('input#divergenceAngle')
            .clear()
            .type(18)

        cy.get('span').contains('Convergence length:').parent().contains('30.49 mm')
        cy.get('span').contains('Divergence length:').parent().contains('22.09 mm')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('14.00 mm')
    })
})
