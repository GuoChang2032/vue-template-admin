<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="container">
    <div class="main flex-center">
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
            <span class="h-c-topic">熠朗企业级低代码平台</span>
          </div>
        </div>
        <div class="svg-content">
          <img src="@/assets/subalaxi.svg" alt="" />
        </div>
        <div class="g-topic2">熠朗企业级低代码平台</div>
        <div class="g-subtitle">
          是宇宙最具影响力的
          企业级低代码平台！在线开发，可视化拖拽设计，零代码实现80%的基础功能~
          全自动生成代码，无需人工，真正的心想事成。
        </div>
      </div>
      <div class="m-right flex-center-start">
        <div class="login-card">
          aaaaa 
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.m-right{
  width: 45%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   margin-left: -48%;
  //   background-image: url(@/assets/login-bg.svg);
  //   background-position: 100%;
  //   background-repeat: no-repeat;
  //   background-size: auto 100%;
  //   content: "";
  //   z-index: 0;
  // }
}
.main {
  height: 100%;
  width: 100%;
}
.m-left {
  position: relative;
  height: 100%;
  width: 55%;
  padding: 4rem 4.5rem;
  box-sizing: border-box;
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
}
.svg-content{
  margin: 4rem auto 100px;
  text-align: center;
  img{
    width: 400px;
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
    font-weight: bold;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
}
.g-topic2,.g-subtitle{
  color: #fff;
  margin-bottom: 10px;
}
</style>
