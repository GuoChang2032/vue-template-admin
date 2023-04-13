<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});

const ur = useRouter()

const goback = ()=>{
  ur.push({path:'/index',replace:true})
}

</script>

<template>
  <div
    class="container flex items-center justify-center h-full  justify-items-center"
  >
    <div class="text-center">
      <img class="h-96" src="@/assets/no-permission.svg" alt="" />
      <div class="mt-6 mb-8 text-base font-semibold text-gray-700">你没有权限访问该页面  :( </div>

      <n-button type="primary" @click="goback">返回首页</n-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
