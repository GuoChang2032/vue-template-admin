<script lang="ts" setup>
import { onMounted } from "vue";
import iconData from "@/utils/icon.data";
import { FormInst } from "naive-ui";
onMounted(() => {});

const emits = defineEmits(["confirm", "cancel"]);
const props = defineProps(["show"]);
interface formType {
  parentMenu: string;
  routeName: string;
  routeIcon: string;
  path: string;
  sort: number;
  status: number;
}

const opts = ref<any>([
  {
    label: "正常",
    value: 0,
  },
  {
    label: "隐藏",
    value: 1,
  },
]);
const parentArr = ref<any>([]);
const formRef = ref<FormInst | null>(null);
const iconModal = ref<boolean>(false);
const loading = ref<boolean>(false);
const rules = ref<any>({
  routeName: {
    required: true,
    message: "请输入菜单名称",
    trigger: ["input", "blur"],
  },
  path: {
    required: true,
    message: "请输入菜单路径",
    trigger: ["input", "blur"],
  },
  sort: {
    required: true,
    message: "请输入排序",
    trigger: ["input", "blur"],
  },
});
const model = ref<formType>({
  parentMenu: "layout",
  routeName: "",
  routeIcon: "",
  path: "",
  sort: 1,
  status: 0,
});

const confirm = () => {
  emits("confirm", { value: model.value });
};
const cancel = () => {
  emits("cancel", {});
};

const showIcon = () => {
  iconModal.value = true;
};
const selectIcon = (icon: string) => {
  model.value.routeIcon = icon;
  iconModal.value = false;
};
</script>

<template>
  <n-drawer
    v-model:show="props.show"
    :width="500"
    placement="right"
    @update:show="cancel"
  >
    <n-drawer-content title="菜单管理">
      <n-form
        ref="formRef"
        :rules="rules"
        :model="model"
        label-width="auto"
        label-placement="left"
      >
        <n-form-item label="父级菜单" path="parentMenu">
          <n-select
            :options="parentArr"
            placeholder="选择父级菜单"
            v-model:value="model.parentMenu"
          ></n-select>
        </n-form-item>
        <n-form-item label="菜单名称" path="routeName">
          <n-input
            class="w-full"
            v-model:value="model.routeName"
            placeholder="输入菜单名称"
          ></n-input>
        </n-form-item>

        <n-form-item label="组件路径" path="path">
          <n-input
            class="w-full"
            v-model:value="model.path"
            placeholder="输入组件路径"
          ></n-input>
        </n-form-item>
        <n-form-item label="排序" path="sort">
          <n-input-number
            clearable
            class="w-full"
            v-model:value="model.sort"
            placeholder="输入排序"
          ></n-input-number>
        </n-form-item>
        <n-form-item label="菜单图标" path="routeIcon">
          <!-- <n-input
            class="w-full"
            v-model:value="model.routeIcon"
            placeholder="选择菜单图标"
          ></n-input> -->
          <n-input-group>
            <n-input
              placeholder="选择菜单图标"
              v-model:value="model.routeIcon"
              class="w-full"
            />
            <n-button type="primary" ghost @click="showIcon" :loading="loading">
              选择图标
            </n-button>
          </n-input-group>
        </n-form-item>
        <n-form-item label="状态" path="status">
          <n-select
            :options="opts"
            placeholder="选择状态"
            v-model:value="model.status"
          ></n-select>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button class="mr-4" @click="cancel"> 取消 </n-button>
        <n-button type="primary" @click="confirm"> 确定 </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>

  <!-- 不够完善,一次性加载大量图标会导致页面卡顿 -->
  <n-modal v-model:show="iconModal">
    <n-card
      style="width: 600px"
      title="选择一个图标"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-scrollbar style="max-height: 650px">
        <div
          class="flex flex-wrap items-start justify-start justify-items-start"
        >
          <div
            v-for="item in iconData.icons"
            :key="item"
            class="w-16 h-16 p-1 cursor-pointer hover:bg-gray-100"
            @click="selectIcon('ant-design:' + item)"
          >
            <n-tooltip trigger="hover">
              <template #trigger>
                <icon
                  size="24px"
                  class="w-full h-full"
                  :icon="'ant-design:' + item"
                />
              </template>
              {{ "ant-design:" + item }}
            </n-tooltip>
          </div>
        </div>
      </n-scrollbar>
    </n-card>
  </n-modal>
</template>

<style scoped lang="less"></style>
