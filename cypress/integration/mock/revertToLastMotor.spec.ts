function buildComputationResult(motorDescription) {
    return {
        performanceResult: {
            motorDescription: motorDescription,
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
            lowKNCorrection: false,
            grainMass: '0.081',
            safeKN: false,
            classPercentage: 90,
            portToThroatArea: '2.2',
            portToThroatAreaWarning: null
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

function buildMotorConfig(name, propellantId) {
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
            propellantId: propellantId,
            chamberLength: '150',
            throatDiameter: '10',
            chamberInnerDiameter: '40'
        }
    }
}

describe('Should revert to last motor config', () => {
    it('Revert is disabled when only one result is computed', function() {
        cy.visit('/#/motorDesign')
        cy.mockMotorList([
            buildMotorConfig('Mock motor 1', 'KNSB_FINE'),
            buildMotorConfig('Mock motor 2', 'KNSB_COARSE')])

        cy.intercept('POST', '/compute', buildComputationResult('G75'))

        cy.runSavedMotor('Mock motor 1')
        cy.get('input#motor-class')
            .should('have.value', 'G75')
        cy.get('#btnMotorRevert').should('be.disabled')
    })
    it('Revert is enable on second computation', () => {
        cy.mockMotorList([
            buildMotorConfig('Mock motor 1', 'KNSB_FINE'),
            buildMotorConfig('Mock motor 2', 'KNSB_COARSE')])

        cy.intercept('POST', '/compute', buildComputationResult('F45'))

        cy.runSavedMotor('Mock motor 2')
        cy.get('input#motor-class')
            .should('have.value', 'F45')
        cy.get('#btnMotorRevert').should('not.be.disabled')
    })
    it('Revert to first computation', () => {
        cy.get('#btnMotorRevert').click()
        cy.get('#name')
            .should('have.value', 'Mock motor 1')
        cy.get('input#motor-class')
            .should('have.value', 'G75')
    })
})
