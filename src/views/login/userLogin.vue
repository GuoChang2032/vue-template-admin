<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  accountLogin,
  phoneLogin,
  register,
  qrCodeLogin,
  faceLogin,
} from "@/views/login/components";

export default defineComponent({
  components: { accountLogin, phoneLogin, qrCodeLogin, register,faceLogin },
  setup() {
    const type = ref<string>("1");
    return {
      type,
      handleCallback(e: any) {
        type.value = e.type;
      },
    };
  },
});
</script>

<template>
  <div class="container">
    <div class="main flex-center">
      <div class="low-screen">
        <div class="flex-center-start">
          <img class="h-c-logo" src="@/assets/logo.png" alt="" />
          <span class="h-c-topic">熠朗宇宙级无代码平台</span>
        </div>
      </div>
      <!-- <div class="head-content">
        <div class="flex-center-start">
          <img class="h-c-logo" src="@/assets/logo.png" alt="" />
          <span class="h-c-topic">熠朗企业级低代码平台</span>
        </div>
      </div> -->
      <div class="m-left">
        <div class="head-content">
          <div class="flex-center-start">
            <img class="h-c-logo" src="@/assets/logo.png" alt="" />
            <span class="h-c-topic">熠朗宇宙级无代码平台</span>
          </div>
        </div>
        <div class="svg-content">
          <img src="@/assets/subalaxi.svg" alt="" />
        </div>
        <div class="g-topic2">熠朗宇宙级无代码平台</div>
        <div class="g-subtitle">
          是全宇宙最具影响力的 无代码平台！脑机链接，零代码实现100%的功能~
          全自动生成代码，无需人工，真正的心想事成，无所不能。
        </div>
      </div>
      <div class="m-right flex-center-start">
        <div class="login-card">
          <template v-if="type === '1'">
            <accountLogin @callback="handleCallback" />
          </template>
          <template v-else-if="type === '2'">
            <phoneLogin @callback="handleCallback" />
          </template>
          <template v-else-if="type === '3'">
            <qrCodeLogin @callback="handleCallback" />
          </template>
          <template v-else-if="type === '4'">
            <faceLogin @callback="handleCallback" />
          </template>
          <template v-else-if="type === '5'">
            <register @callback="handleCallback" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.low-screen {
  position: absolute;
  top: 55px;
  left: 30px;
  display: none;
  .h-c-logo {
    width: 50px;
    margin-right: 15px;
  }
  .h-c-topic {
    font-size: 24px;
    color: #fff;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 900px) {
    display: block;
  }
}
.m-right {
  width: 45%;
  height: 100%;

  @media screen and (max-width: 900px) {
    width: auto;
  }
}
.container {
  width: 100%;
  height: 100%;
}
.login-card {
  @media screen and (max-width: 900px) {
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 0 15px -1px rgb(0 0 0 / 20%);
  }
}
.main {
  position: relative;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 900px) {
    background-image: url(@/assets/login-bg.jpg);
    background-repeat: repeat;

  }
}
.m-left {
  position: relative;
  height: 100%;
  width: 55%;
  padding: 4rem 4.5rem 4rem 6rem;
  box-sizing: border-box;
  display: block;
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";
  }
  @media screen and (max-width: 1245px) {
    padding: 4rem 3.5rem 4rem 4rem;
  }
  @media screen and (max-width: 1080px) {
    padding: 4rem 0 4rem 2rem;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
}
.svg-content {
  margin: 4rem auto 100px;
  img {
    width: 400px;
    @media screen and (max-width: 1245px) {
      width: 360px;
    }
  }
}
.head-content {
  margin: 0 10px;
  .h-c-logo {
    width: 50px;
    margin-right: 15px;
  }
  .h-c-topic {
    font-size: 24px;
    color: #fff;
    letter-spacing: 1px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
}
.g-topic2,
.g-subtitle {
  color: #fff;
  margin-bottom: 10px;
}
</style>
