describe('Use custom propellant in IMPERIAL', function() {
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

        // To check default selection of custom propellant
        cy.contains('my propellant')

        const formDatas = {
            throatDiameter: 0.68464,
            outerDiameter: 2.7165354,
            coreDiameter: 0.787401,
            segmentLength: 4.527559,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantType: 'my propellant',
            chamberInnerDiameter: 2.95275,
            chamberLength: 18.503937
        }

        cy.fillForm(formDatas, 'IMPERIAL')
    })

    it('Should check result in IMPERIALS', () => {

        const expectedResults = {
            motorClasss: 'M1660',
            thrustTime: '3.24',
            maxThrust: '1915.97',
            totalImpulse: '5379.02',
            isp: '220.66',
            maxPressure: '874.35',
            averagePressure: '741.54',
            nozzleExitSpeed: '3.12',
            optimalExpansionRatio: '6.29'
        }

        cy.checkPerformanceResults(expectedResults, 'IMPERIAL')
    })

})
