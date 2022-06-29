<template>
  <!-- <n-message-provider> -->
  <div v-loading="loading" :element-loading-text="tips">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view />
    </n-config-provider>
  </div>
  <!-- </n-message-provider> -->
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import { NConfigProvider, zhCN, dateZhCN, useMessage } from "naive-ui";
import bus from "@/utils/bus";
export default defineComponent({
  components: { NConfigProvider },
  setup() {
    // window.$message = useMessage();
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
      zhCN,
      dateZhCN,
    };
  },
});
</script>