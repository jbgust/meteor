describe.skip('Run Star in SI units', function() {
    it('Should submit form', function() {
        cy.visit('/#/motorDesign')

        cy.setMotorSimAdvancedConfig()

        const formDatas = {
            throatDiameter: 10,
            chamberInnerDiameter: 40,
            chamberLength: 150,
            propellantType: 'KNSU',
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            innerDiameter: 5,
            pointDiameter: 15,
            pointCount: 5,
            endsSurface: 'Exposed'
        }

        cy.fillStarForm(formDatas, 'METRIC')

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'H195',
            thrustTime: '1.02',
            maxThrust: '277.70',
            totalImpulse: '200.26',
            isp: '123.39',
            maxPressure: '26.20',
            averagePressure: '20.22',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
