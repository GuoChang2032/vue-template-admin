<script lang="ts" setup>
import { onMounted } from "vue";
import Search from "@/components/list/component/Search.vue";

const searchOpt = [
  {
    name: "title",
    type: "input",
    text: "标题",
  },
  {
    name: "classes",
    type: "select",
    text: "班级",
    placeholder: "选择班级",
    options: () => {
      return [
        {
          label: "1班",
          value: "1",
        },
        {
          label: "2班",
          value: "2",
        },
        {
          label: "3班",
          value: "3",
        },
      ];
    },
  },
  {
    name: "createtime",
    type: "date",
    text: "创建时间",
  },
];

const search = (p:any)=>{
  console.log(p.params)
}

const reset = ()=>{
  console.log('reset!')
}

onMounted(() => {});
</script>
<!-- list页面组件化示例 -->
<template>
  <div>
    <div class="header">
      <Search :searchOpt="searchOpt" @searchHandle="search" />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
