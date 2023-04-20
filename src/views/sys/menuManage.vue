<script lang="ts" setup>
import { Message, routeMenuAdd } from "@/utils/utils";
import { onMounted } from "vue";
import { pageType, MenuDataType } from "@/utils/types";
import menuDrawer from "@/views/sys/components/menuDrawer.vue";
import { useMenus } from "@/stores/menu";
import { useRouter } from "vue-router";
import _ from "super-tools-lib";
import http from "@/service/http";
onMounted(() => {
  getList();
});

const router = useRouter();
const um = useMenus();
const show = ref<boolean>(false);
const loading = ref<boolean>(false);
const tableData = ref<MenuDataType[]>([]);
const pageObj = ref<pageType>({
  total: 0,
  page: 1,
});
const menuItem = ref<MenuDataType>();

// watch(
//   () => um.getMenus,
//   (nv, ov) => {
//     tableData.value = nv;
//   }
// );

const getList = () => {
  loading.value = true;
  http
    .get("/getMenuList?pageNo=1&pageSize=10")
    .then((res) => {
      if (res.success) {
        tableData.value = res.data;
        pageObj.value.total = res.records.total;
      }
    })
    .catch((err) => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const searchHandle = () => {
  Message("success", "搜索");
};
const resetHandle = () => {
  Message("success", "重置");
};
const addHandle = () => {
  show.value = true;
};

interface confirmType {
  value: MenuDataType;
}

const successHandle = () => {
  show.value = false;
  getList();
};

const confirmHandle = (params: confirmType) => {
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
  http
    .delete("/deleteMenu?id=" + id)
    .then((res) => {
      if (res.success) {
        Message("success", "删除成功");
        getList();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const editMenu = (item: MenuDataType) => {
  menuItem.value = _.cloneDeep(item);
  show.value = true;
};
</script>

<template>
  <themeComponent>
    <n-spin :show="loading">
      <div>
        <n-space :size="[25, 10]">
          <div class="flex items-center">
            <div class="w-20" for="">菜单名称</div>
            <n-input placeholder="输入菜单名称" class="w-64" />
          </div>
          <btnComponents type="search" @callback="searchHandle" text="搜索" />
          <btnComponents type="reset" @callback="resetHandle" text="重置" />
        </n-space>
      </div>
      <div class="my-4">
        <btnComponents type="add" @callback="addHandle" text="新建路由" />
      </div>
      <n-alert class="mb-6" title="提示" type="info" closeable>
        生成页面路由需要手动添加路由配置，然后还得有那个页面
      </n-alert>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
        >
          <el-table-column label="路由名称" prop="menuName" />
          <el-table-column label="路由Key" prop="menuKey" />
          <el-table-column
            header-align="center"
            label="菜单图标"
            prop="menuIcon"
          >
            <template #default="scope">
              <icon :icon="scope.row.menuIcon" />
            </template>
          </el-table-column>
          <el-table-column label="组件路径" prop="pagePath" />
          <el-table-column label="排序" prop="menuSort" />
          <el-table-column label="状态" prop="status">
            <template #default="scope">
              <n-tag v-if="scope.row.status === '1'" type="success">
                正常
              </n-tag>
              <n-tag v-else-if="scope.row.status === '0'" type="error">
                隐藏
              </n-tag>
              <n-tag v-else-if="scope.row.status === '2'" type="info">
                锁定
              </n-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="props">
              <n-button
                class="mr-4"
                text
                type="info"
                @click="editMenu(props.row)"
                >编辑</n-button
              >
              <n-popconfirm @positive-click="deleteMenu(props.row.id)">
                <template #trigger>
                  <n-button text type="error">删除</n-button>
                </template>
                确定删除吗?
              </n-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="pageObj.total" :current="pageObj.page" />
      </div>
    </n-spin>
    <menuDrawer
      :show="show"
      @cancel="show = false"
      @confirm="confirmHandle"
      @success="successHandle"
      :itemData="menuItem"
    />
  </themeComponent>
</template>

<style scoped lang="less"></style>
