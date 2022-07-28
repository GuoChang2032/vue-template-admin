<script lang='ts'>
import { defineComponent, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  name: "lineChart",
  setup() {
    let echart = echarts;
    onMounted(() => {
      init();
    });
    onUnmounted(() => {
      echart.dispose;
    });

    function init() {
      //@ts-ignore
      let chart = echart.init(document.getElementById("chart1"));
      chart.setOption({
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        tooltip: {
          trigger: "axis",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129,
            ],
            type: "line",
            smooth: true,
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        chart.resize();
      };
    }
    return {};
  },
});
</script>

<template>
  <div id="chart1" class="charts"></div>
</template>

<style scoped lang='less'>
</style>
