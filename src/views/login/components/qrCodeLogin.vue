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
  <div class="l-c-head">二维码登录</div>
  <img class="qr-code" src="@/assets/qrcode.png" alt="" />
  <n-divider title-placement="center"> 使用微信扫码即可登录 </n-divider>
  <div class="other-btn">
    <n-button block @click="back"> 返回 </n-button>
  </div>
</template>

<style scoped lang="less">
.qr-code {
  width: 250px;
  margin: 25px 0 0;
}
.l-c-head {
  font-size: 28px;
  margin: 15px 0;
}
</style>
