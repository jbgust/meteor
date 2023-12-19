function buildComputationResult(portToThroatArea, portToThroatAreaWarning) {
    return {
        performanceResult: {
            motorDescription: 'Z112',
            maxThrust: '213.14',
            totalImpulse: '151.99',
            specificImpulse: '191.90',
            maxPressure: '39.64',
            thrustTime: '1.36',
            optimalDesign: true,
            nozzleExitDiameter: '15.53',
            exitSpeedInitial: '2.66',
            averagePressure: '21.10',
            convergenceCrossSectionDiameter: 21.0,
            divergenceCrossSectionDiameter: 8.529875156696763,
            optimalNozzleExpansionRatio: '4.92',
            lowKNCorrection: true,
            grainMass: '0.081',
            safeKN: true,
            classPercentage: 90,
            portToThroatArea: portToThroatArea,
            portToThroatAreaWarning: portToThroatAreaWarning
        },
        motorParameters: [
            {
                x: 0.0,
                y: 0.0,
                kn: 45.7143,
                p: 0.0,
                m: 0.0
            },
            {
                x: 0.0095,
                y: 210.9606,
                kn: 46.372,
                p: 39.2555,
                m: 0.1712
            }
        ]
    }
}

function buildMotorConfig(name) {
    return {
        name: name,
        config: {
            version: 3,
            grainType: 'HOLLOW',
            extraConfig: {
                densityRatio: '0.96',
                nozzleEfficiency: 0.85,
                optimalNozzleDesign: false,
                ambiantPressureInMPa: 0.101,
                nozzleExpansionRatio: '8',
                combustionEfficiencyRatio: '0.97',
                nozzleErosionInMillimeter: 0,
                erosiveBurningAreaRatioThreshold: 6,
                erosiveBurningVelocityCoefficient: 0
            },
            grainConfig: {
                outerDiameter: 28,
                coreDiameter: 10,
                segmentLength: 80,
                numberOfSegment: 1,
                outerSurface: 'INHIBITED',
                endsSurface: 'INHIBITED',
                coreSurface: 'EXPOSED'
            },
            measureUnit: 'SI',
            nozzleDesign: {
                divergenceAngle: 24,
                convergenceAngle: 60
            },
            propellantId: 'KNSB_FINE',
            chamberLength: '150',
            throatDiameter: '10',
            chamberInnerDiameter: '40'
        }
    }
}

// TODO : marche en local mais plus sur la CI
describe.skip('Display computationWarning', function() {
    it('Display port-to-throat danger', function() {
        // fill form
        cy.visit('/motorDesign')
        cy.mockMotorList([buildMotorConfig('Mock motor')])

        cy.intercept('POST', '/compute', buildComputationResult('1.00', 'DANGER'))
        cy.runSavedMotor('Mock motor')

        cy.get('p')
            .contains('Your port-to-throat ratio is 1.00, it can be a problem')
            .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('Display port-to-throat warning', function() {
        cy.intercept('POST', '/compute', buildComputationResult('1.50', 'WARNING'))
        cy.contains('Submit').click()
        cy.get('p')
            .contains('Your port-to-throat ratio is 1.50, it can be a problem')
            .should('have.css', 'color', 'rgb(255, 165, 0)')
    })
})
