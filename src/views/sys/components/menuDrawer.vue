<script lang="ts" setup>
import { onMounted } from "vue";
import iconData from "@/utils/icon.data";
import { FormInst } from "naive-ui";
import { useMenus } from "@/stores/menu";
import _ from "super-tools-lib";
import { MenuDataType } from "@/utils/types";

interface optsType {
  label: string;
  value: number;
}

onMounted(() => {
  setParent();
});

watch(
  () => props.itemData,
  (nv, ov) => {
    model.value = nv;
  }
);

const setParent = () => {
  let temp = _.cloneDeep(um.getMenus);
  temp.unshift({
    key: "layout",
    routeName: "layout",
  });
  parentArr.value = temp;
};

const emits = defineEmits(["confirm", "cancel"]);
const props = defineProps(["show", "itemData"]);

const um = useMenus();
const opts = ref<optsType[]>([
  {
    label: "正常",
    value: 1,
  },
  {
    label: "隐藏",
    value: 2,
  },
]);
const parentArr = ref<MenuDataType[]>([]);
const formRef = ref<FormInst | null>(null);
const iconModal = ref<boolean>(false);
const loading = ref<boolean>(false);
const rules = ref({
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
  key: {
    required: true,
    message: "请输入菜单Key",
    trigger: ["input", "blur"],
  },
});
const model = ref<MenuDataType>({
  parentMenu: "layout",
  routeName: "",
  routeIcon: "",
  key: "",
  path: "",
  sort: 1,
  status: 1,
  children: [],
});

const confirm = () => {
  formRef.value?.validate((err) => {
    if (!err) {
      emits("confirm", { value: model.value });
    }
  });
};
const cancel = () => {
  reset();
  emits("cancel", {});
};

const reset = () => {
  model.value = {
    parentMenu: "layout",
    routeName: "",
    routeIcon: "",
    key: "",
    path: "",
    sort: 1,
    status: 1,
    children: [],
  };
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
          <!-- <n-select
            :options="parentArr"
            placeholder="选择父级菜单"
            v-model:value="model.parentMenu"
          ></n-select> -->
          <n-tree-select
            :options="parentArr"
            placeholder="选择父级菜单"
            default-value="dashboard"
            label-field="routeName"
            key-field="key"
            children-field="children"
            v-model:value="model.parentMenu"
          />
        </n-form-item>
        <n-form-item label="菜单名称" path="routeName">
          <n-input
            class="w-full"
            v-model:value="model.routeName"
            placeholder="输入菜单名称"
          ></n-input>
        </n-form-item>
        <n-form-item label="菜单Key" path="key">
          <n-input
            class="w-full"
            v-model:value="model.key"
            placeholder="输入菜单Key"
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
            :min="1"
            :max="99"
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
