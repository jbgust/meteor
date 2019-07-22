describe('Use custom propellant in SI', function() {

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

        // To check default selection of custom propellant
        cy.contains('custom KNSU')

        const formDatas = {
            throatDiameter: 17.39,
            outerDiameter: 69,
            coreDiameter: 20,
            segmentLength: 115,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'custom KNSU',
            chamberInnerDiameter: 75,
            chamberLength: 470
        }

        cy.fillForm(formDatas, 'SI')

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
            .contains('Bar')

        cy.get('input#average-pressure')
            .should('have.value', '62.07')
            .parent()
            .contains('Bar')

        cy.get('input#nozzle-exit-speed')
            .should('have.value', '3.19')
            .parent()
            .contains('Mach')

        cy.get('span')
            .contains('Optimally designed nozzle with an expansion ratio of 11.71')
    })
})
