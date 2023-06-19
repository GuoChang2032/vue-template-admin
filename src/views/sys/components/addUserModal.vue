<script lang="ts" setup>
import { onMounted } from "vue";
import iconData from "@/utils/icon.data";
import { FormInst } from "naive-ui";
import { useMenus } from "@/stores/menu";
import cloneDeep from "lodash/cloneDeep"
import { MenuDataType } from "@/utils/types";

onMounted(() => {
  setParent();
});

watch(
  () => props.itemData,
  (nv, ov) => {
    model.value = cloneDeep(nv);
  }
);

const setParent = () => {
  let temp:any = cloneDeep(um.getMenus);
  temp.unshift({
    key: "layout",
    routeName: "layout",
  });
  parentArr.value = temp;
};

const emits = defineEmits(["confirm", "cancel"]);
const props = defineProps(["show", "itemData"]);

interface formType {
  id: string;
  account: string;
  password: string;
  phone: string;
  nickName: string;
  role: string;
}

const um = useMenus();
const parentArr = ref<MenuDataType[]>([]);
const formRef = ref<FormInst | null>(null);
const loading = ref<boolean>(false);
const rules = ref({
  account: {
    required: true,
    message: "请输入账户名",
    trigger: ["input", "blur"],
  },
  nickName: {
    required: true,
    message: "请输入用户名",
    trigger: ["input", "blur"],
  },
  phone: {
    required: true,
    message: "请输入手机号",
    trigger: ["input", "blur"],
  },
});
const model = ref<formType>({
  id: "",
  account: "",
  password: "",
  phone: "",
  nickName: "",
  role: "teacher",
});

const confirm = () => {
  formRef.value?.validate((err) => {
    if (!err) {
      emits("confirm", { value: model.value });
      reset();
    }
  });
};
const cancel = () => {
  reset();
  emits("cancel", {});
};

const reset = () => {
  model.value = {
    id: "",
    account: "",
    password: "",
    phone: "",
    nickName: "",
    role: "teacher",
  };
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
        <n-form-item label="用户名" path="nickName">
          <n-input
            class="w-full"
            v-model:value="model.nickName"
            placeholder="输入用户名"
          ></n-input>
        </n-form-item>
        <n-form-item label="账户名" path="account">
          <n-input
            class="w-full"
            v-model:value="model.account"
            placeholder="输入账户名"
          ></n-input>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            class="w-full"
            v-model:value="model.password"
            placeholder="输入用户密码"
          ></n-input>
        </n-form-item>

        <n-form-item label="手机号" path="phone">
          <n-input
            class="w-full"
            v-model:value="model.phone"
            placeholder="输入手机号"
          ></n-input>
        </n-form-item>
        <n-form-item label="角色" path="role">
          <n-select
            :options="[
              { value: 'admin', label: '管理员' },
              { value: 'teacher', label: '普通用户' },
            ]"
            placeholder="选择用户角色"
            v-model:value="model.role"
          ></n-select>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button class="mr-4" @click="cancel"> 取消 </n-button>
        <n-button type="primary" @click="confirm"> 确定 </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="less"></style>
