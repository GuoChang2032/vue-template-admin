<template>
  <!-- <div v-loading="loading" :element-loading-text="tips"> -->
  <n-config-provider
    :locale="language"
    :date-locale="datelanguage"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <n-notification-provider>
      <n-dialog-provider>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade-app">
            <keep-alive include="keepLive">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
  <!-- </div> -->
</template>

<script lang="ts">
import {
  zhCN,
  dateZhCN,
  enUS,
  dateEnUS,
  GlobalThemeOverrides,
  darkTheme,
} from "naive-ui";
import { useIndex } from "@/stores/indexStore";
import { useI18n } from "vue-i18n";
import type { NLocale, NDateLocale, GlobalTheme } from "naive-ui";

// import m from "@/utils/mitt";
export default defineComponent({
  setup() {
    const loading = ref(false);
    const inver = useIndex();
    const theme = ref<GlobalTheme>();
    const tips = ref("");
    const i18n = useI18n();
    const language = ref<NLocale>(zhCN);
    const datelanguage = ref<NDateLocale>(dateZhCN);
    watch(
      () => [inver.getInverted, i18n.locale.value],
      (nv, ov) => {
        if (nv[0]) {
          theme.value = darkTheme;
        } else {
          theme.value = undefined;
        }
        if (i18n.locale.value === "zh") {
          language.value = zhCN;
          datelanguage.value = dateZhCN;
        } else {
          language.value = enUS;
          datelanguage.value = dateEnUS;
        }
      }
    );

    onMounted(() => {
      if (inver.getInverted) {
        theme.value = darkTheme;
      } else {
        theme.value = undefined;
      }
    });

    // naive组件的主题颜色
    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: "#5A67BA",
        primaryColorHover: "#6d77b5",
        primaryColorPressed: "#4c5bb5",
      },
    };

    return {
      language,
      datelanguage,
      theme,
      loading,
      tips,
      themeOverrides,
    };
  },
});
</script>
<style>
.slide-fade-app-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
}

.slide-fade-app-enter-from,
.slide-fade-app-leave-to {
  opacity: 0;
}
</style>
