<template>
  <div class="icon-wrap" :style="{ fontSize: size }">
    <span class="iconify m-iconify" :data-icon="icon"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    size: { type: String, default: "17" },
  },

  setup() {
    return {};
  },
});
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