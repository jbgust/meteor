<template>
  <div class="thrust-graphic" >
      <div style="position: absolute;z-index: 99;background-color: white;" class="thrust-graphic" v-if="loadingGraphic">
          <div style="width: 150px;text-align: center;position: relative;top: 50%;left: 50%;transform: translate(-50%, -50%)">
              <v-icon size="90" color="primary">refresh</v-icon>
              <h3>Loading chart...</h3>
          </div>
      </div>
      <div class="thrust-graphic" ref="thrustResult">
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
            loadingGraphic: false
        }
    },
    mounted() {
        let chart = am4core.create(this.$refs.thrustResult, am4charts.XYChart)

        chart.paddingRight = 20

        chart.numberFormatter.numberFormat = '.##'
        chart.exporting.menu = new am4core.ExportMenu()

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'x'
        categoryAxis.title.text = 'Thrust time (sec.)'
        categoryAxis.baseValue = 0

        // Create value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.baseValue = 0
        valueAxis.title.text = 'Thrust (N)'

        // Create series
        var series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = 'y'
        series.dataFields.categoryX = 'x'
        series.tooltipText = "{valueY.value.formatNumber('#.')} N /  {categoryX.formatNumber('.##')} s"
        series.strokeWidth = 2

        chart.cursor = new am4charts.XYCursor()

        categoryAxis.adapter.add('getTooltipText', (text) => {
            return Number.parseFloat(text).toFixed(2)
        })

        chart.preloader.disabled = true
        chart.events.on('validated', function(ev) {
            this.loadingGraphic = false
        }, this)
        chart.events.on('beforedatavalidated', function(ev) {
            this.loadingGraphic = true
        }, this)

        this.chart = chart
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
