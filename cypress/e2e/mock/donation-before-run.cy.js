import { buildUrlIntercep } from '../../support/commands'

const TOKEN_STORAGE_KEY = 'accessToken-1'

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
