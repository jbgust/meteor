import { generateId } from '../../support/commands'

const currentId = generateId()
describe('Use simple custom propellant in SI', function() {
    it('Should create simple custom propellant in SI', function() {
        cy.visit('/#/motorDesign')
        cy.contains('METRIC').click()

        cy.get('button#custom-propellant-add').click()
        cy.contains('New propellant').click()

        const propellant = {
            name: `custom KNSU - ${currentId}`,
            burnRateCoefficient: 8.26,
            pressureExponent: 0.319,
            k: 1.133,
            density: 1.889,
            molarMass: 41.98,
            k2ph: 1.044,
            chamberTemperature: 1720
        }
        cy.addPropellant(propellant, 'METRIC')
        cy.contains('Close').click()
    })

    it('Should set custom propellant in SI', function() {
        cy.url().should('include', '/#/motorDesign')
        cy.contains('METRIC').click()

        const formDatas = {
            throatDiameter: 17.39,
            outerDiameter: 69,
            coreDiameter: 20,
            segmentLength: 115,
            numberOfSegment: 4,
            endsSurface: 'Exposed',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: `custom KNSU - ${currentId}`,
            chamberInnerDiameter: 75,
            chamberLength: 470
        }

        cy.fillForm(formDatas, 'METRIC')
        cy.contains(`custom KNSU - ${currentId}`)

        // check result
        const expectedResults = {
            motorClasss: 'L2174',
            thrustTime: '1.71',
            maxThrust: '2479.63',
            totalImpulse: '3726.09',
            isp: '134.39',
            maxPressure: '70.36',
            averagePressure: '62.07',
            nozzleExitSpeed: '3.19',
            optimalExpansionRatio: '11.71'
        }

        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })
})
