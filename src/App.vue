<template>
  <!-- <div v-loading="loading" :element-loading-text="tips"> -->
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
    >
      <n-notification-provider>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-notification-provider>
    </n-config-provider>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import { zhCN, dateZhCN, GlobalThemeOverrides } from "naive-ui";

export default defineComponent({
  setup() {

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
      zhCN,
      dateZhCN,
      loading,
      tips,
      themeOverrides,
    };
  },
});
</script>
<style>
</style>
