<template>
  <div class="thrust-graphic" ref="thrustResult">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

am4core.unuseAllThemes()

export default {
    name: 'thrust-graphical-result',
    data() {
        return {
            chart: null
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
