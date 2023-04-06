<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log('一给我里giao')
});
</script>

<template>
  <n-card class="mb-3" title="富文本编辑器">
    <w-editor />
  </n-card>
  <n-card class="mb-3" title="代码编辑器">
    <code-mirror />
  </n-card>
</template>

<style scoped lang="less"></style>
