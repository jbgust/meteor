<template>
  <div class="thrust-graphic" >
      <div style="position: absolute;z-index: 99;background-color: white;" class="thrust-graphic" v-if="loadingGraphic">
          <div style="width: 150px;text-align: center;position: relative;top: 50%;left: 50%;transform: translate(-50%, -50%)">
              <v-icon size="90" color="primary">refresh</v-icon>
              <h3>Loading chart...</h3>
          </div>
      </div>
      <div class="thrust-graphic" ref="motorParameters">
      </div>
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
            loadingGraphic: false,
            pressureSerie: null,
            massFluxSerie: null,
            categoryAxis: null
        }
    },
    props: {
        units: Object
    },
    mounted() {
        let chart = am4core.create(this.$refs.motorParameters, am4charts.XYChart)

        chart.paddingRight = 20

        chart.numberFormatter.numberFormat = '.##'
        chart.exporting.menu = new am4core.ExportMenu()

        // Create axes
        this.categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        this.categoryAxis.dataFields.category = 'x'
        this.categoryAxis.title.text = 'Burn time (sec.)'
        this.categoryAxis.baseValue = 0

        chart.colors.step = 2

        this.createAxisAndSeries(chart, 'kn', 'KN', true, 'triangle')
        this.pressureSerie = this.createAxisAndSeries(chart, 'p', 'Chamber pressure', true, 'rectangle', this.units.pressureUnit)
        this.massFluxSerie = this.createAxisAndSeries(chart, 'm', 'Mass flow rate', true, 'sqare', this.units.massFluxUnit)
        this.createAxisAndSeries(chart, 'y', 'Thrust', false, 'circle', 'N')

        chart.cursor = new am4charts.XYCursor()

        this.categoryAxis.adapter.add('getTooltipText', (text) => {
            return Number.parseFloat(text).toFixed(2)
        })

        chart.preloader.disabled = true
        chart.events.on('validated', function(ev) {
            this.loadingGraphic = false
        }, this)
        chart.events.on('beforedatavalidated', function(ev) {
            this.loadingGraphic = true
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
        resetZoom() {
            this.categoryAxis.zoom({ start: 0, end: 1 })
        }
    },
    watch: {
        units(newValue, oldValue) {
            this.pressureSerie.tooltipText = `{name}: [bold]{valueY}[/] ${newValue.pressureUnit}`
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
