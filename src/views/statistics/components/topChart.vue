<script lang="ts" setup>
import { onMounted } from "vue";
import { lineChart, pieChart } from "./index";

onMounted(() => {});

</script>

<template>
  <div class="pb-4">
  <themeComponent>
    <n-page-header>
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="访问" value="1251 次" />
        </n-gi>
        <n-gi>
          <n-statistic label="注册" value="122" />
        </n-gi>
        <n-gi>
          <n-statistic label="待办" value="36 次" />
        </n-gi>
        <n-gi>
          <n-statistic label="话题" value="83 个" />
        </n-gi>
        <n-gi>
          <n-statistic label="接口调用" value="2,346 K" />
        </n-gi>
      </n-grid>
      <template #title>
        <h3 class="font-semibold">早上好！张三，开始您一天的苦逼工作吧！</h3>
      </template>
      <template #avatar>
        <n-avatar
          size="large"
          round
          src="public/atom.svg"
        />
      </template>
      <template #extra>
        <n-space>
          <n-dropdown :options="[]" placement="bottom-start">
            <n-button :bordered="false" style="padding: 0 4px"> ··· </n-button>
          </n-dropdown>
        </n-space>
      </template>
      <template #footer> 截止到 2023-12-32 12:33</template>
    </n-page-header>
  </themeComponent>
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
