<script lang="ts" setup>
import { Message } from "@/utils/utils";
import { pageType } from "@/utils/types";
import { onMounted } from "vue";
import btnComponents from "@/components/btns/btnComponents.vue";
onMounted(() => {});

const pageObj = ref<pageType>({
  total: 0,
  page: 1,
});
const selectArr = ref<any>([]);

const addHandle = () => {
  Message("success", "添加");
};
const searchHandle = () => {
  Message("success", "搜索");
};
const resetHandle = () => {
  Message("success", "重置");
};
const exportHandle = () => {
  Message("success", "导出");
};
const importHandle = () => {
  Message("success", "导入");
};
const operation = (val: any) => {
  selectArr.value = val.selectItem;
};
</script>

<template>
  <themeComponent>
    <div class="mb-8">
      <n-space :size="[25, 10]">
        <div class="flex items-center">
          <div class="w-12" for="">角色</div>
          <n-input placeholder="选择用户角色" class="w-64" />
        </div>
        <div class="flex items-center">
          <div class="w-12" for="">名称</div>
          <n-input placeholder="输入用户名称" class="w-64" />
        </div>
        <div class="flex items-center">
          <div class="w-12" for="">状态</div>
          <n-select placeholder="选择用户状态" class="w-64" :options="[]" />
        </div>
        <btnComponents type="search" @callback="searchHandle" text="搜索" />
        <btnComponents type="reset" @callback="resetHandle" text="重置" />
      </n-space>
    </div>
    <div class="mb-8">
      <n-space :size="[25, 5]" align="center">
        <btnComponents type="add" @callback="addHandle" text="新建用户" />
        <btnComponents
          v-if="selectArr && selectArr.length > 0"
          type="export"
          @callback="exportHandle"
          text="导出用户"
        />
        <btnComponents type="import" @callback="importHandle" text="导入用户" />
      </n-space>
    </div>
    <div>
      <tableComponent
        :editor="true"
        :delete="true"
        :detail="true"
        :selection="true"
        @callback="operation"
        :data="[
          { name: 'giegie', age: 18, id: '001' },
          { name: 'giegie2', age: 18, id: '002' },
          { name: 'giegie3', age: 18, id: '003' },
        ]"
        :column="[
          { prop: 'id', label: '编号', width: '80' },
          { prop: 'name', label: '名称' },
          { prop: 'gender', label: '性别', width: '100' },
          { prop: 'age', label: '年龄', width: '200' },
          { prop: 'address', label: '地址' },
          { prop: 'status', label: '状态', width: '150' },
        ]"
      >
      </tableComponent>
      <pagination :total="pageObj.total" :current="pageObj.page" />
    </div>
  </themeComponent>
</template>

<style scoped lang="less"></style>
