<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
onMounted(() => {});
const xx = ref<number>(0);
const increment = () => {
  xx.value++;
};
</script>

<template>
  <div>
    <p>:{{ xx}}</p>
    <n-button @click="increment">++++++++++</n-button>
  </div>
</template>

<style scoped lang="less"></style>
