<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chart2 = ref();
let echart = echarts;
onMounted(() => {
  initChart2();
});
onUnmounted(() => {
  echart.dispose;
});

const initChart2 = () => {
  let chart = echart.init(chart2.value);
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
        data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
        type: "line",
        smooth: true,
      },
    ],
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
};
</script>

<template>
  <div ref="chart2" class="charts"></div>
</template>

<style scoped lang="less"></style>
