<template>
  <div class="thrust-graphic" ref="thrustResult">
  </div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: "thrust-graphical-result",
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      let chart = am4core.create(this.$refs.thrustResult, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.numberFormatter.numberFormat = ".##";

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "timeSinceBurnStartInSecond";
      categoryAxis.renderer.minGridDistance = 50;
      categoryAxis.renderer.grid.template.location = 0.5;
      categoryAxis.startLocation = -5;
      categoryAxis.endLocation = 10;
      categoryAxis.title.text = "Thrust time (sec.)";

      // Create value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.baseValue = 0;
      valueAxis.title.text = "Thrust (N)";


      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "thrustInNewton";
      series.dataFields.categoryX = "timeSinceBurnStartInSecond";
      series.tooltipText = "{valueY.value.formatNumber('#.')} N :  {categoryX.formatNumber('.##')} s";
      series.strokeWidth = 2;
      series.tensionX = 12;

      chart.cursor = new am4charts.XYCursor();
      /*
      categoryAxis.adapter.add("getTooltipText", (text) => {
       return ".###";
      });*/
        this.chart = chart
      console.log('data', this.chart.data)
      },

      beforeDestroy() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    }
</script>

<style scoped>
  .thrust-graphic {
    width: 100%;
    height: 100%;
  }
</style>
