<script lang="ts" setup>
import { onMounted } from "vue";
import { lineChart, pieChart } from "./index";
onMounted(() => {});
</script>

<template>
  <div class="mb-6 rounded-lg bg-white p-4 shadow-md">
    <n-page-header subtitle="让你的听觉更懂视觉">
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="正片" value="125 集" />
        </n-gi>
        <n-gi>
          <n-statistic label="嘉宾" value="22 位" />
        </n-gi>
        <n-gi>
          <n-statistic label="道歉" value="36 次" />
        </n-gi>
        <n-gi>
          <n-statistic label="话题" value="83 个" />
        </n-gi>
        <n-gi>
          <n-statistic label="参考链接" value="2,346 个" />
        </n-gi>
      </n-grid>
      <template #title>
        <a
          href="https://anyway.fm/"
          style="text-decoration: none; color: inherit"
          >Anyway.FM</a
        >
      </template>
      <template #avatar>
        <n-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
      <template #extra>
        <n-space>
          <n-button>催更</n-button>
          <n-dropdown :options="[]" placement="bottom-start">
            <n-button :bordered="false" style="padding: 0 4px"> ··· </n-button>
          </n-dropdown>
        </n-space>
      </template>
      <template #footer> 截止到 2021 年 4 月 3 日 </template>
    </n-page-header>
  </div>
  <n-grid class="w-full" cols="3" :x-gap="15" :y-gap="20" item-responsive>
    <n-grid-item span="0:3 900:2 1200:2">
      <lineChart />
    </n-grid-item>
    <n-grid-item span="0:3 900:1 1200:1">
      <pieChart />
    </n-grid-item>
  </n-grid>
</template>

<style scoped lang="less"></style>
