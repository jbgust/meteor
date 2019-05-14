export function isCustomPropellant(propellantType) {
    return propellantType && propellantType.startsWith('CUSTOM_')
}
