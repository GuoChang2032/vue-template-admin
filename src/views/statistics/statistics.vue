<script lang="ts" setup>
import { onMounted } from "vue";
import { topChart, btmContent } from "./components";
onMounted(() => {});
</script>

<template>
  <div>
    <n-space :size=[0,15] vertical>
      <topChart/>
      <btmContent />
    </n-space>
  </div>
</template>

<style scoped lang="less"></style>
