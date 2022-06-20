<!-- 分页 -->
<script lang='ts'>
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    watch(
      () => props.total,
      (state, prevState) => {
        count.value = state;
      }
    );
    const count = ref(0);
    return {
      count,
      pageChange(page:number){
        context.emit('pageChange',{page})
      },
    };
  },
});
</script>

<template>
  <div class="wrap">
    <el-row justify="end" align="middle">
      <el-pagination background layout="prev, pager, next" :total="count" @update:current-page="pageChange"/>
    </el-row>
  </div>
</template>

<style scoped lang='less'>
.wrap {
  margin: 20px 0;
}
</style>
