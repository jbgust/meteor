import { TOKEN_STORAGE_KEY } from '../../../src/store/modules/authentication'

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

describe('Show Donation popup before run', function() {
    it('Should open meteor from menu', () => {
        // Non donator token
        localStorage.setItem(TOKEN_STORAGE_KEY, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZAbWV0ZW9yLmZyIiwiaWF0IjoxNjEzNTU3NDQ3LCJleHAiOjE2MTM1NjEwNDcsImRvbmF0b3IiOmZhbHNlfQ.2I0V8u7OP2fIZcd3lh8qKxlNqBuxba1nxGCRghn9-hE2bfoW8l-yKf1GDcxa9yMFtzcRE0AJC2zYZSgs7brWRg')
        cy.intercept('GET', '/propellants', [])
        cy.intercept('POST', '/compute', buildComputationResult())

        cy.visit('/#/motorDesign')

        cy.url().should('include', '/#/motorDesign')

        const formDatas = {
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: 'KNSB (oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC')

        // should show donation page
        cy.contains('Support Meteor with donation')
        cy.contains('Later', { timeout: 8000 }).click()

        cy.get('input#motor-class')
            .should('have.value', 'Z112')
    })
})
