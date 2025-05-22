<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="footer">copyright@2099 XXXXXXXXXXXXXXXXXXX</div>
</template>

<style scoped lang="less">
.footer {
  background-color: rgb(61, 61, 61);
  color: rgb(214, 214, 214);
  padding: 10px 0 ;
  text-align: center;
  font-size: 14px;
}
</style>
