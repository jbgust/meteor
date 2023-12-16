import { generateId } from '../../support/commands'

const expectedResults = {
    motorClasss: 'H75',
    thrustTime: '2.16',
    maxThrust: '131.50',
    totalImpulse: '162.11',
    isp: '111.01',
    maxPressure: '13.49',
    averagePressure: '7.85',
    nozzleExitSpeed: '2.96'
}

describe('Run C slot in SI units', function() {

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
            outerDiameter: 30,
            coreDiameter: 10,
            slotWidth: 5,
            slotDepth: 15,
            slotOffset: 7,
            endsSurface: 'Inhibited'
        }
        cy.fillCSlotForm(formDatas, 'METRIC')

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        cy.wait(5000)
    })

    it('Should check result', () => {
        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })

    it('Save it and run it', () => {
        cy.saveAndRunCheck('Cslot motor_' + generateId(), expectedResults)
    })
})
