<script lang="ts" setup>
import { onMounted } from "vue";
import { btnComType } from "@/utils/types";

onMounted(() => {});

const props = withDefaults(defineProps<{ type: btnComType; text: string }>(), {
  type: "add",
  text: "添加",
});

const emit = defineEmits(["callback"]);
const clickHandle = () => {
  emit("callback", {});
};
</script>

<template>
  <n-button v-if="props.type === 'add'" type="primary" @click="clickHandle">
    <template #icon>
      <icon icon="material-symbols:assignment-add-outline-rounded" />
      <!-- <icon
        v-else-if="props.type === 'delete'"
        icon="material-symbols:delete-outline-rounded"
      /> -->
    </template>
    {{ text }}
  </n-button>
  <n-button
    v-else-if="props.type === 'delete'"
    type="error"
    @click="clickHandle"
  >
    <template #icon>
      <icon icon="material-symbols:delete-outline-rounded" />
    </template>
    {{ text }}
  </n-button>
  <n-button
    strong
    secondary
    type="success"
    v-else-if="props.type === 'search'"
    @click="clickHandle"
  >
    <template #icon>
      <icon icon="material-symbols:search" />
    </template>
    {{ text }}
  </n-button>
  <n-button tertiary v-else-if="props.type === 'reset'" @click="clickHandle">
    <template #icon>
      <icon icon="system-uicons:reset" />
    </template>
    {{ text }}
  </n-button>
  <n-button
    dashed
    type="info"
    v-else-if="props.type === 'export'"
    @click="clickHandle"
  >
    <template #icon>
      <icon icon="clarity:export-line" />
    </template>
    {{ text }}
  </n-button>
  <n-button
    text
    type="info"
    v-else-if="props.type === 'import'"
    @click="clickHandle"
  >
    {{ text }}
  </n-button>
</template>

<style scoped lang="less"></style>
