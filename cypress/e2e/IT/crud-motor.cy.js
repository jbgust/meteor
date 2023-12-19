import { generateId } from '../../support/commands'

const motorName = 'HollowMotorSave_' + generateId()

describe('Crud motor', () => {
    it('Should save form', () => {
        cy.visit('/motorDesign')

        const formDatas = {
            name: motorName,
            throatDiameter: 7,
            outerDiameter: 28,
            coreDiameter: 14,
            segmentLength: 80,
            numberOfSegment: 1,
            endsSurface: 'Inhibited',
            coreSurface: 'Exposed',
            outerSurface: 'Inhibited',
            propellantId: 'Sorbitol (KNSB - oxidizer finely milled)',
            chamberInnerDiameter: 28,
            chamberLength: 80
        }

        cy.fillForm(formDatas, 'METRIC', false)
        cy.saveMotor()
        cy.contains('Reset').click()
    })
    it('Should run saved motor', () => {
       cy.saveAndRunCheck(motorName, {
            motorClasss: 'F80',
            thrustTime: '0.91',
            maxThrust: '108.77',
            totalImpulse: '72.37',
            isp: '114.21',
            maxPressure: '21.86',
            averagePressure: '16.00',
            nozzleExitSpeed: '2.43',
            optimalExpansionRatio: '3.47'
        })

        cy.get('input#motor-class')
            .parent()
            .contains('81%')
    })

    it('Should update motor', () => {
        const description = 'My new description'
        cy.get('textarea#motorDescription')
            .type(description)

        cy.saveMotor()

        cy.get('#btnOpenMotor')
            .click()

        cy.contains('Rocket motors')
            .parent()
            .contains('Close')
            .click()
    })

    it('Should delete saved motor', () => {
        cy.get('#btnOpenMotor').click()

        cy.contains(motorName)
            .parent()
            .find('button')
            .eq(1)
            .click()

        cy.contains(`Delete "${motorName}"`)
            .parent()
            .find('button')
            .contains('No')
            .click()

        cy.contains(motorName)
            .parent()
            .find('button')
            .eq(1)
            .click()

        cy.contains(`Delete "${motorName}"`)
            .parent()
            .find('button')
            .contains('Yes')
            .click()

        cy.contains('Rocket motors')
            .parent()
            .contains(motorName).should('not.exist')
    })
})
