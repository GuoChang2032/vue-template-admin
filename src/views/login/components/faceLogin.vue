<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup(props, { emit }) {
    const { t } = useI18n();
    return {
      back() {
        emit("callback", { type: "1" });
      },
      t,
    };
  },
});
</script>

<template>
  <div class="l-c-head">{{ t("form.login.faceLogin") }}</div>
  <div style="margin:30px 0">{{ t("form.login.notSupport") }}</div>
  <div class="other-btn">
    <n-button block @click="back"> {{ t("form.login.return") }} </n-button>
  </div>
</template>

<style scoped lang="less">
.l-c-head {
  font-size: 28px;
  margin: 15px 0;
}
</style>
