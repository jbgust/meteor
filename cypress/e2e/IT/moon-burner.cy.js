import { generateId } from '../../support/commands'

const expectedResults = {
    motorClasss: 'H102',
    thrustTime: '1.77',
    maxThrust: '191.79',
    totalImpulse: '180.10',
    isp: '115.10',
    maxPressure: '18.71',
    averagePressure: '10.36',
    nozzleExitSpeed: '2.96'
}

describe('Run moon burner in SI units', function() {

    it('Should submit form', function() {
        cy.visit('/motorDesign')

        cy.setMotorSimAdvancedConfig()

        const formDatas = {
            throatDiameter: 10,
            chamberInnerDiameter: 40,
            chamberLength: 150,
            propellantId: 'KNSU',
            segmentLength: 70,
            numberOfSegment: 2,
            outerDiameter: 30,
            coreDiameter: 10,
            coreOffset: 5,
            endsSurface: 'Inhibited'
        }

        cy.fillMoonBurnerForm(formDatas, 'METRIC')
    })

    it('Should check result', () => {
        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })

    it('Save it and run it', () => {
        cy.saveAndRunCheck('MoonBurner motor_' + generateId(), expectedResults)
    })
})
