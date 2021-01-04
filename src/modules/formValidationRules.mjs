// Validators
export function requiredValidator(valueIfFalse = false) {
    return fieldValue => (fieldValue === 0 || !!fieldValue) || valueIfFalse
}

export function numberValidator(valueIfFalse = false) {
    return fieldValue => !isNaN(fieldValue) || valueIfFalse
}

export function emailValidator(valueIfFalse = false) {
    return fieldValue => /.+@.+\..+/.test(fieldValue) || valueIfFalse
}

export function passwordValidator(valueIfFalse = false) {
    return fieldValue => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|])(?!.*[\s]).{8,30}$/.test(fieldValue) || valueIfFalse
}

function isFieldEmpty(fieldValue) {
    return fieldValue == null || fieldValue === ''
}

export function numberValidatorNotRequired(valueIfFalse = false) {
    return fieldValue => isFieldEmpty(fieldValue) || !isNaN(fieldValue) || valueIfFalse
}

export function integerValidator(valueIfFalse = false) {
    return fieldValue => {
        const convertedValue = typeof fieldValue === 'string' ? Number(fieldValue) : fieldValue
        return Number.isInteger(convertedValue) || valueIfFalse
    }
}

export function rangeValidator(minValue, maxValue, valueIfFalse = false) {
    return fieldValue => (fieldValue >= minValue && fieldValue <= maxValue) || valueIfFalse
}

export function greaterThanValidator(minValueExcluded, valueIfFalse = false) {
    return fieldValue => (fieldValue > minValueExcluded) || valueIfFalse
}

export function greaterThanValidatorNotRequired(minValueExcluded, valueIfFalse = false) {
    return fieldValue => isFieldEmpty(fieldValue) || (fieldValue > minValueExcluded) || valueIfFalse
}

export function greaterOrEqualsThanValidator(minValue, valueIfFalse = false) {
    return fieldValue => (fieldValue >= minValue) || valueIfFalse
}

// Form Rules
export const requiredRule = [requiredValidator('Field is required')]

export function greaterThanRuleNotRequired(minValueExcluded) {
    return [
        numberValidatorNotRequired('Value is not a number'),
        greaterThanValidatorNotRequired(minValueExcluded, `Value must be > ${minValueExcluded}`)
    ]
}

export function regexValidator(regex, valueIfFalse = false) {
    return fieldValue => (fieldValue && fieldValue.match(regex) !== null) || valueIfFalse
}

export function greaterThanRule(minValueExcluded) {
    return [
        requiredValidator('Field is required'),
        numberValidator('Value is not a number'),
        greaterThanValidator(minValueExcluded, `Value must be > ${minValueExcluded}`)
    ]
}

export function stringMaxSizeValidator(maxLength) {
    return fieldValue => !fieldValue || (fieldValue.length <= maxLength) || `Max size ${maxLength} char.`
}

export function stringRequiredMaxLengthRule(maxLength) {
    return [
        requiredValidator('Field is required'),
        stringMaxSizeValidator()
    ]
}

export function stringMaxLengthRule(maxLength) {
    return [
        stringMaxSizeValidator(maxLength)
    ]
}

export function integerGreaterThanRule(minValueExcluded) {
    return [
        requiredValidator('Field is required'),
        integerValidator('Value is not a integer'),
        greaterThanValidator(minValueExcluded, `Value must be > ${minValueExcluded}`)
    ]
}

export function emailRule() {
    return [
        requiredValidator('E-mail is required'),
        emailValidator('E-mail must be valid')
    ]
}

export function passwordRule() {
    return [
        requiredValidator('Field is required'),
        fieldValue => /^.{8,30}$/.test(fieldValue) || 'Password should have between 8 and 30 characters',
        fieldValue => /^(?=.*[0-9])/.test(fieldValue) || 'At least one number',
        fieldValue => /^(?=.*[a-z])/.test(fieldValue) || 'At least one lowercase letter',
        fieldValue => /^(?=.*[A-Z])/.test(fieldValue) || 'At least one uppercase letter',
        fieldValue => /^(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|])/.test(fieldValue) || 'At least one special character',
        fieldValue => /^(?!.*[\s])/.test(fieldValue) || 'No whitespace'
    ]
}

export function greaterOrEqualsThanRule(minValue) {
    return [
        requiredValidator('Field is required'),
        numberValidator('Value is not a number'),
        greaterOrEqualsThanValidator(minValue, `Value must be >= ${minValue}`)
    ]
}

export function rangeRule(minValue, maxValue) {
    return [
        requiredValidator('Field is required'),
        numberValidator('Value is not a number'),
        rangeValidator(minValue, maxValue, `Value must be in range [${minValue};${maxValue}]`)
    ]
}

export function numberRule(minValueExcluded) {
    return [
        requiredValidator('Field is required'),
        numberValidator('Value is not a number')
    ]
}
