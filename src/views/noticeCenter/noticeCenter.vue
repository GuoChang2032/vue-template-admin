<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {});
</script>

<template>
  <themeComponent>
    <n-collapse>
      <n-collapse-item title="通知:你的会员即将到期,请及时续费" name="1">
        你的会员即将到期,请及时续费,现在续费可享88折,机不可失失不再来
        <template #header-extra> 3小时前 </template>
      </n-collapse-item>
      <n-collapse-item title="李四" name="2">
        一周小结：勤奋是获取成功的唯一捷径
        <template #header-extra> 本周工作日工作时长：62 小时 </template>
      </n-collapse-item>
      <n-collapse-item name="3">
        <n-text type="error">
          一周小结：生产队的驴都不敢这么休息，建议优化
        </n-text>
        <template #header>
          <n-text type="error"> 王五 </n-text>
        </template>
        <template #header-extra>
          <n-text type="error"> 本周工作日工作时长：45 小时 </n-text>
        </template>
      </n-collapse-item>
    </n-collapse>
  </themeComponent>
</template>

<style scoped lang="less"></style>
