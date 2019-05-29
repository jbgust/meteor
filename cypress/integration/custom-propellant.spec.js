describe('Use custom propellant', function() {
    it('Should set custom propellant in IMPERIAL', function() {
        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('IMPERIAL').click()

        cy.get('button#custom-propellant-add').click()

        cy.get('div.v-toolbar__content').contains('Custom propellant')

        cy.get('input#propellantName')
            .type('my propellant')

        cy.get('input#cstar')
            .type(5468.4)
            .parent()
            .contains('feet/sec')

        cy.get('input#burnRateCoefficient')
            .type(0.0174)

        cy.get('input#pressureExponent')
            .type(0.4285)

        cy.get('input#k')
            .type(1.2768)

        cy.get('input#density')
            .type(0.06)
            .parent()
            .contains('lb/cubic inch')

        cy.get('input#molarMass')
            .type(0.45)
            .parent()
            .contains('kg/kmol')

        cy.get('button').contains('Save').click()

        cy.contains('my propellant')

        cy.get('.v-select__selections')
            .as('comboBox')

        cy.get('@comboBox').eq(1).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('@comboBox').eq(2).click()
        cy.get('div.menuable__content__active')
            .contains('Exposed').click()

        cy.get('@comboBox').eq(3).click()
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
            .should('have.value', 'M1660')

        cy.get('input#thrust-time')
            .should('have.value', '3.24')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '1915.97')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '5379.02')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '220.66')
            .parent()
            .contains('s')

        cy.get('input#max-pressure')
            .should('have.value', '874.35')
            .parent()
            .contains('psi')

        cy.get('input#average-pressure')
            .should('have.value', '741.54')
            .parent()
            .contains('psi')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '3.12')
            .parent()
            .contains('Mach')

        cy.get('span')
            .contains('Optimally designed nozzle with an expansion ratio of 6.29')
    })
})
