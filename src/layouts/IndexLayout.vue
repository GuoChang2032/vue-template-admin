<script lang="ts">
import { defineComponent } from "vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
export default defineComponent({
  setup() {
    return {};
  },
  components: { Footer, Header },
});
</script>

<template>
  <!-- <Header /> -->
  <div style="height: 100%">
    <router-view />
  </div>
  <Footer />
</template>

<style scoped lang="less"></style>