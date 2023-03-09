<script lang="ts" setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
import { useIndex } from "@/stores/indexStore";

const echart = echarts;
const pieChart = ref();
const ui = useIndex();
const inverted = ref<boolean>(ui.getInverted);

onMounted(() => {
  initChart();
});

watch(
  () => ui.getInverted,
  (nv, ov) => {
    inverted.value = nv;
  }
);

const initChart = () => {
  let chart = echart.init(pieChart.value as HTMLElement);
  chart.setOption({
    legend: {
      orient: "horizontal",
      bottom: 5,
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: 100,
            name: "小程序",
          },
          {
            value: 200,
            name: "测试环境",
          },
          {
            value: 300,
            name: "服务器",
          },
          {
            value: 500,
            name: "前端调试",
          },
        ],
        roseType: "area",
      },
    ],
  });
  window.addEventListener("resize", () => {
    chart.resize();
  });
  setTimeout(() => {
    chart.resize();
  }, 150);
};
</script>

<template>
  <div class="p-4 rounded-lg shadow-md" :class="inverted?'bg-gray-800':'bg-white'">
    <div class="m-1.5 text-lg">接口数据访问方式</div>
    <div id="chart" ref="pieChart"></div>
  </div>
</template>

<style scoped lang="less">
#chart {
  width: 100%;
  height: 450px;
}
</style>
