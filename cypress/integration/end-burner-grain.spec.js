describe('Run end burner in SI units', function() {
    it('Should submit form', function() {
        cy.visit('/#/motorDesign')

        cy.setMotorSimAdvancedConfig()

        const formDatas = {
            throatDiameter: 6,
            chamberInnerDiameter: 40,
            chamberLength: 75,
            propellantType: 'KNSU',
            segmentLength: 70,
            outerDiameter: 30,
            holeDiameter: 10,
            holeDepth: 10
        }
        cy.fillEndBurnerForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'G9',
            thrustTime: '10.04',
            maxThrust: '33.97',
            totalImpulse: '92.36',
            isp: '106.66',
            maxPressure: '9.79',
            averagePressure: '2.74',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
