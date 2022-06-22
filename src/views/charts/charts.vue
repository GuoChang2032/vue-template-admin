<script lang='ts'>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import lineChart from "@/components/chartComponents/lineCahrt.vue";
import chart2 from "@/components/chartComponents/chart2.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { lineChart, chart2 },
  setup() {
    const router = useRouter();
    return {
      goBack() {
        router.go(-1);
      },
    };
  },
});
</script>

<template>
  <div class="main-container">
    <el-page-header content="echarts图表" @back="goBack" />
    <el-row :gutter="15">
      <el-col :span="12">
        <lineChart />
      </el-col>
      <el-col :span="12">
        <chart2 />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='less'>
.main-container {
  padding: 20px 30px;
}
.charts {
  width: 100%;
  height: 450px;
}
</style>
