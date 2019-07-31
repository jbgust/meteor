import {
    greaterOrEqualsThanRule,
    greaterOrEqualsThanValidator, greaterThanRule, greaterThanRuleNotRequired,
    greaterThanValidator, greaterThanValidatorNotRequired, integerGreaterThanRule,
    integerValidator, numberRule,
    numberValidator,
    numberValidatorNotRequired, rangeRule, rangeValidator, requiredRule,
    requiredValidator
} from '../../src/modules/formValidationRules'

describe('Check Validators', () => {
    test('requiredValidator', () => {
        expect(requiredValidator()(null)).toBeFalsy()
        expect(requiredValidator()(undefined)).toBeFalsy()
        expect(requiredValidator()('')).toBeFalsy()

        expect(requiredValidator('KO')(null)).toBe('KO')

        expect(requiredValidator()(2)).toBeTruthy()
        expect(requiredValidator()(2.2)).toBeTruthy()
        expect(requiredValidator()('dfg')).toBeTruthy()
    })

    test('numberValidator', () => {
        expect(numberValidator()('ddfsd')).toBeFalsy()
        expect(numberValidator()()).toBeFalsy()

        expect(numberValidator('Zut !')()).toBe('Zut !')

        expect(numberValidator()(2)).toBeTruthy()
        expect(numberValidator()(3.6)).toBeTruthy()
        expect(numberValidator()('3.2')).toBeTruthy()
        expect(numberValidator()('.2')).toBeTruthy()
        expect(numberValidator()('3.')).toBeTruthy()
    })

    test('numberValidatorNotRequired', () => {
        expect(numberValidatorNotRequired()('ddfsd')).toBeFalsy()
        expect(numberValidatorNotRequired('Zut !')('sdf')).toBe('Zut !')

        expect(numberValidatorNotRequired()()).toBeTruthy()
        expect(numberValidatorNotRequired()(null)).toBeTruthy()
        expect(numberValidatorNotRequired()(undefined)).toBeTruthy()
        expect(numberValidatorNotRequired()('')).toBeTruthy()

        expect(numberValidatorNotRequired()(2)).toBeTruthy()
        expect(numberValidatorNotRequired()(3.6)).toBeTruthy()
        expect(numberValidatorNotRequired()('3.2')).toBeTruthy()
        expect(numberValidatorNotRequired()('.2')).toBeTruthy()
        expect(numberValidatorNotRequired()('3.')).toBeTruthy()
    })

    test('integerValidator', () => {
        expect(integerValidator()('ddfsd')).toBeFalsy()
        expect(integerValidator()()).toBeFalsy()

        expect(integerValidator('Zut !')()).toBe('Zut !')

        expect(integerValidator()(3.6)).toBeFalsy()
        expect(integerValidator()('3.2')).toBeFalsy()
        expect(integerValidator()('.2')).toBeFalsy()

        expect(integerValidator()(2)).toBeTruthy()
        expect(integerValidator()('2')).toBeTruthy()
        expect(integerValidator()('3.')).toBeTruthy()
    })

    test('rangeValidator', () => {
        expect(rangeValidator(1.1, 2.3)('ddfsd')).toBeFalsy()
        expect(rangeValidator(1.1, 2.3)()).toBeFalsy()

        expect(rangeValidator(1.1, 2.3, 'Zut !')(3)).toBe('Zut !')

        expect(rangeValidator(1.1, 2.3)(1.0)).toBeFalsy()
        expect(rangeValidator(1.1, 2.3)(2.4)).toBeFalsy()

        expect(rangeValidator(1.1, 2.3)('1.0')).toBeFalsy()
        expect(rangeValidator(1.1, 2.3)('2.4')).toBeFalsy()

        expect(rangeValidator(1.1, 2.3)(1.1)).toBeTruthy()
        expect(rangeValidator(1.1, 2.3)(1.8)).toBeTruthy()
        expect(rangeValidator(1.1, 2.3)(1.1)).toBeTruthy()

        expect(rangeValidator(1.1, 2.3)('1.1')).toBeTruthy()
        expect(rangeValidator(1.1, 2.3)('1.8')).toBeTruthy()
        expect(rangeValidator(1.1, 2.3)('1.1')).toBeTruthy()
    })

    test('greaterThanValidator', () => {
        expect(greaterThanValidator(1.1)('ddfsd')).toBeFalsy()
        expect(greaterThanValidator(1.1)()).toBeFalsy()

        expect(greaterThanValidator(1.1, 'Zut !')(0.5)).toBe('Zut !')

        expect(greaterThanValidator(1.1)(1.0)).toBeFalsy()
        expect(greaterThanValidator(1.1)(1.1)).toBeFalsy()

        expect(greaterThanValidator(1.1)('1.0')).toBeFalsy()
        expect(greaterThanValidator(1.1)('1.1')).toBeFalsy()

        expect(greaterThanValidator(1.1)(1.2)).toBeTruthy()
        expect(greaterThanValidator(1.1)(1.8)).toBeTruthy()

        expect(greaterThanValidator(1.1)('1.2')).toBeTruthy()
        expect(greaterThanValidator(1.1)('1.8')).toBeTruthy()
    })

    test('greaterThanValidatorNotRequired', () => {
        expect(greaterThanValidatorNotRequired(1.1)('ddfsd')).toBeFalsy()

        expect(greaterThanValidatorNotRequired(1.1, 'Zut !')(0.5)).toBe('Zut !')

        expect(greaterThanValidatorNotRequired(1.1)(1.0)).toBeFalsy()
        expect(greaterThanValidatorNotRequired(1.1)(1.1)).toBeFalsy()

        expect(greaterThanValidatorNotRequired(1.1)('1.0')).toBeFalsy()
        expect(greaterThanValidatorNotRequired(1.1)('1.1')).toBeFalsy()

        expect(greaterThanValidatorNotRequired(1.1)(1.2)).toBeTruthy()
        expect(greaterThanValidatorNotRequired(1.1)(1.8)).toBeTruthy()

        expect(greaterThanValidatorNotRequired(1.1)('1.2')).toBeTruthy()
        expect(greaterThanValidatorNotRequired(1.1)('1.8')).toBeTruthy()

        expect(greaterThanValidatorNotRequired(1.1)()).toBeTruthy()
        expect(greaterThanValidatorNotRequired(1.1)(null)).toBeTruthy()
        expect(greaterThanValidatorNotRequired(1.1)(undefined)).toBeTruthy()
        expect(greaterThanValidatorNotRequired(1.1)('')).toBeTruthy()
    })

    test('greaterOrEqualsThanValidator', () => {
        expect(greaterOrEqualsThanValidator(1.1)('ddfsd')).toBeFalsy()
        expect(greaterOrEqualsThanValidator(1.1)()).toBeFalsy()

        expect(greaterOrEqualsThanValidator(1.1, 'Zut !')(0.5)).toBe('Zut !')

        expect(greaterOrEqualsThanValidator(1.1)(1.0)).toBeFalsy()
        expect(greaterOrEqualsThanValidator(1.1)('1.0')).toBeFalsy()

        expect(greaterOrEqualsThanValidator(1.1)(1.1)).toBeTruthy()
        expect(greaterOrEqualsThanValidator(1.1)(1.8)).toBeTruthy()

        expect(greaterOrEqualsThanValidator(1.1)('1.1')).toBeTruthy()
        expect(greaterOrEqualsThanValidator(1.1)('1.8')).toBeTruthy()
    })
})

