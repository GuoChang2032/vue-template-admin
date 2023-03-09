<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});

const props = defineProps({
  desc: String,
});
</script>

<template>
  <div class="p-5">
    <n-empty :description="props.desc || '没有内容...'">
      <template #icon>
        <icon icon="mdi:bell-off-outline" size="60px" />
      </template>
    </n-empty>
  </div>
</template>

<style scoped lang="less"></style>
