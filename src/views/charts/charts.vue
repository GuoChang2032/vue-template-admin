<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});
</script>

<template>
  <n-card class="mb-4" title="折线图表">
    <lineChart />
  </n-card>
  <n-card class="mb-4" title="折线柱状">
    <lineChart2 />
  </n-card>
</template>

<style scoped lang="less"></style>
