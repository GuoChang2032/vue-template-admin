<script lang='ts'>
import { defineComponent } from "vue";
import Footer from "@/components/footer/footer.vue";
export default defineComponent({
    setup() {
        return {};
    },
    components: { Footer }
});
</script>

<template>
    <div>Header Content</div>
    <router-view></router-view>
    <div>Footer Content</div>
</template>

<style scoped lang='less'>
</style>
