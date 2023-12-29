<template>
  <div class="thrust-graphic" id="thrust-chart" ref="motorParameters">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { mapGetters } from 'vuex'
import { mergeCharetResults } from '@/modules/computationUtils.mjs'

export default {
    name: 'thrust-graphical-result',
    data() {
        return {
            chart: null,
            pressureSerie: null,
            massFluxSerie: null,
            grainMass: null,
            chartLoader: null
        }
    },
    props: {
        units: Object
    },
    created() {
        let chart = am4core.create(this.$refs.motorParameters, am4charts.XYChart)
        let chartLoader = this.createChartLoader(chart)
        this.buildChart(chart, chartLoader)
    },
    mounted() {

    },
    methods: {
        buildChart(chart, chartLoader) {
            chart.paddingRight = 20
            chart.numberFormatter.numberFormat = '.##'
            chart.exporting.menu = new am4core.ExportMenu()
            chart.exporting.menu.items[0].label = 'Export chart'
            chart.exporting.menu.items[0].icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+'
            chart.exporting.menu.items[0].menu[2].hidden = true // menu print
            chart.exporting.menu.items[0].menu[0].menu[3].hidden = true // menu PDF
            chart.exporting.menu.items[0].menu[1].menu[2].hidden = true // menu XLSX

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
            categoryAxis.dataFields.category = 'x'
            categoryAxis.title.text = 'Burn time (sec.)'
            categoryAxis.baseValue = 0

            chart.colors.step = 2

            this.createAxisAndSeries(chart, 'kn', 'KN', true, 'triangle')
            this.pressureSerie = this.createAxisAndSeries(chart, 'p', 'Chamber pressure', true, 'rectangle', this.units.resultPressureUnit)
            this.massFluxSerie = this.createAxisAndSeries(chart, 'm', 'Mass flow rate', true, 'sqare', this.units.massFluxUnit)
            this.grainMass = this.createAxisAndSeries(chart, 'grainMass', 'Grain mass', true, 'sqare', this.units.grainMassUnit)
            this.createAxisAndSeries(chart, 'y', 'Thrust', false, 'circle', 'N')

            chart.cursor = new am4charts.XYCursor()

            categoryAxis.adapter.add('getTooltipText', (text) => {
                return Number.parseFloat(text).toFixed(2)
            })

            chart.preloader.disabled = true
            chart.events.on('validated', function() {
                if (chartLoader) {
                    chartLoader.hide()
                }
            }, this)
            chart.events.on('beforedatavalidated', function() {
                if (chartLoader) {
                    chartLoader.show()
                }
            }, this)

            chart.legend = new am4charts.Legend()
        },
        addDataInChart() {
            let chart = am4core.create(this.$refs.motorParameters, am4charts.XYChart)
            let chartLoader = this.createChartLoader(chart)
            this.buildChart(chart, chartLoader)
            if (this.compareWithPrevious && !!this.previousComputation) {
                chart.data = mergeCharetResults(this.currentComputation.motorParameters, this.previousComputation.motorParameters)
            } else {
                chart.data = this.currentComputation.motorParameters
            }
        },
        createAxisAndSeries(chart, field, name, opposite, bullet, unit = '') {
            // see https://www.amcharts.com/demos/multiple-value-axes/
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

            let series = chart.series.push(new am4charts.LineSeries())
            series.dataFields.valueY = field
            series.dataFields.categoryX = 'x'
            series.strokeWidth = 2
            series.yAxis = valueAxis
            series.name = name
            series.hidden = this.isSerieHidden(series)
            series.tooltipText = `{name}: [bold]{valueY}[/] ${unit}`
            this.addEventHideShowSerie(series)

            if (this.compareWithPrevious && !!this.previousComputation) {
                let series2 = chart.series.push(new am4charts.LineSeries())
                series2.dataFields.valueY = field + 'Previous'
                series2.dataFields.categoryX = 'x'
                series2.strokeWidth = 2
                series2.yAxis = valueAxis
                series2.strokeDasharray = '8,4'
                series2.stroke = series.stroke
                series2.name = 'Previous ' + name
                series2.hidden = this.isSerieHidden(series2)
                series2.tooltipText = `{name}: [bold]{valueY}[/] ${unit}`
                series2.tooltip.getFillFromObject = false
                series2.tooltip.background.fill = series.stroke
                // color of tooltip text
                // series2.tooltip.label.fill = am4core.color('#000')
                this.addEventHideShowSerie(series2)
            }

            valueAxis.renderer.line.strokeOpacity = 1
            valueAxis.renderer.line.strokeWidth = 2
            valueAxis.renderer.line.stroke = series.stroke
            valueAxis.renderer.labels.template.fill = series.stroke
            valueAxis.renderer.opposite = opposite
            valueAxis.renderer.grid.template.disabled = true

            return series
        },
        createChartLoader(chart) {
            let chartLoader = chart.tooltipContainer.createChild(am4core.Container)
            chartLoader.background.fill = am4core.color('#fff')
            chartLoader.background.fillOpacity = 0.8
            chartLoader.width = am4core.percent(100)
            chartLoader.height = am4core.percent(100)

            let indicatorLabel = chartLoader.createChild(am4core.Label)
            indicatorLabel.text = 'Loading result...'
            indicatorLabel.align = 'center'
            indicatorLabel.valign = 'middle'
            indicatorLabel.fontSize = 20
            return chartLoader;
        },
        getHiddenSeriePropertyKey(series) {
            const compare = this.compareWithPrevious ? 'cpm_' : ''
            return ('series_' + compare + series.name + '-hidden').replaceAll(' ', '_')
        },
        isSerieHidden(series) {
            const keyHiddenChart = localStorage.getItem(this.getHiddenSeriePropertyKey(series))
            if (this.compareWithPrevious) {
                const hiddenByDefault = !series.name.includes('Thrust') && !!this.previousComputation
                return keyHiddenChart != null ? keyHiddenChart === 'true' : hiddenByDefault
            } else {
                return keyHiddenChart === 'true'
            }
        },
        addEventHideShowSerie(series) {
            const keyHiddenChart = this.getHiddenSeriePropertyKey(series)
            series.events.on('hidden', () => localStorage.setItem(keyHiddenChart, true), this)
            series.events.on('shown', () => localStorage.setItem(keyHiddenChart, false), this)
        }
    },
    computed: {
        ...mapGetters('computation', ['currentComputation', 'previousComputation', 'compareWithPrevious'])
    },
    watch: {
        compareWithPrevious() {
            this.addDataInChart()
        },
        currentComputation() {
            this.addDataInChart()
        },
        units(newValue) {
            this.pressureSerie.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.resultPressureUnit}`
            this.massFluxSerie.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.massFluxUnit}`
            this.grainMass.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.grainMassUnit}`
        }
    },
    beforeUnmount() {
        // if (this.chart) {
        //     this.chart.dispose()
        // }
    }
}
</script>

<style>
  .thrust-graphic {
    width: 100vw;
    min-height: 600px;
  }
</style>
