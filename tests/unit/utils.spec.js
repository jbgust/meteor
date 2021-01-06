import { extractIdFromHateoasResponse, shortLabel } from '@/modules/utils'

describe('Tests Utils module', () => {
    test('Should extract entity ID from HATEOAS response', () => {
        const hateoasResponse = {
            data: {
                name: 'TEST',
                description: null,
                json: '{"k":"1","density":"1","molarMass":"1","burnRateCoefficient":"1","pressureExponent":"1","cstar":"1","burnRateDataSet":null}',
                _links: {
                    self: {
                        href: 'http://localhost:8090/propellants/229a2583-8a79-438f-a87a-b8c05bc2513a'
                    },
                    meteorPropellant: {
                        href: 'http://localhost:8090/propellants/229a2583-8a79-438f-a87a-b8c05bc2513a{?projection}',
                        templated: true
                    }
                }
            }
        }
        expect(extractIdFromHateoasResponse(hateoasResponse)).toEqual('229a2583-8a79-438f-a87a-b8c05bc2513a')
    })

    test('Should reduce label size', () => {
        // we expect 'az\ne...' and not 'az\ner...' because the max length include de \n added by the split line
        expect(shortLabel('azertyuiop', 4, 2)).toEqual('az\ne...')

        expect(shortLabel('azertyuiop', 10)).toEqual('azertyuiop')
    })
})
