import { computeNozzleLength } from '../../src/modules/computationUtils'

describe('Nozzle length calculation (divergence and convergence length)', () => {
    test('should compute nozzle length', () => {
        // Assert divergence length (same value as SRM 2014
        expect(computeNozzleLength(31.8119348430684, 24).toFixed(2)).toBe('74.83')

        // Assert convergence length (same value as SRM 2014
        expect(computeNozzleLength(57.6014751080198, 70).toFixed(2)).toBe('41.13')
    })
})
