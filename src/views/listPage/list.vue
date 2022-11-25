<script lang="ts">
import http from "@/service/http";
import { defineComponent, onMounted, ref, h } from "vue";
import { Message, getUserInfo } from "@/utils/hooks";
import indexAddEditModalVue from "@/components/indexAddEditModal.vue";
import _ from "super-tools-lib";
import { useRouter } from "vue-router";
import Pagination from "@/components/pagination/pagination.vue";
import type { DataTableColumns } from "naive-ui";
import { NButton } from "naive-ui";
const createColumns = ({  play,remove}: {
  play: (row: any) => void;
  remove: (row: any) => void;
}): DataTableColumns<any> => {
  return [
    {
      title: "课程名",
      key: "courseName",
    },
    {
      title: "作业名称",
      key: "taskName",
    },
    {
      title: "开始时间",
      key: "startTime",
    },
    {
      title: "结束时间",
      key: "lastTime",
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        const edit = h(
          NButton,
          {
            style: "margin:0 5px;",
            text: true,
            type: "info",
            size: "small",
            onClick: () => play(row),
          },
          { default: () => "编辑" }
        );
        const r = h(
          NButton,
          {
            style: "margin:0 5px;",
            text: true,
            type: "error",
            size: "small",
            onClick: () => remove(row),
          },
          { default: () => "删除" }
        );
        return [edit, r];
      },
    },
  ];
};

export default defineComponent({
  components: { indexAddEditModalVue, Pagination },
  setup() {
    onMounted(() => {
      getList();
    });
    const pageObj = ref<any>({ page: 1, total: 0 });
    const show = ref<boolean>(false);
    const router = useRouter();
    const courseOpt = ref<any>([]);
    const getList = () => {};
    const tableData = ref<any>([
      {
        courseName: "高等数学",
        taskName: "高等数学作业",
        startTime: "2022-10-11",
        lastTime: "2035-10-28",
      },
      {
        courseName: "高等数学",
        taskName: "高等数学作业",
        startTime: "2022-10-11",
        lastTime: "2035-10-28",
      },
      {
        courseName: "高等数学",
        taskName: "高等数学作业",
        startTime: "2022-10-11",
        lastTime: "2035-10-28",
      },
    ]);
    const more = ref<any>([
      { label: "复制", key: "1" },
      { label: "冻结", key: "2" },
      { label: "删除", key: "3" },
    ]);
    const handleSelectionChange = (val: any) => {};
    return {
      tableData,
      courseOpt,
      show,
      more,
      handleSelectionChange,
      goDetail(item: any) {
        router.push({
          path: "/hwRecords",
          query: { id: item.taskId, name: item.taskName },
        });
      },
      create() {
        show.value = true;
      },
      edit(item: any) {
        show.value = true;
      },
      deleteItem(item: any) {},
      close() {
        show.value = false;
      },
      columns: createColumns({
        play(row: any) {
          Message('info','Play')
        },
        remove(row: any) {
          Message('info','删除')
        },
      }),
    };
  },
});
</script>
<template>
  <div class="container">
    <div class="search-content">
      <n-space>
        <n-select
          placeholder="按课程筛选"
          :options="courseOpt"
          style="width: 200px"
        ></n-select>
        <n-input placeholder="搜索名称"></n-input>
        <n-date-picker placeholder="选择日期" type="date" />
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
      <!-- <el-table
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
      </el-table> -->
      <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="false"
        :bordered="false"
      />
      <!-- <pagination :total="0" /> -->
    </div>
  </div>
  <indexAddEditModalVue :show="show" modalType="1" @close="close" />
</template>
<style scoped lang="less">
.container {
  padding: 10px 15px;
}
.search-content {
  margin: 10px 0 20px;
}
.operation-content {
  margin: 0 0 5px;
}
</style>
