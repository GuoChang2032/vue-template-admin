<script lang="ts" setup>
import { onMounted } from "vue";
import {switchTab} from '@/utils/utils'
onMounted(() => {});

const ur = useRouter();
const goBack = () => {
  switchTab('index')
  ur.push({ path: "/index", replace: true });
};
</script>

<template>
  <div
    class="container flex items-center justify-center h-full  justify-items-center"
  >
    <div class="text-center">
      <img class="h-96" src="@/assets/not-found.svg" alt="" />
      <div class="mt-6 mb-8 text-base font-semibold text-gray-700">
        页面不存在 :(
      </div>

      <n-button type="primary" @click="goBack">返回首页</n-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
