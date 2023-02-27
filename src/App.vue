<template>
  <!-- <div v-loading="loading" :element-loading-text="tips"> -->
  <n-config-provider
    :locale="language"
    :date-locale="datelanguage"
    :theme="theme"
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
// import m from "@/utils/mitt";
export default defineComponent({
  setup() {
    const loading = ref(false);
    const inver = useIndex();
    const theme = ref<any>(null);
    const tips = ref("");
    const i18n = useI18n();
    const language = ref<any>(zhCN);
    const datelanguage = ref<any>(dateZhCN);
    watch(
      () => [inver.getInverted, i18n.locale.value],
      (nv, ov) => {
        if (nv[0]) {
          theme.value = darkTheme;
        } else {
          theme.value = null;
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
        theme.value = null;
      }
    });

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: "#5983b8",
        primaryColorHover: "#79a4da",
        primaryColorPressed: "#426897",
      },
    };

    // m.on("switch", (e: any) => {
    //   if (e.val) {
    //     theme.value = darkTheme;
    //   } else {
    //     theme.value = null;
    //   }
    // });

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
<style></style>
