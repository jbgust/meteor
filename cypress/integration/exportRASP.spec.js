describe('RASP export', function() {

    it('Should export to RASP', function() {
        cy.visit('/')
        cy.contains('View demo').click()

        cy.url().should('include', '/#/demo')

        cy.server()

        // This is the post call we are interested in capturing
        cy.route('POST', '/export/rasp').as('postExportRASP')

        cy.get('button#btnShowRASPExport').click()

        cy.get('input#motorDiameter').clear().type(80)
        cy.get('input#motorLength').clear().type(500)
        cy.get('input#motorWeight').clear().type(4.23)
        cy.get('input#delay').clear().type('0-1-P')

        cy.get('button#btnExportRASP').click()

        cy.wait('@postExportRASP')

        // Assert on XHR
        cy.get('@postExportRASP').then(function (xhr) {
            console.log(xhr)
            expect(xhr.status).to.eq(200)
            // expect(xhr.requestHeaders).to.have.property('Content-Type')
            // expect(xhr.requestHeaders).to.have.property('X-Password', 'Passw0rd1')
            expect(xhr.method).to.eq('POST')
            expect(xhr.responseBody).to.eq(`
L1672 80.0 500.0 0-1-P 2.812 4.230 METEOR
    0.0 0.0
    0.0253 917.1436
    0.0394 1045.1818
    0.0527 1107.0875
    0.0656 1142.234
    0.0783 1165.8222
    0.0908 1184.2304
    0.1032 1200.2518
    0.1156 1215.144
    0.1278 1229.4843
    0.14 1243.542
    0.1521 1257.4437
    0.1641 1271.2497
    0.176 1284.9878
    0.1878 1298.6708
    0.1996 1312.3036
    0.2113 1325.8875
    0.2229 1339.4218
    0.2344 1352.905
    0.2459 1366.3348
    0.2573 1379.709
    0.2686 1393.0251
    0.2799 1406.2805
    0.2911 1419.4727
    0.3023 1432.5991
    0.3133 1445.6571
    0.3244 1458.6442
    0.3353 1471.5578
    0.3462 1484.3954
    0.3571 1497.1545
    0.3679 1509.8326
    0.3786 1522.4272
    0.3893 1534.936
    0.3999 1547.3564
    0.4105 1559.6861
    0.421 1571.9226
    0.4315 1584.0637
    0.4419 1596.1069
    0.4522 1608.0499
    0.4626 1619.8905
    0.4729 1631.6264
    0.4831 1643.2553
    0.4933 1654.7749
    0.5034 1666.1832
    0.5135 1677.4779
    0.5236 1688.6568
    0.5336 1699.7178
    0.5436 1710.6589
    0.5535 1721.4779
    0.5634 1732.1728
    0.5733 1742.7415
    0.5831 1753.182
    0.5929 1763.4924
    0.6027 1773.6708
    0.6124 1783.7151
    0.6221 1793.6235
    0.6318 1803.3941
    0.6414 1813.0251
    0.651 1822.5146
    0.6606 1831.8609
    0.6701 1841.0622
    0.6796 1850.1167
    0.6891 1859.0228
    0.6985 1867.7788
    0.7079 1876.3829
    0.7173 1884.8337
    0.7267 1893.1295
    0.7361 1901.2687
    0.7454 1909.2498
    0.7547 1917.0713
    0.7639 1924.7317
    0.7732 1932.2296
    0.7824 1939.5635
    0.7916 1946.732
    0.8008 1953.7338
    0.81 1960.5676
    0.8191 1967.232
    0.8283 1973.7257
    0.8374 1980.0476
    0.8465 1986.1964
    0.8555 1992.171
    0.8646 1997.9701
    0.8736 2003.5926
    0.8827 2009.0376
    0.8917 2014.3038
    0.9007 2019.3903
    0.9096 2033.3918
    0.9185 2042.1488
    0.9274 2046.534
    0.9363 2049.0317
    0.9452 2050.6907
    0.9541 2051.9562
    0.963 2053.0185
    0.9719 2053.9594
    0.9808 2054.8142
    0.9898 2055.5984
    0.9987 2056.3186
    1.0076 2056.9779
    1.0165 2057.5775
    1.0254 2058.1181
    1.0343 2058.5999
    1.0432 2059.0231
    1.0521 2059.3877
    1.0611 2059.6937
    1.07 2059.9411
    1.0789 2060.13
    1.0878 2060.2604
    1.0967 2060.3322
    1.1056 2060.3455
    1.1145 2060.3002
    1.1234 2060.1964
    1.1324 2060.0341
    1.1413 2059.8133
    1.1502 2059.5339
    1.1591 2059.196
    1.168 2058.7995
    1.1769 2058.3445
    1.1858 2057.831
    1.1948 2057.2589
    1.2037 2056.6283
    1.2126 2055.9391
    1.2215 2055.1914
    1.2304 2054.3851
    1.2393 2053.5202
    1.2482 2052.5968
    1.2571 2051.6148
    1.266 2050.5742
    1.2749 2049.4751
    1.2839 2048.3173
    1.2928 2047.101
    1.3017 2045.826
    1.3106 2044.4924
    1.3195 2043.1002
    1.3284 2041.6494
    1.3373 2040.1399
    1.3462 2038.5718
    1.3551 2036.945
    1.364 2035.2596
    1.3729 2033.5154
    1.3818 2031.7126
    1.3907 2029.851
    1.3996 2027.9307
    1.4085 2025.9517
    1.4174 2023.914
    1.4263 2021.8174
    1.4351 2019.6622
    1.4441 2006.4666
    1.4532 1994.0989
    1.4623 1982.4057
    1.4714 1971.2574
    1.4805 1960.5444
    1.4897 1950.1745
    1.4989 1940.0698
    1.5081 1930.1645
    1.5173 1920.4031
    1.5266 1910.7392
    1.5359 1901.1334
    1.5453 1891.5528
    1.5546 1881.9696
    1.564 1872.3605
    1.5735 1862.7062
    1.5829 1852.9904
    1.5924 1843.1996
    1.6019 1833.3227
    1.6115 1823.3503
    1.6211 1813.2751
    1.6307 1803.0908
    1.6403 1792.7925
    1.65 1782.3763
    1.6598 1771.8393
    1.6695 1761.1792
    1.6793 1750.3944
    1.6891 1739.4839
    1.699 1728.447
    1.7089 1717.2837
    1.7189 1705.9941
    1.7289 1694.5787
    1.7389 1683.0384
    1.749 1671.3741
    1.7591 1659.587
    1.7692 1647.6785
    1.7794 1635.6502
    1.7897 1623.5037
    1.8 1611.2408
    1.8103 1598.8635
    1.8207 1586.3738
    1.8312 1573.7738
    1.8417 1561.0657
    1.8523 1548.2517
    1.8629 1535.3341
    1.8735 1522.3155
    1.8842 1509.1981
    1.895 1495.9846
    1.9059 1482.6774
    1.9168 1469.2793
    1.9277 1455.7928
    1.9387 1442.2206
    1.9498 1428.5656
    1.961 1414.8304
    1.9722 1401.0178
    1.9835 1387.1309
    1.9948 1373.1723
    2.0062 1359.1451
    2.0177 1345.0522
    2.0293 1330.8967
    2.0409 1316.6814
    2.0527 1302.4096
    2.0645 1288.0841
    2.0763 1273.7083
    2.0854 1098.7741
    2.0915 825.4024
    2.0977 618.2182
    2.1038 461.4383
    2.1099 343.0003
    2.1161 253.6921
    2.1222 186.4836
    2.1284 136.013
    2.1345 98.193
    2.1406 69.9073
    2.1468 48.7756
2.1529 32.9662`)
        })
    })
})
