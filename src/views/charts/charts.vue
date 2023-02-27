<script lang="ts" setup>
import lineChart from "@/components/chartComponents/lineCahrt.vue";
import chart2 from "@/components/chartComponents/chart2.vue";
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="main-container">
    <n-page-header subtitle="echarts图表" @back="goBack"> </n-page-header>
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

<style scoped lang="less">
.main-container {
  padding: 20px 30px;
}
.charts {
  width: 100%;
  height: 450px;
}
</style>
