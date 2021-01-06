describe('Use complexe custom propellant with advance burn rate in SI', function() {
    it('Should create complexe custom propellant in SI', function() {
        cy.visit('/#/motorDesign')
        cy.contains('METRIC').click()

        cy.get('button#custom-propellant-add').click()
        cy.contains('New propellant').click()

        cy.fixture('custom-KNDX-complexe-si.json').then(propellant => {
            cy.addPropellant(propellant, 'METRIC', false)
            cy.addComplexeBurnRate(propellant.burnRateDataSet, 'METRIC')
        })
        cy.contains('Close').click()
    })

    it('Should set custom propellant in SI', function() {
        const formDatas = {
            throatDiameter: 17.39,
            outerDiameter: 69,
            coreDiameter: 20,
            segmentLength: 115,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: 'custom dextrose si',
            chamberInnerDiameter: 75,
            chamberLength: 470
        }

        cy.fillForm(formDatas, 'METRIC')

        // To check default selection of custom propellant
        cy.contains('custom dextrose si')

        // check result
        const expectedResults = {
            motorClasss: 'L1672',
            thrustTime: '2.15',
            maxThrust: '2060.22',
            totalImpulse: '3602.79',
            isp: '130.64',
            maxPressure: '59.35',
            averagePressure: '49.05',
            nozzleExitSpeed: '3.07',
            optimalExpansionRatio: '9.65'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
