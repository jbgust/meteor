export const defaultAdvanceConfig = {
    densityRatio: 0.95,
    nozzleErosionInMillimeter: 0,
    combustionEfficiencyRatio: 0.95,
    ambiantPressureInMPa: 0.101,
    erosiveBurningAreaRatioThreshold: 6,
    erosiveBurningVelocityCoefficient: 0,
    nozzleEfficiency: 0.85,
    nozzleExpansionRatio: null,
    optimalNozzleDesign: true
}

export const demoForm = {
    throatDiameter: 17.39,
    outerDiameter: 69,
    coreDiameter: 20,
    segmentLength: 115,
    numberOfSegment: 4,
    outerSurface: 'INHIBITED',
    endsSurface: 'EXPOSED',
    coreSurface: 'EXPOSED',
    propellantType: 'KNDX',
    chamberInnerDiameter: 75,
    chamberLength: 470,
    extraConfig: defaultAdvanceConfig,
    nozzleDesign: {
        divergenceAngle: 18,
        convergenceAngle: 38
    }
}

export const demoResultData = {
    performanceResult: {
        motorDescription: 'L1672',
        maxThrust: '2060.35',
        totalImpulse: '3603.07',
        specificImpulse: '130.65',
        maxPressure: '59.36',
        thrustTime: '2.15',
        optimalDesign: true,
        nozzleExitDiameter: '54.03 mm',
        convergenceCrossSectionDiameter: 57.61,
        divergenceCrossSectionDiameter: 36.6356,
        exitSpeedInitial: '3.07',
        averagePressure: '49.06',
        optimalNozzleExpansionRatio: '9.65'
    },
    'motorParameters': [{ 'x': 0.0, 'y': 0.0, 'kn': 237.054, 'p': 0.0, 'm': 0.0 }, { 'x': 0.0253, 'y': 917.1436, 'kn': 237.9822, 'p': 28.3794, 'm': 0.7181 }, { 'x': 0.0394, 'y': 1045.1818, 'kn': 238.9016, 'p': 31.9631, 'm': 0.8364 }, { 'x': 0.0527, 'y': 1107.0875, 'kn': 239.8122, 'p': 33.682, 'm': 0.8907 }, { 'x': 0.0656, 'y': 1142.234, 'kn': 240.7141, 'p': 34.6542, 'm': 0.9202 }, { 'x': 0.0783, 'y': 1165.8222, 'kn': 241.6072, 'p': 35.3053, 'm': 0.9391 }, { 'x': 0.0908, 'y': 1184.2304, 'kn': 242.4915, 'p': 35.8126, 'm': 0.9533 }, { 'x': 0.1032, 'y': 1200.2518, 'kn': 243.3671, 'p': 36.2536, 'm': 0.9654 }, { 'x': 0.1156, 'y': 1215.144, 'kn': 244.2339, 'p': 36.6631, 'm': 0.9765 }, { 'x': 0.1278, 'y': 1229.4843, 'kn': 245.0919, 'p': 37.057, 'm': 0.9871 }, { 'x': 0.14, 'y': 1243.542, 'kn': 245.9412, 'p': 37.4428, 'm': 0.9975 }, { 'x': 0.1521, 'y': 1257.4437, 'kn': 246.7817, 'p': 37.8239, 'm': 1.0077 }, { 'x': 0.1641, 'y': 1271.2497, 'kn': 247.6134, 'p': 38.2021, 'm': 1.0178 }, { 'x': 0.176, 'y': 1284.9878, 'kn': 248.4364, 'p': 38.5781, 'm': 1.0279 }, { 'x': 0.1878, 'y': 1298.6708, 'kn': 249.2506, 'p': 38.9522, 'm': 1.0379 }, { 'x': 0.1996, 'y': 1312.3036, 'kn': 250.056, 'p': 39.3246, 'm': 1.0478 }, { 'x': 0.2113, 'y': 1325.8875, 'kn': 250.8527, 'p': 39.6954, 'm': 1.0577 }, { 'x': 0.2229, 'y': 1339.4218, 'kn': 251.6406, 'p': 40.0645, 'm': 1.0676 }, { 'x': 0.2344, 'y': 1352.905, 'kn': 252.4197, 'p': 40.4319, 'm': 1.0774 }, { 'x': 0.2459, 'y': 1366.3348, 'kn': 253.1901, 'p': 40.7976, 'm': 1.0872 }, { 'x': 0.2573, 'y': 1379.709, 'kn': 253.9517, 'p': 41.1615, 'm': 1.0969 }, { 'x': 0.2686, 'y': 1393.0251, 'kn': 254.7046, 'p': 41.5235, 'm': 1.1066 }, { 'x': 0.2799, 'y': 1406.2805, 'kn': 255.4486, 'p': 41.8835, 'm': 1.1162 }, { 'x': 0.2911, 'y': 1419.4727, 'kn': 256.1839, 'p': 42.2416, 'm': 1.1258 }, { 'x': 0.3023, 'y': 1432.5991, 'kn': 256.9105, 'p': 42.5976, 'm': 1.1353 }, { 'x': 0.3133, 'y': 1445.6571, 'kn': 257.6283, 'p': 42.9515, 'm': 1.1448 }, { 'x': 0.3244, 'y': 1458.6442, 'kn': 258.3373, 'p': 43.3032, 'm': 1.1542 }, { 'x': 0.3353, 'y': 1471.5578, 'kn': 259.0375, 'p': 43.6527, 'm': 1.1636 }, { 'x': 0.3462, 'y': 1484.3954, 'kn': 259.729, 'p': 43.9998, 'm': 1.1729 }, { 'x': 0.3571, 'y': 1497.1545, 'kn': 260.4117, 'p': 44.3446, 'm': 1.1821 }, { 'x': 0.3679, 'y': 1509.8326, 'kn': 261.0856, 'p': 44.687, 'm': 1.1912 }, { 'x': 0.3786, 'y': 1522.4272, 'kn': 261.7508, 'p': 45.0269, 'm': 1.2003 }, { 'x': 0.3893, 'y': 1534.936, 'kn': 262.4072, 'p': 45.3643, 'm': 1.2094 }, { 'x': 0.3999, 'y': 1547.3564, 'kn': 263.0548, 'p': 45.699, 'm': 1.2183 }, { 'x': 0.4105, 'y': 1559.6861, 'kn': 263.6937, 'p': 46.0311, 'm': 1.2272 }, { 'x': 0.421, 'y': 1571.9226, 'kn': 264.3238, 'p': 46.3605, 'm': 1.236 }, { 'x': 0.4315, 'y': 1584.0637, 'kn': 264.9452, 'p': 46.6871, 'm': 1.2448 }, { 'x': 0.4419, 'y': 1596.1069, 'kn': 265.5577, 'p': 47.0108, 'm': 1.2534 }, { 'x': 0.4522, 'y': 1608.0499, 'kn': 266.1616, 'p': 47.3317, 'm': 1.262 }, { 'x': 0.4626, 'y': 1619.8905, 'kn': 266.7566, 'p': 47.6497, 'm': 1.2705 }, { 'x': 0.4729, 'y': 1631.6264, 'kn': 267.3429, 'p': 47.9646, 'm': 1.279 }, { 'x': 0.4831, 'y': 1643.2553, 'kn': 267.9204, 'p': 48.2765, 'm': 1.2873 }, { 'x': 0.4933, 'y': 1654.7749, 'kn': 268.4891, 'p': 48.5853, 'm': 1.2956 }, { 'x': 0.5034, 'y': 1666.1832, 'kn': 269.0491, 'p': 48.891, 'm': 1.3038 }, { 'x': 0.5135, 'y': 1677.4779, 'kn': 269.6003, 'p': 49.1934, 'm': 1.3119 }, { 'x': 0.5236, 'y': 1688.6568, 'kn': 270.1428, 'p': 49.4926, 'm': 1.3199 }, { 'x': 0.5336, 'y': 1699.7178, 'kn': 270.6764, 'p': 49.7885, 'm': 1.3278 }, { 'x': 0.5436, 'y': 1710.6589, 'kn': 271.2013, 'p': 50.081, 'm': 1.3356 }, { 'x': 0.5535, 'y': 1721.4779, 'kn': 271.7175, 'p': 50.3701, 'm': 1.3434 }, { 'x': 0.5634, 'y': 1732.1728, 'kn': 272.2249, 'p': 50.6557, 'm': 1.351 }, { 'x': 0.5733, 'y': 1742.7415, 'kn': 272.7235, 'p': 50.9378, 'm': 1.3586 }, { 'x': 0.5831, 'y': 1753.182, 'kn': 273.2133, 'p': 51.2164, 'm': 1.3661 }, { 'x': 0.5929, 'y': 1763.4924, 'kn': 273.6944, 'p': 51.4914, 'm': 1.3734 }, { 'x': 0.6027, 'y': 1773.6708, 'kn': 274.1667, 'p': 51.7627, 'm': 1.3807 }, { 'x': 0.6124, 'y': 1783.7151, 'kn': 274.6303, 'p': 52.0304, 'm': 1.3879 }, { 'x': 0.6221, 'y': 1793.6235, 'kn': 275.085, 'p': 52.2943, 'm': 1.395 }, { 'x': 0.6318, 'y': 1803.3941, 'kn': 275.5311, 'p': 52.5544, 'm': 1.4019 }, { 'x': 0.6414, 'y': 1813.0251, 'kn': 275.9683, 'p': 52.8107, 'm': 1.4088 }, { 'x': 0.651, 'y': 1822.5146, 'kn': 276.3968, 'p': 53.0631, 'm': 1.4156 }, { 'x': 0.6606, 'y': 1831.8609, 'kn': 276.8165, 'p': 53.3117, 'm': 1.4222 }, { 'x': 0.6701, 'y': 1841.0622, 'kn': 277.2275, 'p': 53.5562, 'm': 1.4288 }, { 'x': 0.6796, 'y': 1850.1167, 'kn': 277.6296, 'p': 53.7968, 'm': 1.4352 }, { 'x': 0.6891, 'y': 1859.0228, 'kn': 278.0231, 'p': 54.0333, 'm': 1.4416 }, { 'x': 0.6985, 'y': 1867.7788, 'kn': 278.4077, 'p': 54.2658, 'm': 1.4478 }, { 'x': 0.7079, 'y': 1876.3829, 'kn': 278.7836, 'p': 54.4942, 'm': 1.4539 }, { 'x': 0.7173, 'y': 1884.8337, 'kn': 279.1507, 'p': 54.7184, 'm': 1.46 }, { 'x': 0.7267, 'y': 1893.1295, 'kn': 279.509, 'p': 54.9384, 'm': 1.4659 }, { 'x': 0.7361, 'y': 1901.2687, 'kn': 279.8586, 'p': 55.1542, 'm': 1.4717 }, { 'x': 0.7454, 'y': 1909.2498, 'kn': 280.1994, 'p': 55.3657, 'm': 1.4773 }, { 'x': 0.7547, 'y': 1917.0713, 'kn': 280.5315, 'p': 55.5729, 'm': 1.4829 }, { 'x': 0.7639, 'y': 1924.7317, 'kn': 280.8548, 'p': 55.7758, 'm': 1.4883 }, { 'x': 0.7732, 'y': 1932.2296, 'kn': 281.1693, 'p': 55.9743, 'm': 1.4937 }, { 'x': 0.7824, 'y': 1939.5635, 'kn': 281.4751, 'p': 56.1685, 'm': 1.4989 }, { 'x': 0.7916, 'y': 1946.732, 'kn': 281.772, 'p': 56.3582, 'm': 1.504 }, { 'x': 0.8008, 'y': 1953.7338, 'kn': 282.0603, 'p': 56.5434, 'm': 1.509 }, { 'x': 0.81, 'y': 1960.5676, 'kn': 282.3397, 'p': 56.7241, 'm': 1.5138 }, { 'x': 0.8191, 'y': 1967.232, 'kn': 282.6104, 'p': 56.9004, 'm': 1.5186 }, { 'x': 0.8283, 'y': 1973.7257, 'kn': 282.8723, 'p': 57.072, 'm': 1.5232 }, { 'x': 0.8374, 'y': 1980.0476, 'kn': 283.1255, 'p': 57.2391, 'm': 1.5277 }, { 'x': 0.8465, 'y': 1986.1964, 'kn': 283.3698, 'p': 57.4016, 'm': 1.532 }, { 'x': 0.8555, 'y': 1992.171, 'kn': 283.6055, 'p': 57.5594, 'm': 1.5363 }, { 'x': 0.8646, 'y': 1997.9701, 'kn': 283.8323, 'p': 57.7125, 'm': 1.5404 }, { 'x': 0.8736, 'y': 2003.5926, 'kn': 284.0504, 'p': 57.861, 'm': 1.5444 }, { 'x': 0.8827, 'y': 2009.0376, 'kn': 284.2597, 'p': 58.0047, 'm': 1.5483 }, { 'x': 0.8917, 'y': 2014.3038, 'kn': 284.4603, 'p': 58.1437, 'm': 1.552 }, { 'x': 0.9007, 'y': 2019.3903, 'kn': 284.6521, 'p': 58.2779, 'm': 1.5556 }, { 'x': 0.9096, 'y': 2033.3918, 'kn': 284.8351, 'p': 58.6472, 'm': 1.564 }, { 'x': 0.9185, 'y': 2042.1488, 'kn': 285.0093, 'p': 58.8781, 'm': 1.5714 }, { 'x': 0.9274, 'y': 2046.534, 'kn': 285.1748, 'p': 58.9937, 'm': 1.575 }, { 'x': 0.9363, 'y': 2049.0317, 'kn': 285.3316, 'p': 59.0595, 'm': 1.577 }, { 'x': 0.9452, 'y': 2050.6907, 'kn': 285.4795, 'p': 59.1033, 'm': 1.5783 }, { 'x': 0.9541, 'y': 2051.9562, 'kn': 285.6187, 'p': 59.1366, 'm': 1.5792 }, { 'x': 0.963, 'y': 2053.0185, 'kn': 285.7491, 'p': 59.1646, 'm': 1.58 }, { 'x': 0.9719, 'y': 2053.9594, 'kn': 285.8708, 'p': 59.1894, 'm': 1.5807 }, { 'x': 0.9808, 'y': 2054.8142, 'kn': 285.9837, 'p': 59.2119, 'm': 1.5813 }, { 'x': 0.9898, 'y': 2055.5984, 'kn': 286.0878, 'p': 59.2326, 'm': 1.5819 }, { 'x': 0.9987, 'y': 2056.3186, 'kn': 286.1832, 'p': 59.2516, 'm': 1.5824 }, { 'x': 1.0076, 'y': 2056.9779, 'kn': 286.2697, 'p': 59.2689, 'm': 1.5829 }, { 'x': 1.0165, 'y': 2057.5775, 'kn': 286.3476, 'p': 59.2847, 'm': 1.5833 }, { 'x': 1.0254, 'y': 2058.1181, 'kn': 286.4166, 'p': 59.299, 'm': 1.5837 }, { 'x': 1.0343, 'y': 2058.5999, 'kn': 286.4769, 'p': 59.3117, 'm': 1.584 }, { 'x': 1.0432, 'y': 2059.0231, 'kn': 286.5284, 'p': 59.3228, 'm': 1.5844 }, { 'x': 1.0521, 'y': 2059.3877, 'kn': 286.5712, 'p': 59.3324, 'm': 1.5846 }, { 'x': 1.0611, 'y': 2059.6937, 'kn': 286.6052, 'p': 59.3405, 'm': 1.5848 }, { 'x': 1.07, 'y': 2059.9411, 'kn': 286.6304, 'p': 59.347, 'm': 1.585 }, { 'x': 1.0789, 'y': 2060.13, 'kn': 286.6469, 'p': 59.352, 'm': 1.5852 }, { 'x': 1.0878, 'y': 2060.2604, 'kn': 286.6546, 'p': 59.3554, 'm': 1.5853 }, { 'x': 1.0967, 'y': 2060.3322, 'kn': 286.6535, 'p': 59.3573, 'm': 1.5853 }, { 'x': 1.1056, 'y': 2060.3455, 'kn': 286.6437, 'p': 59.3576, 'm': 1.5854 }, { 'x': 1.1145, 'y': 2060.3002, 'kn': 286.6251, 'p': 59.3564, 'm': 1.5853 }, { 'x': 1.1234, 'y': 2060.1964, 'kn': 286.5977, 'p': 59.3537, 'm': 1.5853 }, { 'x': 1.1324, 'y': 2060.0341, 'kn': 286.5615, 'p': 59.3494, 'm': 1.5852 }, { 'x': 1.1413, 'y': 2059.8133, 'kn': 286.5166, 'p': 59.3436, 'm': 1.585 }, { 'x': 1.1502, 'y': 2059.5339, 'kn': 286.463, 'p': 59.3363, 'm': 1.5848 }, { 'x': 1.1591, 'y': 2059.196, 'kn': 286.4005, 'p': 59.3274, 'm': 1.5846 }, { 'x': 1.168, 'y': 2058.7995, 'kn': 286.3293, 'p': 59.3169, 'm': 1.5843 }, { 'x': 1.1769, 'y': 2058.3445, 'kn': 286.2493, 'p': 59.3049, 'm': 1.584 }, { 'x': 1.1858, 'y': 2057.831, 'kn': 286.1606, 'p': 59.2914, 'm': 1.5837 }, { 'x': 1.1948, 'y': 2057.2589, 'kn': 286.0631, 'p': 59.2763, 'm': 1.5833 }, { 'x': 1.2037, 'y': 2056.6283, 'kn': 285.9568, 'p': 59.2597, 'm': 1.5829 }, { 'x': 1.2126, 'y': 2055.9391, 'kn': 285.8418, 'p': 59.2416, 'm': 1.5824 }, { 'x': 1.2215, 'y': 2055.1914, 'kn': 285.718, 'p': 59.2219, 'm': 1.5819 }, { 'x': 1.2304, 'y': 2054.3851, 'kn': 285.5854, 'p': 59.2006, 'm': 1.5813 }, { 'x': 1.2393, 'y': 2053.5202, 'kn': 285.4441, 'p': 59.1778, 'm': 1.5807 }, { 'x': 1.2482, 'y': 2052.5968, 'kn': 285.294, 'p': 59.1535, 'm': 1.5801 }, { 'x': 1.2571, 'y': 2051.6148, 'kn': 285.1351, 'p': 59.1276, 'm': 1.5794 }, { 'x': 1.266, 'y': 2050.5742, 'kn': 284.9675, 'p': 59.1002, 'm': 1.5787 }, { 'x': 1.2749, 'y': 2049.4751, 'kn': 284.7911, 'p': 59.0712, 'm': 1.5779 }, { 'x': 1.2839, 'y': 2048.3173, 'kn': 284.6059, 'p': 59.0407, 'm': 1.5771 }, { 'x': 1.2928, 'y': 2047.101, 'kn': 284.412, 'p': 59.0086, 'm': 1.5763 }, { 'x': 1.3017, 'y': 2045.826, 'kn': 284.2093, 'p': 58.975, 'm': 1.5754 }, { 'x': 1.3106, 'y': 2044.4924, 'kn': 283.9978, 'p': 58.9399, 'm': 1.5744 }, { 'x': 1.3195, 'y': 2043.1002, 'kn': 283.7776, 'p': 58.9032, 'm': 1.5735 }, { 'x': 1.3284, 'y': 2041.6494, 'kn': 283.5486, 'p': 58.8649, 'm': 1.5725 }, { 'x': 1.3373, 'y': 2040.1399, 'kn': 283.3108, 'p': 58.8252, 'm': 1.5714 }, { 'x': 1.3462, 'y': 2038.5718, 'kn': 283.0643, 'p': 58.7838, 'm': 1.5703 }, { 'x': 1.3551, 'y': 2036.945, 'kn': 282.809, 'p': 58.7409, 'm': 1.5692 }, { 'x': 1.364, 'y': 2035.2596, 'kn': 282.5449, 'p': 58.6965, 'm': 1.568 }, { 'x': 1.3729, 'y': 2033.5154, 'kn': 282.2721, 'p': 58.6505, 'm': 1.5668 }, { 'x': 1.3818, 'y': 2031.7126, 'kn': 281.9905, 'p': 58.6029, 'm': 1.5655 }, { 'x': 1.3907, 'y': 2029.851, 'kn': 281.7001, 'p': 58.5538, 'm': 1.5642 }, { 'x': 1.3996, 'y': 2027.9307, 'kn': 281.401, 'p': 58.5032, 'm': 1.5629 }, { 'x': 1.4085, 'y': 2025.9517, 'kn': 281.0931, 'p': 58.451, 'm': 1.5615 }, { 'x': 1.4174, 'y': 2023.914, 'kn': 280.7764, 'p': 58.3972, 'm': 1.5601 }, { 'x': 1.4263, 'y': 2021.8174, 'kn': 280.451, 'p': 58.3419, 'm': 1.5586 }, { 'x': 1.4351, 'y': 2019.6622, 'kn': 280.1168, 'p': 58.2851, 'm': 1.5571 }, { 'x': 1.4441, 'y': 2006.4666, 'kn': 279.7738, 'p': 57.9368, 'm': 1.5497 }, { 'x': 1.4532, 'y': 1994.0989, 'kn': 279.4221, 'p': 57.6103, 'm': 1.5408 }, { 'x': 1.4623, 'y': 1982.4057, 'kn': 279.0616, 'p': 57.3014, 'm': 1.5325 }, { 'x': 1.4714, 'y': 1971.2574, 'kn': 278.6923, 'p': 57.0068, 'm': 1.5245 }, { 'x': 1.4805, 'y': 1960.5444, 'kn': 278.3143, 'p': 56.7235, 'm': 1.5169 }, { 'x': 1.4897, 'y': 1950.1745, 'kn': 277.9275, 'p': 56.4493, 'm': 1.5095 }, { 'x': 1.4989, 'y': 1940.0698, 'kn': 277.532, 'p': 56.1819, 'm': 1.5023 }, { 'x': 1.5081, 'y': 1930.1645, 'kn': 277.1276, 'p': 55.9197, 'm': 1.4953 }, { 'x': 1.5173, 'y': 1920.4031, 'kn': 276.7145, 'p': 55.6612, 'm': 1.4883 }, { 'x': 1.5266, 'y': 1910.7392, 'kn': 276.2927, 'p': 55.4051, 'm': 1.4815 }, { 'x': 1.5359, 'y': 1901.1334, 'kn': 275.862, 'p': 55.1506, 'm': 1.4747 }, { 'x': 1.5453, 'y': 1891.5528, 'kn': 275.4226, 'p': 54.8966, 'm': 1.4679 }, { 'x': 1.5546, 'y': 1881.9696, 'kn': 274.9745, 'p': 54.6424, 'm': 1.4611 }, { 'x': 1.564, 'y': 1872.3605, 'kn': 274.5176, 'p': 54.3874, 'm': 1.4543 }, { 'x': 1.5735, 'y': 1862.7062, 'kn': 274.0519, 'p': 54.1311, 'm': 1.4475 }, { 'x': 1.5829, 'y': 1852.9904, 'kn': 273.5774, 'p': 53.8731, 'm': 1.4406 }, { 'x': 1.5924, 'y': 1843.1996, 'kn': 273.0942, 'p': 53.613, 'm': 1.4337 }, { 'x': 1.6019, 'y': 1833.3227, 'kn': 272.6022, 'p': 53.3505, 'm': 1.4267 }, { 'x': 1.6115, 'y': 1823.3503, 'kn': 272.1014, 'p': 53.0854, 'm': 1.4196 }, { 'x': 1.6211, 'y': 1813.2751, 'kn': 271.5919, 'p': 52.8174, 'm': 1.4125 }, { 'x': 1.6307, 'y': 1803.0908, 'kn': 271.0736, 'p': 52.5463, 'm': 1.4053 }, { 'x': 1.6403, 'y': 1792.7925, 'kn': 270.5465, 'p': 52.2722, 'm': 1.398 }, { 'x': 1.65, 'y': 1782.3763, 'kn': 270.0107, 'p': 51.9947, 'm': 1.3906 }, { 'x': 1.6598, 'y': 1771.8393, 'kn': 269.4661, 'p': 51.7139, 'm': 1.3831 }, { 'x': 1.6695, 'y': 1761.1792, 'kn': 268.9128, 'p': 51.4297, 'm': 1.3755 }, { 'x': 1.6793, 'y': 1750.3944, 'kn': 268.3507, 'p': 51.1421, 'm': 1.3679 }, { 'x': 1.6891, 'y': 1739.4839, 'kn': 267.7798, 'p': 50.8509, 'm': 1.3601 }, { 'x': 1.699, 'y': 1728.447, 'kn': 267.2001, 'p': 50.5562, 'm': 1.3523 }, { 'x': 1.7089, 'y': 1717.2837, 'kn': 266.6117, 'p': 50.258, 'm': 1.3443 }, { 'x': 1.7189, 'y': 1705.9941, 'kn': 266.0145, 'p': 49.9563, 'm': 1.3363 }, { 'x': 1.7289, 'y': 1694.5787, 'kn': 265.4085, 'p': 49.651, 'm': 1.3282 }, { 'x': 1.7389, 'y': 1683.0384, 'kn': 264.7938, 'p': 49.3422, 'm': 1.3199 }, { 'x': 1.749, 'y': 1671.3741, 'kn': 264.1703, 'p': 49.03, 'm': 1.3116 }, { 'x': 1.7591, 'y': 1659.587, 'kn': 263.5381, 'p': 48.7143, 'm': 1.3032 }, { 'x': 1.7692, 'y': 1647.6785, 'kn': 262.897, 'p': 48.3951, 'm': 1.2947 }, { 'x': 1.7794, 'y': 1635.6502, 'kn': 262.2473, 'p': 48.0726, 'm': 1.2861 }, { 'x': 1.7897, 'y': 1623.5037, 'kn': 261.5887, 'p': 47.7467, 'm': 1.2774 }, { 'x': 1.8, 'y': 1611.2408, 'kn': 260.9214, 'p': 47.4174, 'm': 1.2687 }, { 'x': 1.8103, 'y': 1598.8635, 'kn': 260.2453, 'p': 47.0849, 'm': 1.2598 }, { 'x': 1.8207, 'y': 1586.3738, 'kn': 259.5604, 'p': 46.7492, 'm': 1.2509 }, { 'x': 1.8312, 'y': 1573.7738, 'kn': 258.8668, 'p': 46.4103, 'm': 1.2418 }, { 'x': 1.8417, 'y': 1561.0657, 'kn': 258.1644, 'p': 46.0682, 'm': 1.2327 }, { 'x': 1.8523, 'y': 1548.2517, 'kn': 257.4533, 'p': 45.7231, 'm': 1.2235 }, { 'x': 1.8629, 'y': 1535.3341, 'kn': 256.7334, 'p': 45.375, 'm': 1.2142 }, { 'x': 1.8735, 'y': 1522.3155, 'kn': 256.0047, 'p': 45.0239, 'm': 1.2049 }, { 'x': 1.8842, 'y': 1509.1981, 'kn': 255.2672, 'p': 44.6699, 'm': 1.1954 }, { 'x': 1.895, 'y': 1495.9846, 'kn': 254.521, 'p': 44.313, 'm': 1.1859 }, { 'x': 1.9059, 'y': 1482.6774, 'kn': 253.766, 'p': 43.9534, 'm': 1.1763 }, { 'x': 1.9168, 'y': 1469.2793, 'kn': 253.0023, 'p': 43.591, 'm': 1.1667 }, { 'x': 1.9277, 'y': 1455.7928, 'kn': 252.2297, 'p': 43.226, 'm': 1.1569 }, { 'x': 1.9387, 'y': 1442.2206, 'kn': 251.4485, 'p': 42.8584, 'm': 1.1471 }, { 'x': 1.9498, 'y': 1428.5656, 'kn': 250.6584, 'p': 42.4882, 'm': 1.1373 }, { 'x': 1.961, 'y': 1414.8304, 'kn': 249.8596, 'p': 42.1156, 'm': 1.1273 }, { 'x': 1.9722, 'y': 1401.0178, 'kn': 249.052, 'p': 41.7406, 'm': 1.1173 }, { 'x': 1.9835, 'y': 1387.1309, 'kn': 248.2357, 'p': 41.3633, 'm': 1.1073 }, { 'x': 1.9948, 'y': 1373.1723, 'kn': 247.4105, 'p': 40.9837, 'm': 1.0972 }, { 'x': 2.0062, 'y': 1359.1451, 'kn': 246.5767, 'p': 40.6019, 'm': 1.087 }, { 'x': 2.0177, 'y': 1345.0522, 'kn': 245.734, 'p': 40.218, 'm': 1.0767 }, { 'x': 2.0293, 'y': 1330.8967, 'kn': 244.8826, 'p': 39.8321, 'm': 1.0664 }, { 'x': 2.0409, 'y': 1316.6814, 'kn': 244.0224, 'p': 39.4442, 'm': 1.0561 }, { 'x': 2.0527, 'y': 1302.4096, 'kn': 243.1535, 'p': 39.0544, 'm': 1.0457 }, { 'x': 2.0645, 'y': 1288.0841, 'kn': 242.2757, 'p': 38.6628, 'm': 1.0352 }, { 'x': 2.0763, 'y': 1273.7083, 'kn': 241.3893, 'p': 38.2694, 'm': 1.0248 }, { 'x': 2.0854, 'y': 1098.7741, 'kn': 0.0, 'p': 33.4517, 'm': 0.977 }, { 'x': 2.0915, 'y': 825.4024, 'kn': 0.0, 'p': 25.7849, 'm': 0.8921 }, { 'x': 2.0977, 'y': 618.2182, 'kn': 0.0, 'p': 19.8238, 'm': 0.8071 }, { 'x': 2.1038, 'y': 461.4383, 'kn': 0.0, 'p': 15.1889, 'm': 0.7221 }, { 'x': 2.1099, 'y': 343.0003, 'kn': 0.0, 'p': 11.5851, 'm': 0.6372 }, { 'x': 2.1161, 'y': 253.6921, 'kn': 0.0, 'p': 8.7831, 'm': 0.5522 }, { 'x': 2.1222, 'y': 186.4836, 'kn': 0.0, 'p': 6.6044, 'm': 0.4673 }, { 'x': 2.1284, 'y': 136.013, 'kn': 0.0, 'p': 4.9104, 'm': 0.3823 }, { 'x': 2.1345, 'y': 98.193, 'kn': 0.0, 'p': 3.5933, 'm': 0.2974 }, { 'x': 2.1406, 'y': 69.9073, 'kn': 0.0, 'p': 2.5692, 'm': 0.2124 }, { 'x': 2.1468, 'y': 48.7756, 'kn': 0.0, 'p': 1.7729, 'm': 0.1274 }, { 'x': 2.1529, 'y': 32.9662, 'kn': 0.0, 'p': 1.1538, 'm': 0.0425 }]

}
