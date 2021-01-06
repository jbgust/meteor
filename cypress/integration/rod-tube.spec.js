describe('Run rod and tube in SI units', function() {

    it('Should submit form', function() {
        cy.visit('/#/motorDesign')

        cy.setMotorSimAdvancedConfig()

        const formDatas = {
            throatDiameter: 10,
            chamberInnerDiameter: 40,
            chamberLength: 150,
            propellantId: 'KNSU',
            segmentLength: 70,
            numberOfSegment: 2,
            rodDiameter: 10,
            tubeOuterDiameter: 30,
            tubeInnerDiameter: 20,
            endsSurface: 'Inhibited'
        }
        cy.fillRodTubeForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        const expectedResults = {
            motorClasss: 'G348',
            thrustTime: '0.43',
            maxThrust: '366.50',
            totalImpulse: '149.35',
            isp: '127.30',
            maxPressure: '33.73',
            averagePressure: '32.01',
            nozzleExitSpeed: '2.96'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
