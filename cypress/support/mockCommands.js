Cypress.Commands.add('mockMotorList', (motor, motorName = 'Mock motor') => {
    cy.intercept('GET', '/motors', {
        '_embedded': {
            'motors': [{
                'name': motorName,
                'id': '123456',
                'json': JSON.stringify(motor),
                'description': null,
                '_links': {
                    'self': {
                        'href': 'http://localhost:8090/motors/123456'
                    },
                    'motor': {
                        'href': 'http://localhost:8090/motors/123456{?projection}',
                        'templated': true
                    },
                    'owner': {
                        'href': 'http://localhost:8090/motors/123456/owner'
                    }
                }
            }]
        }
    })
})
