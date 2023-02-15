<script lang="ts" setup>
import { ref } from "vue";
import {
  accountLogin,
  phoneLogin,
  register,
  qrCodeLogin,
  faceLogin,
  resetPwd,
} from "@/views/login/components";
import { useIndex } from "@/stores/indexStore";
import { useI18n } from "vue-i18n";
import { Message } from "@/utils/utils";

const ui = useIndex();
const inverted = ref<boolean>(ui.getInverted);
const { t } = useI18n();
const i18n = useI18n();
const type = ref<string>("1");

const handleCallback = (e: any) => {
  type.value = e.type;
};
const handleSelect = () => {
  let k = i18n.locale.value;
  Message("success", `切换${k === "zh" ? "英语" : "中文"}成功`);
  if (k === "zh") {
    i18n.locale.value = "en";
  } else {
    i18n.locale.value = "zh";
  }
};
</script>

<template>
  <div :class="['container', inverted ? 'black' : '']">
    <!-- <div class="container"> -->
    <div class="i18n-content">
      <n-button quaternary @click="handleSelect">
        <template #icon><icon icon="mdi:language" size="23px" /></template>
        {{ i18n.locale.value === "zh" ? "中" : "英" }}
      </n-button>
    </div>
    <div class="main flex-center">
      <div class="low-screen">
        <div class="flex-center-start">
          <img class="h-c-logo" src="@/assets/logo.png" alt="" />
          <span class="h-c-topic">{{ t("header.title") }}</span>
        </div>
      </div>
      <div :class="[inverted ? 'm-left-w' : 'm-left']">
        <div class="head-content">
          <div class="flex-center-start">
            <img class="h-c-logo" src="@/assets/logo.png" alt="" />
            <span class="h-c-topic">{{ t("header.title") }}</span>
          </div>
        </div>
        <div class="svg-content">
          <img src="@/assets/subalaxi.svg" alt="" />
        </div>
        <div class="g-topic2">{{ t("header.title") }}</div>
        <div class="g-subtitle">
          {{ t("header.desc") }}
        </div>
      </div>
      <div class="m-right flex-center-start">
        <div
          class="login-card"
          :style="{
            backgroundColor: +inverted ? 'rgb(39, 39, 39)' : '#fff',
          }"
        >
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
          <template v-else-if="type === '6'">
            <resetPwd @callback="handleCallback" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.black {
  background-color: rgb(39, 39, 39);
}
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
  position: relative;
  width: 100%;
  height: 100%;
}
.i18n-content {
  position: absolute;
  z-index: 999;
  top: 50px;
  right: 50px;
}

.login-card {
  padding: 15px;
  @media screen and (max-width: 900px) {
    padding: 1rem 2rem;
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
.m-left-w {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 55%;
  padding: 4rem 4.5rem 4rem 6rem;
  box-sizing: border-box;
  display: block;
  // &::before {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   z-index: -1;
  //   width: 100%;
  //   height: 100%;
  //   background-image: url(@/assets/login-bg.svg);
  //   background-position: 100%;
  //   background-repeat: no-repeat;
  //   background-size: auto 100%;
  //   content: "";
  // }
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
.m-left {
  position: relative;
  z-index: 1;
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