describe('Check Rules', () => {
    test('requiredRule', () => {
        expect(requiredRule.length).toBe(1)

        expect(requiredRule[0](null)).toBe('Field is required')
        expect(requiredRule[0](undefined)).toBe('Field is required')
        expect(requiredRule[0]('')).toBe('Field is required')

        expect(requiredRule[0](2)).toBeTruthy()
        expect(requiredRule[0](2.2)).toBeTruthy()
        expect(requiredRule[0]('dfg')).toBeTruthy()
    })

    test('greaterThanRuleNotRequired', () => {
        expect(greaterThanRuleNotRequired(1.1).length).toBe(2)

        expect(greaterThanRuleNotRequired(1.1)[0]('gf')).toBe('Value is not a number')

        expect(greaterThanRuleNotRequired(1.1)[1](1.1)).toBe('Value must be > 1.1')
        expect(greaterThanRuleNotRequired(1.1)[1](1.2)).toBeTruthy()
    })

    test('greaterThanRule', () => {
        expect(greaterThanRule(1.1).length).toBe(3)

        expect(greaterThanRule(1.1)[0]()).toBe('Field is required')

        expect(greaterThanRule(1.1)[1]('gf')).toBe('Value is not a number')

        expect(greaterThanRule(1.1)[2](1.1)).toBe('Value must be > 1.1')
        expect(greaterThanRule(1.1)[2](1.2)).toBeTruthy()
    })

    test('integerGreaterThanRule', () => {
        expect(integerGreaterThanRule(1).length).toBe(3)

        expect(integerGreaterThanRule(1)[0]()).toBe('Field is required')

        expect(integerGreaterThanRule(1)[1]('1.2')).toBe('Value is not a integer')

        expect(integerGreaterThanRule(1)[2](1)).toBe('Value must be > 1')
        expect(integerGreaterThanRule(1)[2](2)).toBeTruthy()
    })

    test('greaterOrEqualsThanRule', () => {
        expect(greaterOrEqualsThanRule(1.1).length).toBe(3)

        expect(greaterOrEqualsThanRule(1.1)[0]()).toBe('Field is required')

        expect(greaterOrEqualsThanRule(1.1)[1]('gf')).toBe('Value is not a number')

        expect(greaterOrEqualsThanRule(1.1)[2](1.0)).toBe('Value must be >= 1.1')
        expect(greaterOrEqualsThanRule(1.1)[2](1.2)).toBeTruthy()
    })

    test('rangeRule', () => {
        expect(rangeRule(1.1, 1.3).length).toBe(3)

        expect(rangeRule(1.1, 1.3)[0]()).toBe('Field is required')
        expect(rangeRule(1.1, 1.3)[1]('gf')).toBe('Value is not a number')
        expect(rangeRule(1.1, 1.3)[2](1.0)).toBe('Value must be in range [1.1;1.3]')

        expect(rangeRule(1.1, 1.3)[2](1.2)).toBeTruthy()
    })

    test('numberRule', () => {
        expect(numberRule(1).length).toBe(2)

        expect(numberRule(1)[0]()).toBe('Field is required')

        expect(numberRule(1)[1]('v1.2')).toBe('Value is not a number')

        expect(numberRule(1)[1]('1.2')).toBeTruthy()
        expect(numberRule(1)[1](1.2)).toBeTruthy()
        expect(numberRule(1)[1](-1.2)).toBeTruthy()
        expect(numberRule(1)[1](-.2)).toBeTruthy()
    })
})
