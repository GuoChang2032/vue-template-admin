<script lang="ts" setup>
import { Message } from "@/utils/utils";
import { pageType, ApiReturnType } from "@/utils/types";
import { onMounted } from "vue";
import btnComponents from "@/components/btns/btnComponents.vue";
import http from "@/service/http";
import addUserModal from "@/views/sys/components/addUserModal.vue";

onMounted(() => {
  getList();
});

const tableData = ref<any>();

const getList = () => {
  http
    .get(`/user?pageNo=${pageObj.value.page}&pageSize=10`)
    .then((res: ApiReturnType) => {
      if (res.success) {
        tableData.value = res.records.data;
        pageObj.value.total = res.records.total;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const pageObj = ref<pageType>({
  total: 0,
  page: 1,
});
const userItem = ref<any>([]);
const selectArr = ref<any>([]);
const loading = ref<boolean>(false);
const show = ref<boolean>(false);

const confirmHandle = (e: any) => {
  let d = e.value;
  loading.value = true;
  let url: string = "/addUser";
  if (d.id) {
    url = "/updateUser";
  }
  http
    .post(url, d)
    .then((res) => {
      if (res.success) {
        show.value = false;
        Message("success", d.id?"编辑成功":"添加成功");
        getList();
      }
    })
    .catch((err) => {
      console.error(err);
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const addHandle = () => {
  show.value = true;
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
  if (val.type === 1) {
    userItem.value = val.data;
    show.value = true;
  } else if (val.type === 3) {
    deleteItem(val.data);
  }
};
const deleteItem = (id: string) => {
  loading.value = true;
  http
    .delete("/deleteUser?id=" + id)
    .then((res) => {
      if (res.success) {
        Message("success", "删除成功");
        getList();
      }
    })
    .catch((err) => {
      console.error(err);
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const pc = (e: any) => {
  pageObj.value.page = e.page;
  getList();
};
</script>

<template>
  <themeComponent>
    <n-spin :show="loading">
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
          <btnComponents
            type="import"
            @callback="importHandle"
            text="导入用户"
          />
        </n-space>
      </div>
      <div>
        <tableComponent
          :editor="true"
          :delete="true"
          :selection="true"
          @callback="operation"
          :data="tableData"
          :column="[
            { prop: 'id', label: '编号', width: '80' },
            { prop: 'nickName', label: '用户名' },
            { prop: 'account', label: '账户名', width: '100' },
            { prop: 'phone', label: '电话', width: '200' },
            { prop: 'password', label: '密码', width: '200' },
            { prop: 'role', label: '角色' },
          ]"
        >
        </tableComponent>
        <pagination
          :total="pageObj.total"
          :current="pageObj.page"
          @pageChange="pc"
        />
      </div>
    </n-spin>
    <addUserModal
      :show="show"
      @cancel="show = false"
      @confirm="confirmHandle"
      :itemData="userItem"
    ></addUserModal>
  </themeComponent>
</template>

<style scoped lang="less"></style>
