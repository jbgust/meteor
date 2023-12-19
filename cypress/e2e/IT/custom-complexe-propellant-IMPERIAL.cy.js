describe('Use complexe custom propellant with advance burn rate in IMPERIAL', function() {
    it('Should create complexe custom propellant in IMPERIAL', function() {
        cy.visit('/motorDesign')
        cy.contains('IMPERIAL').click()

        cy.get('button#custom-propellant-add').click()
        cy.contains('New propellant').click()

        cy.fixture('custom-KNDX-complexe-imperial.json').then(propellant => {
            cy.addPropellant(propellant, 'IMPERIAL', false)
            cy.addComplexeBurnRate(propellant.burnRateDataSet)
        })
        cy.contains('Close').click()
    })

    it('Should set custom propellant in IMPERIAL', function() {
        const formDatas = {
            throatDiameter: 0.68464,
            outerDiameter: 2.7165354,
            coreDiameter: 0.787401,
            segmentLength: 4.527559,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: 'custom dextrose imp',
            chamberInnerDiameter: 2.95275,
            chamberLength: 18.503937
        }

        cy.fillForm(formDatas, 'IMPERIAL')

        cy.contains('custom dextrose imp')
    })

    it('Should check result in IMPERIALS', () => {
        const expectedResults = {
            motorClasss: 'L1672',
            thrustTime: '2.15',
            maxThrust: '2060.25',
            totalImpulse: '3602.88',
            isp: '130.64',
            maxPressure: '860.86',
            averagePressure: '711.42',
            nozzleExitSpeed: '3.07',
            optimalExpansionRatio: '9.65'
        }

        cy.checkPerformanceResults(expectedResults, 'IMPERIAL')
    })
})
