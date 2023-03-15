<script lang="ts" setup>
import { Message } from "@/utils/utils";
import { onMounted } from "vue";
import { pageType } from "@/utils/types";
import menuDrawer from "@/views/sys/components/menuDrawer.vue";
onMounted(() => {});

const show = ref<boolean>(false);

const tableData = ref<any>([
  {
    id: "1",
    routeName: "dashboard",
    routeIcon: "add",
    routePath: "layout",
    sort: "1",
    status: 1,
    children: [
      {
        id: "11",
        routeName: "首页",
        routeIcon: "",
        routePath: "/dashboard/index",
        sort: "1",
        status: 1,
      },
      {
        id: "12",
        routeName: "统计",
        routeIcon: "statistics",
        routePath: "/dashboard/statistics",
        sort: "2",
        status: 1,
      },
    ],
  },
]);
const pageObj = ref<pageType>({
  total: 0,
  page: 1,
});

const searchHandle = () => {
  Message("success", "搜索");
};
const resetHandle = () => {
  Message("success", "重置");
};
const addHandle = () => {
  show.value = true;
};
const confirmHandle = ()=>{
  Message('success','confirm!')
}
</script>

<template>
  <themeComponent>
    <div class="mb-8">
      <n-space :size="[25, 10]">
        <div class="flex items-center">
          <div class="w-20" for="">菜单名称</div>
          <n-input placeholder="输入菜单名称" class="w-64" />
        </div>
        <btnComponents type="search" @callback="searchHandle" text="搜索" />
        <btnComponents type="reset" @callback="resetHandle" text="重置" />
      </n-space>
    </div>
    <div class="mb-8">
      <btnComponents type="add" @callback="addHandle" text="新建路由" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" row-key="id">
        <el-table-column label="菜单名称" prop="routeName" />
        <el-table-column label="图标" prop="routeIcon" />
        <el-table-column label="组件路径" prop="routePath" />
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="状态" prop="status" />
        <el-table-column label="操作">
          <template #default="props">
            <n-button class="mr-4" text type="info">编辑</n-button>
            <n-button text type="error">删除</n-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="pageObj.total" :current="pageObj.page" />
    </div>
    
        <menuDrawer :show="show" @cancel="show=false" @confirm="confirmHandle"/>
      
  </themeComponent>
</template>

<style scoped lang="less"></style>
