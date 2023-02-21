<!-- 分页 -->
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  setup(props, context) {
    watch(
      () => [props.total, props.current],
      (state, prevState) => {
        count.value = state[0];
        current.value = state[1];
      }
    );
    const count = ref(0);
    const current = ref(1);
    return {
      count,
      pageChange(page: number) {
        context.emit("pageChange", { page });
      },
    };
  },
});
</script>

<template>
  <div class="wrap">
    <el-row justify="end" align="middle">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="current"
        @update:current-page="pageChange"
      />
    </el-row>
  </div>
</template>

<style scoped lang="less">
.wrap {
  margin: 20px 0;
}
</style>
