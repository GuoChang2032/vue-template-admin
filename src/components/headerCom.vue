<script lang="ts" setup>
import { useRouter } from "vue-router";
const options = ref<any>([
  {
    label: "个人中心",
    key: "1",
  },
  {
    label: "退出登录",
    key: "2",
  },
]);
const router = useRouter();
const goCenter = () => {
};
</script>

<template>
  <div class="header flex-between">
    <div class="h-left flex-center-start">
      <img src="@/assets/logo.png" style="width: 50px" alt="" />
      <span class="h-l-topic">Header</span>
    </div>
    <div class="h-right">
      <!-- <n-dropdown trigger="hover" :options="options" @select="handleSelect"> -->
      <div class="flex-center" style="cursor: pointer" @click="goCenter">
        <n-avatar
          round
          size="large"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
        <span class="h-r-a-name">张三</span>
      </div>
      <!-- </n-dropdown> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.h-r-a-name {
  color: #fff;
  font-size: 17px;
  margin-left: 10px;
}
.header {
  padding: 15px 30px;
  background-color: #5984b8;
}
.h-l-topic {
  font-size: 24px;
  color: #fff;
  margin-left: 10px;
}
.h-right {
  text-align: right;
}
</style>
