<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import { queryParams, Song } from "@/utils/types";
import indexAddEditModal from "@/components/indexAddEditModal.vue";
import pagination from "@/components/pagination/pagination.vue";
import Icon from "@/components/icon.vue";
export default defineComponent({
  name: "indexTable",
  props: {
    qs: {
      type: Object,
      required: true,
    },
  },
  components: {
    indexAddEditModal,
    pagination,
    Icon,
  },
  setup(props) {
    watch(
      () => props.qs,
      (state: any, prevState) => {
        params.value = state;
      },
      { deep: true }
    );


    const data = ref([]);
    const pages = ref({
      page: 1,
      pageCount: 0,
    });
    const params = ref<queryParams>({
      pageNo: 1,
      pageSize: 10,
      column: "createTime",
      order: "desc",
      articleName: "",
      querySource: "",
      processStatus: "",
      articleAuthor: "",
    });
    const addShow = ref(false);
    const itemData = ref({});
    return {
      data,
      pages,
      params,
      // 获取数据列表
      // 关闭
      close() {
        addShow.value = false;
      },
      rowKey: (row: Song) => row.id,
      addShow,
      itemData,
      edit(row: Song) {
        addShow.value = true;
        itemData.value = row;
      },
      deleteItem(row: Song) {
      },
      retry(row: Song) {
      },
      cancel(row: Song) {
      },
      // 分页变换
      pageChange(param: any) {
        params.value.pageNo = param.page;
      },
    };
  },
});
</script>

<template>
  <n-button type="info">
    <Icon icon="mdi:printer-outline" size="17px" /> 打印
  </n-button>

  <section id="print-content">
    <el-table :data="data" style="width: 100%" max-height="550">
      <el-table-column prop="querySource_dictText" label="查找源" width="150" />
      <el-table-column prop="articleName" label="论文标题" width="250" />
      <el-table-column prop="authorComp" label="单位" width="250" />
      <el-table-column prop="articleAuthor" label="作者" width="250" />
      <el-table-column prop="articleSource" label="论文期刊" width="250" />
      <el-table-column prop="articleDate" label="发表时间" width="200" />
      <el-table-column prop="sourceType" label="期刊类型" width="150" />
      <el-table-column prop="processStatus_dictText" label="状态" width="150">
        <template #default="scope">
          <el-tag>{{ scope.row.processStatus_dictText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="beiyinNum" label="被引数" width="100" />
      <el-table-column prop="impactFactor" label="影响因子" width="100" />
      <el-table-column prop="downloadCount" label="下载次数" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <n-button text tag="a" type="info" size="small" class="action-btn" @click="edit(scope.row)">
            编辑
          </n-button>
          <n-button text tag="a" type="info" size="small" class="action-btn" @click="retry(scope.row)">
            重试
          </n-button>
          <el-popconfirm title="确定取消?" @confirm="cancel(scope.row)">
            <template #reference>
              <n-button text tag="a" type="info" size="small" class="action-btn"> 取消 </n-button>
            </template>
          </el-popconfirm>

          <el-popconfirm
            title="确定删除这条数据?"
            @confirm="deleteItem(scope.row)"
          >
            <template #reference>
              <n-button text tag="a" type="info" size="small" class="action-btn"> 删除 </n-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="pages.pageCount" @pageChange="pageChange" />
    <indexAddEditModal
      :show="addShow"
      modalType="2"
      @close="close"
      :itemData="itemData"
    />
  </section>
</template>

<style scoped lang='less'>
.c-btn {
  span {
    margin: 0 5px;
  }
}
.pagination {
  margin: 20px 0 10px;
}
.action-btn{
  margin:0 5px;
}
</style>
