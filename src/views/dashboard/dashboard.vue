<script lang="ts" setup>
import http from "@/service/http";
import { Message, getUserInfo, judgePage } from "@/utils/utils";
import indexAddEditModalVue from "@/components/indexAddEditModal.vue";
import _ from "super-tools-lib";
import { useRouter } from "vue-router";
import Pagination from "@/components/pagination/pagination.vue";
import { useI18n } from "vue-i18n";
import { usePage } from "@/stores/user";

onMounted(() => {
  if (judgePage(r_page, "list")) {
    pageObj.value.page = r_page.getPage.page;
  }
  getList();
});

const r_page = usePage();
const pageObj = ref<any>({ page: 1, total: 0 });
const show = ref<boolean>(false);
const router = useRouter();
const courseOpt = ref<any>([]);
const getList = () => {};
const { t } = useI18n();
const more = ref<any>([
  { label: "复制", key: "1" },
  { label: "冻结", key: "2" },
  { label: "删除", key: "3" },
]);
const handleSelectionChange = (val: any) => {};
const tableData: any = [];
const create = () => {
  show.value = true;
};
const edit = (item: any) => {
  r_page.setPage(pageObj.value.page, "list");
  show.value = true;
};
const close = () => {
  show.value = false;
};
</script>
<template>
  <div class="container">
    <div class="search-content">
      <n-space>
        <n-select
          :placeholder="t('form.placeholder.course')"
          :options="courseOpt"
          style="width: 200px"
        ></n-select>
        <n-input :placeholder="t('form.placeholder.name')"></n-input>
        <n-date-picker :placeholder="t('form.placeholder.date')" type="date" />
      </n-space>
    </div>
    <div class="operation-content">
      <n-space>
        <n-button type="primary" @click="create">
          <template #icon>
            <Icon icon="mdi:file-document-plus-outline" size="17px" />
          </template>
          新建
        </n-button>
        <n-dropdown placement="bottom-start" trigger="hover" :options="more">
          <n-button>批量操作</n-button>
        </n-dropdown>
      </n-space>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="taskName" label="作业名称" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="lastTime" label="提交时间" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <n-space wrap>
              <n-button text tag="a" type="info" @click="edit(scope.row)">
                编辑
              </n-button>
              <n-dropdown
                placement="bottom-start"
                trigger="hover"
                :options="more"
              >
                <n-button text tag="a" type="info"> 更多 </n-button>
              </n-dropdown>
            </n-space>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="0" />
    </div>
  </div>
  <indexAddEditModalVue :show="show" modalType="1" @close="close" />
</template>
<style scoped lang="less">
.search-content {
  margin: 10px 0 20px;
}
.operation-content {
  margin: 0 0 5px;
}
</style>
