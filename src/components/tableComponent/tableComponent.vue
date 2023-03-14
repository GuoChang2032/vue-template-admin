<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});

const emits = defineEmits(["callback"]);
const props = defineProps(["data", "column", "delete", "detail", "editor"]);
const cb = (type: number) => {
  // 1编辑,2详情,3删除
  emits("callback", { type });
};
</script>

<template>
  <el-table :data="props.data">
    <template v-if="props.column && props.column.length > 0">
      <!-- 数据栏 -->
      <el-table-column
        v-for="item in props.column"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
      >
        <!-- <slot name="image" :col="item">

        </slot>
        <slot name="href"></slot> -->

      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column label="操作" v-if="props.delete || props.detail || props.editor">
        <n-button class="mr-3" text type="info" v-if="props.editor" @click="cb(1)"
          >编辑</n-button
        >
        <n-button class="mr-3" text type="info" v-if="props.detail" @click="cb(2)"
          >详情</n-button
        >
        <n-button class="mr-3" text type="error" v-if="props.delete" @click="cb(3)"
          >删除</n-button
        >
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="less"></style>
