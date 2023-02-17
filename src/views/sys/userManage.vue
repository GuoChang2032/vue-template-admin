<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

onMounted(() => {});
const { t } = useI18n();
const courseOpt = ref<any>([]);
const tableData: any = [];
const more = ref<any>([
  { label: "复制", key: "1" },
  { label: "冻结", key: "2" },
  { label: "删除", key: "3" },
]);
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
        <n-button type="primary">
          <template #icon>
            <Icon icon="mdi:file-document-plus-outline" size="17px" />
          </template>
          新建
        </n-button>
      </n-space>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="taskName" label="作业名称" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="lastTime" label="提交时间" />
        <el-table-column fixed="right" label="操作">
          <template #default>
            <n-space wrap>
              <n-button text tag="a" type="info"> 编辑 </n-button>
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
</template>

<style scoped lang="less">
.search-content {
  margin: 10px 0 20px;
}
.operation-content {
  margin: 0 0 5px;
}
</style>
