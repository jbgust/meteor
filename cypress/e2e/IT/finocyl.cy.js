import { generateId } from '../../support/commands'

const expectedResults = {
    motorClasss: 'H215',
    thrustTime: '0.85',
    maxThrust: '393.83',
    totalImpulse: '181.61',
    isp: '126.17',
    maxPressure: '36.01',
    averagePressure: '23.71',
    nozzleExitSpeed: '2.96'
}

describe('Run Finocyl in SI units', function() {
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
            innerDiameter: 10,
            finWidth: 2.0,
            finDiameter: 20.0,
            finCount: 5,
            endsSurface: 'Exposed'
        }

        cy.fillFinocylForm(formDatas, 'METRIC')

        // Le calcul peut mettre plus de temps que le timeout sur la CI.
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000)
    })

    it('Should check result', () => {
        cy.checkPerformanceResults(expectedResults, 'METRIC')
    })

    it('Save it and run it', () => {
        cy.saveAndRunCheck('Finocyl motor_' + generateId(), expectedResults)
    })
})
