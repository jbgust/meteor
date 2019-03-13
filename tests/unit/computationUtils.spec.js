import {computeNozzleLength, generateComputeHash} from "../../src/modules/computationUtils";
import {getComputeHash} from "../../src/modules/computationUtils";

describe('Nozzle length calculation (divergence and convergence length)', () => {
    test('should compute nozzle length', () => {
        // Assert divergence length (same value as SRM 2014
        expect(computeNozzleLength(31.8119348430684, 24).toFixed(2)).toBe('74.83')

        // Assert convergence length (same value as SRM 2014
        expect(computeNozzleLength(57.6014751080198, 70).toFixed(2)).toBe('41.13')
    })
})

describe('Computation hash', () => {
    test('should generate computationHash', () => {
        generateComputeHash()
        setTimeout(() => expect(getComputeHash()).not.toBeNull(), 500)
    })

    test('should use INCONNU when computationHash is not defined', () => {
        localStorage.removeItem('computationHash')
        expect(getComputeHash()).toBe('INCONNU')
    })
})
