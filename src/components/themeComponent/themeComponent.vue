<script lang="ts" setup>
import { onMounted } from "vue";
import { useIndex } from "@/stores/indexStore";

const ui = useIndex();
const inverted = ref<boolean>(ui.getInverted);
onMounted(() => {});
watch(
  () => ui.getInverted,
  (nv, ov) => {
    inverted.value = nv;
  }
);
</script>

<template>
  <div
    class="p-4 rounded-lg"
    :class="inverted ? 'bg-gray-900' : 'bg-white'"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less"></style>
