<template>
  <div class="icon-wrap" :style="{ fontSize: props.size }">
    <!-- <span class="iconify m-iconify" :data-icon="icon"></span> -->
    <iconify-icon class="iconify m-iconify" :icon="props.icon"></iconify-icon>
  </div>
</template>

<script lang="ts" setup>
import "iconify-icon";

const props = withDefaults(
  defineProps<{
    icon: string;
    size: string;
  }>(),
  {
    icon: "",
    size: "17px",
  }
);

// props: {
//   icon: { type: String, required: true },
//   size: { type: String, default: "17px" },
// },
</script>

<style scoped lang="less">
.m-iconify {
  margin: 0 4px;
}
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
