<script lang="ts" setup>
import { onMounted ,ref} from "vue";
import {useDark, useToggle} from '@vueuse/core'
onMounted(() => {});
const isDark = useDark()
const toggleDark = useToggle(isDark)
const tableData = ref<any>([])
</script>

<template>
  <div class="p-5 h-full">
    <!-- element的主题改变有用 -->
    <el-button @click="toggleDark()">默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="info">info按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  </div>
</template>

<style scoped lang="less"></style>
