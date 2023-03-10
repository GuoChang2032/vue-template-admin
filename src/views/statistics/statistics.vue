<script lang="ts" setup>
import { onMounted } from "vue";
import { topChart, btmContent,weather } from "./components";
onMounted(() => {});
</script>

<template>
  <div class="pb-4">
    <n-space :size=[0,15] vertical>
      <weather/>
      <topChart/>
      <btmContent />
    </n-space>
  </div>
</template>

<style scoped lang="less"></style>
