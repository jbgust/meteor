<template>
  <div class="thrust-graphic" id="thrust-chart" ref="motorParameters">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export default {
    name: 'thrust-graphical-result',
    data() {
        return {
            chart: null,
            pressureSerie: null,
            massFluxSerie: null,
            chartLoader: null
        }
    },
    props: {
        units: Object
    },
    mounted() {
        let chart = am4core.create(this.$refs.motorParameters, am4charts.XYChart)
        this.createChartLoader(chart)

        chart.paddingRight = 20
        chart.numberFormatter.numberFormat = '.##'
        chart.exporting.menu = new am4core.ExportMenu()

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'x'
        categoryAxis.title.text = 'Burn time (sec.)'
        categoryAxis.baseValue = 0

        chart.colors.step = 2

        this.createAxisAndSeries(chart, 'kn', 'KN', true, 'triangle')
        this.pressureSerie = this.createAxisAndSeries(chart, 'p', 'Chamber pressure', true, 'rectangle', this.units.resultPressureUnit)
        this.massFluxSerie = this.createAxisAndSeries(chart, 'm', 'Mass flow rate', true, 'sqare', this.units.massFluxUnit)
        this.createAxisAndSeries(chart, 'y', 'Thrust', false, 'circle', 'N')

        chart.cursor = new am4charts.XYCursor()

        categoryAxis.adapter.add('getTooltipText', (text) => {
            return Number.parseFloat(text).toFixed(2)
        })

        chart.preloader.disabled = true
        chart.events.on('validated', function(ev) {
            if (this.chartLoader) {
                this.chartLoader.hide()
            }
        }, this)
        chart.events.on('beforedatavalidated', function(ev) {
            if (this.chartLoader) {
                this.chartLoader.show()
            }
        }, this)

        chart.legend = new am4charts.Legend()

        this.chart = chart
    },
    methods: {
        createAxisAndSeries(chart, field, name, opposite, bullet, unit = '') {
            // see https://www.amcharts.com/demos/multiple-value-axes/
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

            var series = chart.series.push(new am4charts.LineSeries())
            series.dataFields.valueY = field
            series.dataFields.categoryX = 'x'
            series.strokeWidth = 2
            series.yAxis = valueAxis
            series.name = name
            series.tooltipText = `{name}: [bold]{valueY}[/] ${unit}`

            valueAxis.renderer.line.strokeOpacity = 1
            valueAxis.renderer.line.strokeWidth = 2
            valueAxis.renderer.line.stroke = series.stroke
            valueAxis.renderer.labels.template.fill = series.stroke
            valueAxis.renderer.opposite = opposite
            valueAxis.renderer.grid.template.disabled = true

            return series
        },
        createChartLoader(chart) {
            this.chartLoader = chart.tooltipContainer.createChild(am4core.Container)
            this.chartLoader.background.fill = am4core.color('#fff')
            this.chartLoader.background.fillOpacity = 0.8
            this.chartLoader.width = am4core.percent(100)
            this.chartLoader.height = am4core.percent(100)

            let indicatorLabel = this.chartLoader.createChild(am4core.Label)
            indicatorLabel.text = 'Loading result...'
            indicatorLabel.align = 'center'
            indicatorLabel.valign = 'middle'
            indicatorLabel.fontSize = 20
        }
    },
    watch: {
        units(newValue, oldValue) {
            this.pressureSerie.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.resultPressureUnit}`
            this.massFluxSerie.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.massFluxUnit}`
        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose()
        }
    }
}
</script>

<style scoped>
  .thrust-graphic {
        width: 100%;
        height: 100%;
  }

  @media all and (max-width: 1280px) {
      .thrust-graphic {
          min-height: 350px;
      }
  }
</style>
