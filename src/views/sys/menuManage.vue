<script lang="ts" setup>
import { Message, routeMenuAdd } from "@/utils/utils";
import { onMounted } from "vue";
import { pageType } from "@/utils/types";
import menuDrawer from "@/views/sys/components/menuDrawer.vue";
import { useMenus } from "@/stores/menu";
import { useRouter } from "vue-router";
import _ from "super-tools-lib";
onMounted(() => {});
const router = useRouter();
const um = useMenus();
const show = ref<boolean>(false);

const tableData = ref<any>(um.getMenus);
const pageObj = ref<pageType>({
  total: 0,
  page: 1,
});
const menuItem = ref<any>();

watch(
  () => um.getMenus,
  (nv, ov) => {
    tableData.value = nv;
  }
);

const searchHandle = () => {
  Message("success", "搜索");
};
const resetHandle = () => {
  Message("success", "重置");
};
const addHandle = () => {
  show.value = true;
};

const confirmHandle = (params: any) => {
  // 暂时无法动态生成路由,还是要手动添加,
  let temp = _.cloneDeep(um.getMenus);
  let val = params.value;
  if (val.parentMenu === "layout") {
    temp.push(val);
  } else {
    temp = routeMenuAdd(temp, val);
  }
  um.setMenus(temp);
  show.value = false;

  // 得想办法弄成响应式,不要重新加载页面
  location.reload();

  // Message("success", "confirm!");
};

// 后面用接口模拟吧，懒得写了
const deleteMenu = (id: string) => {
  Message("success", "delete " + id);
};
const editMenu = (item: any) => {
  menuItem.value = item;
  show.value = true;
};
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
    <n-alert class="mb-6" title="提示" type="info" closeable>
      生成页面路由需要手动添加路由配置，然后还得有那个页面
    </n-alert>
    <div>
      <el-table :data="tableData" style="width: 100%" row-key="key">
        <el-table-column label="菜单名称" prop="routeName" />
        <el-table-column label="Key" prop="key" />
        <el-table-column header-align="center" label="图标" prop="routeIcon">
          <template #default="scope">
            <icon :icon="scope.row.routeIcon" />
          </template>
        </el-table-column>
        <el-table-column label="组件路径" prop="path" />
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            <n-tag v-if="scope.row.status === 1" type="success"> 正常 </n-tag>
            <n-tag v-else type="error"> 隐藏 </n-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="props">
            <n-button class="mr-4" text type="info" @click="editMenu(props.row)"
              >编辑</n-button
            >
            <n-button text type="error" @click="deleteMenu(props.row.key)"
              >删除</n-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="pageObj.total" :current="pageObj.page" />
    </div>

    <menuDrawer
      :show="show"
      @cancel="show = false"
      @confirm="confirmHandle"
      :itemData="menuItem"
    />
  </themeComponent>
</template>

<style scoped lang="less"></style>
