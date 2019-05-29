describe('Run computation in imperial units', function() {

    it('Should open meteor', function() {
        cy.visit('http://localhost:8080/#/motorDesign')
        cy.get('input#name').should('have.value', '')
        cy.get('#throatDiameter').parent().contains('inch')
    })

    it('Should submit form', function() {

        cy.get('.v-select__selections')
            .as('coreSurfaces').eq(0)
            .click()
        cy.contains('KNDX').click()

        cy.get('@coreSurfaces').eq(1).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('@coreSurfaces').eq(2).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('@coreSurfaces').eq(3).click()
        cy.get('div.menuable__content__active')
            .contains('Inhibited').click()

        cy.get('input#throatDiameter')
            .type(0.68464)
            .parent()
            .contains('inch')

        cy.get('input#coreDiameter')
            .type(0.787401)
            .parent()
            .contains('inch')

        cy.get('input#outerDiameter')
            .type(2.7165354)
            .parent()
            .contains('inch')

        cy.get('input#segmentLength')
            .type(4.527559)
            .parent()
            .contains('inch')

        cy.get('input#numberOfSegment')
            .type(4)

        cy.get('input#chamberInnerDiameter')
            .type(2.95275)
            .parent()
            .contains('inch')

        cy.get('input#chamberLength')
            .type(18.503937)
            .parent()
            .contains('inch')

        cy.contains('Submit').click()
    })

    it('Should check result', () => {
        cy.get('input#motor-class')
            .should('have.value', 'L1672')

        cy.get('input#thrust-time')
            .should('have.value', '2.15')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '2060.35')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '3603.08')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '130.65')
            .parent()
            .contains('s')

        cy.get('input#max-pressure')
            .should('have.value', '860.89')
            .parent()
            .contains('psi')

        cy.get('input#average-pressure')
            .should('have.value', '711.50')
            .parent()
            .contains('psi')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '3.07')
            .parent()
            .contains('Mach')

        cy.get('span')
            .contains('Optimally designed nozzle with an expansion ratio of 9.65')
    })

    it('Should design nozzle', () => {
        cy.get('button').contains('Nozzle design').click()

        cy.get('input#convergenceAngle')
            .clear()
            .type(60)

        cy.get('input#divergenceAngle')
            .clear()
            .type(24)

        cy.get('span').contains('Convergence length:').parent().contains('1.96 inch')
        cy.get('span').contains('Divergence length:').parent().contains('3.39 inch')
        cy.get('span').contains('Nozzle exit diameter:').parent().contains('2.13 inch')
    })
})
