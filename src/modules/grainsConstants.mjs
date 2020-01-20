// Grain types
export const END_BURNER = 'END_BURNER'
export const FINOCYL = 'FINOCYL'
export const HOLLOW = 'HOLLOW'
export const STAR = 'STAR'
export const MOON_BURNER = 'MOON_BURNER'
export const C_SLOT = 'C_SLOT'
export const ROD_TUBE = 'ROD_TUBE'

// Grain surfaces
export const EXPOSED = 'EXPOSED'
export const INHIBITED = 'INHIBITED'

// PROPELLANT
export const KNDX = 'KNDX'
export const KNER_COARSE = 'KNER_COARSE'
export const KNMN_COARSE = 'KNMN_COARSE'
export const KNSB_COARSE = 'KNSB_COARSE'
export const KNSB_FINE = 'KNSB_FINE'
export const KNSU = 'KNSU'

export const CUSTOM_PRPELLANT_PREFIX = 'CUSTOM_'

export const NATIVE_PROPELLANTS = [
    { value: KNDX, text: 'KNDX', description: '65% KNO3 / 35% Dextrose', idealDensity: '1.879 g/cm³' },
    { value: KNER_COARSE, text: 'KNER (oxidizer lightly milled)', description: '65% KNO3 / 35% erythritol', idealDensity: '1.820 g/cm³' },
    { value: KNMN_COARSE, text: 'KNMN (oxidizer lightly milled)', description: '65% KNO3 / 35% mannitol', idealDensity: '1.854 g/cm³' },
    { value: KNSB_COARSE, text: 'KNSB (oxidizer lightly milled)', description: '65% KNO3 / 35% sorbitol', idealDensity: '1.841 g/cm³' },
    { value: KNSB_FINE, text: 'KNSB (oxidizer finely milled)', description: '65% KNO3 / 35% sorbitol', idealDensity: '1.841 g/cm³' },
    { value: KNSU, text: 'KNSU', description: '65% KNO3 / 35% sucrose', idealDensity: '1.889 g/cm³' }
]
