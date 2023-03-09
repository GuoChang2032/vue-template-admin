<script lang="ts" setup>
import { Message } from "@/utils/utils";
import { noticeList, emptyNotice } from "./components";
import { onMounted } from "vue";
onMounted(() => {});
const count = ref<number>(3);
const msg = ref<number>(0);
const dolist = ref<number>(0);
const currentTab = ref<string>("1");

const handleClear = () => {
  Message("success", "清除成功");
};
const handleAllRead = () => {
  Message("success", "已读");
};
const handleLoadMore = () => {};
</script>

<template>
  <n-popover class="!p-0" trigger="click" placement="bottom">
    <template #trigger>
      <div class="n-c-wrap" :title="'通知(' + count + ')'">
        <n-badge :value="count" show-zero :max="99" :show="count > 0">
          <icon icon="mdi:bell-outline" size="24px" class="text-gray-800" />
        </n-badge>
      </div>
    </template>
    <n-tabs
      class="w-80"
      v-model:value="currentTab"
      type="line"
      justify-content="space-evenly"
    >
      <n-tab-pane name="1" :tab="'通知(' + count + ')'">
        <n-scrollbar style="max-height: 350px">
          <div v-for="(item, idx) in count" :key="idx">
            <noticeList />
          </div>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="2" tab="消息">
        <n-scrollbar style="max-height: 350px">
          <template v-if="msg">
            <div v-for="(item, idx) in msg" :key="idx">
              <noticeList />
            </div>
          </template>
          <template v-else>
            <emptyNotice desc="暂无消息" />
          </template>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="3" tab="待办">
        <n-scrollbar style="max-height: 350px">
          <template v-if="dolist">
            <div v-for="(item, idx) in dolist" :key="idx">
              <noticeList />
            </div>
          </template>
          <template v-else>
            <emptyNotice desc="暂无待办内容" />
          </template>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
    <div class="flex border-t cursor-pointer">
      <div
        class="flex-1 py-1.5 text-center hover:bg-gray-100 hover:text-blue-400"
        @click="handleClear"
      >
        清空
      </div>
      <div
        class="flex-1 py-1.5 text-center border-l hover:bg-gray-100 hover:text-blue-400"
        @click="handleAllRead"
      >
        全部已读
      </div>
      <div
        class="flex-1 py-1.5 text-center border-l hover:bg-gray-100 hover:text-blue-400"
        @click="handleLoadMore"
      >
        查看更多
      </div>
    </div>
  </n-popover>
</template>

<style scoped lang="less">
.n-c-wrap {
  padding: 8px;
  border-radius: 3px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(134, 134, 134, 0.2);
  }
}
</style>
