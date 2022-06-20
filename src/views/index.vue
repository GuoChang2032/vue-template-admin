<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { sourceOpt, statusOpt } from "@/utils/tool.js";
import indexTableVue from "@/components/indexTable.vue";
import { queryParams } from "@/utils/types";
import indexAddEditModal from "@/components/indexAddEditModal.vue";
import { handleExportXls } from "@/service/api/index.js";
import Icon from "@/components/icon.vue";
// import IndexModal from "@/components/indexModal.vue";
import { useUserInfo } from "@/stores/user";
export default defineComponent({
  components: {
    indexTableVue,
    indexAddEditModal,
    Icon,
    // IndexModal,
  },
  setup() {
    const router = useRouter();
    const user = useUserInfo();
    const formValue = ref<queryParams>({
      pageNo: 1,
      pageSize: 10,
      column: "createTime",
      order: "desc",
      querySource: "",
      articleName: "",
      processStatus: "",
      articleAuthor: "",
    });
    let so = ref(sourceOpt);
    let sto = ref(statusOpt);

    const addShow = ref(false);
    return {
      sourceOpt: so,
      statusOpt: sto,
      formValue,
      handleLogout() {
        router.replace({ path: "/login" });
        user.remove();
      },
      resetSearch() {
        formValue.value = {
          pageNo: 1,
          pageSize: 10,
          column: "createTime",
          order: "desc",
          querySource: "",
          articleName: "",
          processStatus: "",
          articleAuthor: "",
        };
      },
      addShow,
      // 新建
      showAdd() {
        addShow.value = true;
      },
      // 关闭
      close() {
        addShow.value = false;
      },
      // 导出
      exportFun() {
        let p = {
          column: "createTime",
          field:
            "id,,querySource_dictText,articleName,authorComp,articleAuthor,articleSource,articleDate,sourceType,beiyinNum,beiyinNames,beiyinQikans,beiyinAuthors,impactFactor,downloadCount,createTime,processStatus,action",
          order: "desc",
          pageNo: 1,
          pageSize: 10,
        };
        handleExportXls("/crawercontents/crawerContents/exportXls", p);
      },
    };
  },
});
</script>

<template>
  <el-container class="nlayout">
    <el-header class="nlayout-header" bordered>
      <div class="head-container">
        <el-row justify="space-between" align="middle">
          <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="6">
            <div class="h-c-topic">模板项目</div>
          </el-col>
          <el-col
            :xs="10"
            :sm="10"
            :md="10"
            :lg="4"
            :xl="2"
            style="text-align: right"
          >
            <div class="h-c-userinfo" @click="handleLogout">
              <span> 退出登录</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main class="nlayout-content">
      <div class="main-content">
        <div class="search-content">
          <el-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formValue"
            label-placement="left"
          >
            <el-form-item label="查找源:">
              <el-select
                class="n-form-item-input"
                placeholder="选择查找源"
                v-model="formValue.querySource"
              >
                <el-option
                  v-for="item in sourceOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select
                class="n-form-item-input"
                placeholder="选择状态"
                v-model="formValue.processStatus"
              >
                <el-option
                  v-for="item in statusOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="作者:">
              <el-input
                class="n-form-item-input"
                v-model="formValue.articleAuthor"
                placeholder="输入作者"
              />
            </el-form-item>
            <el-form-item label="论文标题:">
              <el-input
                style="width: 250px"
                autosize
                class="n-form-item-input"
                v-model="formValue.articleName"
                placeholder="输入论文标题"
              />
            </el-form-item>
            <el-form-item class="btn-content">
              <el-button @click="resetSearch">
                <Icon icon="mdi:autorenew" size="17px" /> 重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="action-content">
          <el-space wrap>
            <el-button type="primary" @click="showAdd">
              <Icon icon="mdi:file-document-plus-outline" size="17px" /> 新建
            </el-button>
            <el-button @click="exportFun" type="warning">
              <Icon icon="mdi:export" size="17px" /> 导出
            </el-button>
            <!-- <n-button type="warning">
              <template #icon>
                <n-icon>
                  <ArrowExportUp20Filled />
                </n-icon>
              </template>
              导入
            </n-button> -->
          </el-space>
        </div>
      </div>
      <div class="table-content">
        <indexTableVue :qs="formValue" />
      </div>
    </el-main>
    <indexAddEditModal :show="addShow" modalType="1" @close="close" />
  </el-container>
</template>

<style scoped lang='less'>
.nlayout {
  height: 100vh;
  min-height: 600px;
  background: #f5f5f5;
  .nlayout-header {
    padding: 10px 24px;
    background: @primary-color;
  }
  .nlayout-footer {
    padding: 15px 24px;
  }
}
.h-c-topic {
  font-size: 26px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
}
.h-c-userinfo {
  display: inline-block;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 5px;
  transition-duration: 0.2s;
  border-radius: 2px;
  text-align: center;
  width: 80px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
.nlayout-content {
  padding: 10px 20px;
  background: #f5f5f5;
}
.main-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 3px;
}
.n-form-item {
  width: 100%;
}
.n-f-content {
  color: #7e7e7e;
  font-size: 16px;
  text-align: center;
}
.table-content {
  padding: 0 20px 30px;
  background-color: #fff;
}
</style>
