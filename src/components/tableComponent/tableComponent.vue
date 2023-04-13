<script lang="ts" setup>
import { onMounted } from "vue";
import { UserManageListType,UserManageListDataType } from "@/utils/types";

onMounted(() => {});

const emits = defineEmits(["callback"]);
const props = defineProps({
  data:Array<UserManageListDataType>,
  column:Array<UserManageListType>,
  delete:Boolean,
  detail:Boolean,
  editor:Boolean,
  selection:Boolean,
});
const cb = (type: number, data?: UserManageListDataType) => {
  // 1编辑,2详情,3删除
  emits("callback", { type,data });
};

const handleSelectionChange = (val: []) => {
  emits("callback", { selectItem: val });
};
</script>
<!-- 简单的table可以用这个组件 -->
<template>
  <el-table :data="props.data" @selection-change="handleSelectionChange">
    <template v-if="props.column && props.column.length > 0">
      <el-table-column v-if="props.selection" type="selection" width="55" />
      <!-- 数据栏 -->
      <el-table-column
        v-for="item, idx in props.column"
        :key="idx"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column
        fixed="right"
        width="180"
        label="操作"
        v-if="props.delete || props.detail || props.editor"
      >
        <template #default="scope">
          <n-button
            v-if="props.editor"
            class="mr-3"
            text
            type="info"
            @click="cb(1, scope.row)"
            >编辑</n-button
          >
          <n-button
            v-if="props.detail"
            class="mr-3"
            text
            type="info"
            @click="cb(2)"
            >详情</n-button
          >
          <n-button
            v-if="props.delete"
            class="mr-3"
            text
            type="error"
            @click="cb(3, scope.row.id)"
            >删除</n-button
          >
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="less"></style>
