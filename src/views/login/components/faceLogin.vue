<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    return {
      back() {
        emit("callback", { type: "1" });
      },
    };
  },
});
</script>

<template>
  <div class="l-c-head">人脸登录</div>
  <div style="margin: 30px 60px">暂不支持</div>
  <div class="other-btn">
    <n-button block @click="back"> 返 回 </n-button>
  </div>
</template>

<style scoped lang="less">
.l-c-head {
  font-size: 28px;
  margin: 15px 0;
}
</style>
