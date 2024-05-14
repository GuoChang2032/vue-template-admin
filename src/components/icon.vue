<template>
  <div class="icon-wrap" :style="{ fontSize: size }">
    <!-- <span class="iconify m-iconify" :data-icon="icon"></span> -->
    <iconify-icon class="iconify m-iconify" :icon="icon"></iconify-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import 'iconify-icon';
export default defineComponent({
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    size: { type: String, default: "17px" },
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