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
import { zhCN, dateZhCN, GlobalThemeOverrides } from "naive-ui";

export default defineComponent({
  components: {zhCN, dateZhCN},
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
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: "#5983b8",
        primaryColorHover: "#79a4da",
        primaryColorPressed: "#426897",
      },
    };
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
