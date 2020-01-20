describe('Run rod and tube in SI units', function() {

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
            rodDiameter: 10,
            tubeOuterDiameter: 30,
            tubeInnerDiameter: 20,
            endsSurface: 'Inhibited'
        }

        // Flag cypress test in production
        localStorage.setItem('computationHash', 'cypress')
        cy.fillRodTubeForm(formDatas, 'METRIC')

        // Check presence of computationHash
        expect(localStorage.getItem('computationHash')).not.to.be.null

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
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
