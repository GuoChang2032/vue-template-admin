<script lang="ts">
import { defineComponent, ref } from "vue";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/javascript/javascript.js";
export default defineComponent({
  components: { Codemirror },
  setup() {
    const code = ref(`//输入代码......`);
    return {
      code,
      cmOptions: {
        mode: "text/javascript", // 语言模式
        theme: "default", // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 2, // 智能缩进单位为4个空格长度
        foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
      },
      onChange(val: any, cm: any) {},
    };
  },
});
</script>

<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    placeholder="测试 placeholder"
    :height="350"
    @change="onChange"
  />
</template>

<style scoped lang="less"></style>
