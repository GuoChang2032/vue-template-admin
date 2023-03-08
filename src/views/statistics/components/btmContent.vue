<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});

const data = ref<any>([]);
</script>

<template>
  <n-grid class="w-full" cols="3" :x-gap="15" :y-gap="20" item-responsive>
    <n-grid-item span="0:3 900:1 1200:1">
      <div class="p-4 bg-white rounded-lg shadow-md">
        <div class="text-gray-900 m-1.5 xl">系统警告</div>
        <n-timeline>
          <n-timeline-item content="啊" />
          <n-timeline-item
            type="success"
            title="成功"
            content="哪里成功"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="error"
            content="哪里错误"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="warning"
            title="警告"
            content="哪里警告"
            time="2018-04-03 20:46"
          />
          <n-timeline-item
            type="info"
            title="信息"
            content="是的"
            time="2018-04-03 20:46"
            line-type="dashed"
          />
          <n-timeline-item content="啊" />
        </n-timeline>
      </div>
    </n-grid-item>
    <n-grid-item span="0:3 900:2 1200:2">
      <div class="p-4 bg-white rounded-lg shadow-md">
        <div class="text-gray-900 m-1.5 xl">用户反馈</div>
        <el-table :data="data" style="width: 100%" max-height="550">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="user" label="反馈用户" />
        </el-table>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style scoped lang="less"></style>
