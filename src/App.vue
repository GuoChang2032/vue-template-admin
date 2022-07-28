<template>
  <div v-loading="loading" :element-loading-text="tips">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view />
    </n-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import bus from "@/utils/bus";

export default defineComponent({
  components: { },
  setup() {
    onUnmounted(() => {
      bus.off("loading");
    });

    bus.on("loading", (params: any) => {
      if (params.desc) {
        tips.value = params.desc;
      } else {
        tips.value = "";
      }
      loading.value = params.show;
    });

    const loading = ref(false);
    const tips = ref("");

    return {
      loading,
      tips,
      themeOverrides,
    };
  },
});
</script>
<style>
.xxx span {
  color: #d3af38;
}
</style>