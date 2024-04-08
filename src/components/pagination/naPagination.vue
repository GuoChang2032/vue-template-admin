<script lang="ts" setup>
import { onMounted } from "vue";
const props = defineProps(["page", "total", "pageSize"]);

watch(
  () => props.page, 
  (newVal: number) => {
    pageNo.value = newVal;
  }
)

watch(
  () => props.total, 
  (newVal: number) => {
    pageTotal.value = newVal;
  }
)

watch(
  () => props.pageSize, 
  (newVal: number) => {
    pageSize.value = newVal;
  }
)

const emits = defineEmits(["pageChange"]);
const pageNo = ref<number>(1);
const pageSize = ref<number>(20);
const pageTotal = ref<number>(0);

onMounted(() => {
  pageNo.value = props.page;
  pageTotal.value = props.total;
  pageSize.value = props.pageSize || 20;
});

const pageChange = (page: number) => {
  emits("pageChange", { page });
};
</script>

<template>
  <div v-if="pageTotal > 0" class="flex justify-end py-4">
    <n-pagination
      v-model:page="pageNo"
      v-model:default-page="pageNo"
      v-model:item-count="pageTotal"
      v-model:page-size="pageSize"
      @update:page="pageChange"
    />
  </div>
</template>

<style scoped lang="less">
</style>
