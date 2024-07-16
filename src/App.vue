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

<script lang="ts" setup>
import { zhCN, dateZhCN, GlobalThemeOverrides } from "naive-ui";

const loading = ref(false);
const tips = ref("");

// 组件样式
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#5983b8",
    primaryColorHover: "#79a4da",
    primaryColorPressed: "#426897",
  },
};
</script>
<style></style>
