<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});
</script>

<template>
  <div class="flex w-full p-2 cursor-pointer hover:bg-gray-100">
    <div class="flex-1 flex-none mr-2">
      <n-avatar
        size="small"
        round
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </div>
    <div class="flex-grow flex-4">
      <div class="mb-2 text-base text-overflow-ellipsis">
        马斯克重回世界首富宝座!
      </div>
      <div class="mb-2 text-sm text-overflow-ellipsis-3">
        据可靠消息,马斯克重回世界首富宝座,身价达到1850亿美元
      </div>

      <div class="text-sm text-gray-400">30分钟前 来自系统</div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
