import { buildUrlIntercep, generateId } from './commands'

Cypress.Commands.add('mockMotorList', (motors) => {
    const motorResponses = motors.map(motor => {
        const motorId = generateId()
        return {
            'name': motor.name,
            'id': motorId,
            'json': JSON.stringify(motor.config),
            'description': null,
            '_links': {
                'self': {
                    'href': `http://localhost:8090/motors/${motorId}`
                },
                'motor': {
                    'href': `http://localhost:8090/motors/{?projection}`,
                    'templated': true
                },
                'owner': {
                    'href': `http://localhost:8090/motors/${motorId}/owner`
                }
            }
        }
    })
    cy.intercept('GET', buildUrlIntercep('/motors'), {
        '_embedded': {
            'motors': motorResponses
        }
    })
})
