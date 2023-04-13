<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {});

interface dataType {
  title: string;
  desc: string;
  source: string;
  user: string;
}

const data = ref<dataType[]>([
  {
    title: "能不能记住登录?",
    desc: "每次登录后过一天就要重新登录,就不能永久登录吗?垃圾",
    source: "pc浏览器端",
    user: "不破楼兰",
  },
  {
    title: "建议找个电子厂上班?",
    desc: "写得什么破玩意,我呸!!",
    source: "pc浏览器端",
    user: "不以为然",
  },
]);
</script>

<template>
  <n-grid class="w-full" cols="3" :x-gap="15" :y-gap="20" item-responsive>
    <n-grid-item span="0:3 900:1 1200:1">
      <themeComponent>
        <div class="m-1.5 text-lg">系统警告</div>
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
      </themeComponent>
    </n-grid-item>
    <n-grid-item span="0:3 900:2 1200:2">
      <themeComponent>
        <div class="m-1.5 text-lg">用户反馈</div>
        <el-table :data="data" style="width: 100%" max-height="550">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="source" label="来源" />
          <el-table-column prop="user" label="反馈用户" />
        </el-table>
      </themeComponent>
    </n-grid-item>
  </n-grid>
</template>

<style scoped lang="less"></style>
