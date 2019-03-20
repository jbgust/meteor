export const importValidatorSchema = {
    type: 'object',
    properties: {
        version: { type: 'number', minimum: 1, maximum: 1 },
        configs: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            properties: {
                throatDiameter: { type: 'number' },
                outerDiameter: { type: 'number' },
                coreDiameter: { type: 'number' },
                segmentLength: { type: 'number' },
                numberOfSegment: { type: 'number' },
                outerSurface: { type: 'string', pattern: '((INHIBITED)|(EXPOSED))' },
                endsSurface: { type: 'string', pattern: '((INHIBITED)|(EXPOSED))' },
                coreSurface: { type: 'string', pattern: '((INHIBITED)|(EXPOSED))' },
                propellantType: { type: 'string', pattern: '((KNDX)|(KNER_COARSE)|(KNMN_COARSE)|(KNSB_COARSE)|(KNSB_FINE)|(KNSU))' },
                chamberInnerDiameter: { type: 'number' },
                chamberLength: { type: 'number' },
                extraConfig: {
                    type: 'object',
                    properties: {
                        densityRatio: { type: 'number' },
                        nozzleErosionInMillimeter: { type: 'number' },
                        combustionEfficiencyRatio: { type: 'number' },
                        ambiantPressureInMPa: { type: 'number' },
                        erosiveBurningAreaRatioThreshold: { type: 'number' },
                        erosiveBurningVelocityCoefficient: { type: 'number' },
                        nozzleEfficiency: { type: 'number' },
                        nozzleExpansionRatio: { type: ['number', 'null'] },
                        optimalNozzleDesign: { type: 'boolean' }
                    },
                    required: [
                        'densityRatio',
                        'nozzleErosionInMillimeter',
                        'combustionEfficiencyRatio',
                        'ambiantPressureInMPa',
                        'erosiveBurningAreaRatioThreshold',
                        'erosiveBurningVelocityCoefficient',
                        'nozzleEfficiency',
                        'nozzleExpansionRatio',
                        'optimalNozzleDesign'
                    ]
                }
            },
            required: [
                'throatDiameter',
                'outerDiameter',
                'coreDiameter',
                'segmentLength',
                'numberOfSegment',
                'outerSurface',
                'endsSurface',
                'coreSurface',
                'propellantType',
                'chamberInnerDiameter',
                'chamberLength',
                'extraConfig'
            ]
        }
    },
    required: [
        'version'
    ]
}
