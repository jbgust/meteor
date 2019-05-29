describe('Use custom propellant', function() {

    it('Should set custom propellant in SI', function() {
        cy.visit('http://localhost:8080/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')
        cy.contains('SI').click()

        cy.get('button#custom-propellant-add').click()

        cy.get('div.v-toolbar__content').contains('Custom propellant')

        cy.get('input#propellantName')
            .type('custom KNSU')

        cy.get('input#cstar')
            .parent()
            .contains('m/s')

        cy.get('input#burnRateCoefficient')
            .type(8.26)

        cy.get('input#pressureExponent')
            .type(0.319)

        cy.get('input#k')
            .type(1.133)

        cy.get('input#density')
            .type(1.889)
            .parent()
            .contains('g/cm3')

        cy.get('input#molarMass')
            .type(41.98)
            .parent()
            .contains('kg/kmol')

        cy.get('input#k2ph-switch')
            .parent()
            .click()
        cy.get('input#k2ph')
            .type(1.044)

        cy.get('input#chamberTemperature-switch')
            .parent()
            .click()
        cy.get('input#chamberTemperature')
            .type(1720)

        cy.get('button').contains('Save').click()

        cy.contains('custom KNSU')

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
            .type(17.39)
            .parent()
            .contains('mm')

        cy.get('input#coreDiameter')
            .type(20)
            .parent()
            .contains('mm')

        cy.get('input#outerDiameter')
            .type(69)
            .parent()
            .contains('mm')

        cy.get('input#segmentLength')
            .type(115)
            .parent()
            .contains('mm')

        cy.get('input#numberOfSegment')
            .type(4)

        cy.get('input#chamberInnerDiameter')
            .type(75)
            .parent()
            .contains('mm')

        cy.get('input#chamberLength')
            .type(470)
            .parent()
            .contains('mm')

        cy.contains('Submit').click()

        // check result
        cy.get('input#motor-class')
            .should('have.value', 'L2174')

        cy.get('input#thrust-time')
            .should('have.value', '1.71')
            .parent()
            .contains('s')

        cy.get('input#max-thrust')
            .should('have.value', '2479.63')
            .parent()
            .contains('N')

        cy.get('input#total-impulse')
            .should('have.value', '3726.09')
            .parent()
            .contains('Ns')

        cy.get('input#specific-impulse')
            .should('have.value', '134.39')
            .parent()
            .contains('s')

        cy.get('input#max-pressure')
            .should('have.value', '70.36')
            .parent()
            .contains('MPa')

        cy.get('input#average-pressure')
            .should('have.value', '62.07')
            .parent()
            .contains('MPa')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '3.19')
            .parent()
            .contains('Mach')

        cy.get('span')
            .contains('Optimally designed nozzle with an expansion ratio of 11.71')
    })
})
