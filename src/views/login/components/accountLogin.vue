<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/stores/user";
import { useMenuTag } from "@/stores/menu";
import { Message } from "@/utils/utils";
import m from "@/utils/mitt";
import { useIndex } from "@/stores/indexStore";

const emit = defineEmits(["callback"]);

const ui = useIndex();
const loginForm = ref<FormInst | null>(null);
const formValue = ref<any>({
  username: "admin",
  password: "123123",
});
const isRemembers = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();
const us = useUserInfo();
const umt = useMenuTag();
const { t } = useI18n();

const handleLogin = () => {
  loading.value = true;
  let account = "admin";
  let pwd = "123123";
  let f = formValue.value;
  if (
    f.username !== account &&
    f.username !== "student" &&
    f.username !== "teacher"
  ) {
    Message("warning", "用户名错误");
    return;
  } else if (f.password !== pwd) {
    Message("warning", "密码错误");
    return;
  }
  setTimeout(() => {
    loading.value = false;
    us.setUserInfo({ role: f.username, token: "xxx" });
    umt.resetTab();
    m.emit("pageTabChange", { val: "index" });
    ui.setActiveKey("index");
    m.emit('login',{})
    router.push({ path: "/index" });
  }, 800);
};
const other = (type: string) => {
  emit("callback", { type });
};
</script>

<template>
  <div class="ml-auto mr-auto 2xl:w-6/12 xl:w-8/12 lg:w-9/12 md:10/12 sm:9/12">
    <div class="mb-6 mb-10 text-3xl">账号登录</div>
    <div class="flex justify-around mx-4">
      <div
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <img src="@/assets/google-icon.svg" class="w-6 mr-1.5" alt="" />
        <span> Google 登录</span>
      </div>
      <div
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <img src="@/assets/facebook.svg" class="w-6 mr-1.5" alt="" />
        <span> Facebook 登录</span>
      </div>
    </div>
    <div class="mt-12 mb-8 text-lg font-extrabold text-center text-gray-600">
      - OR -
    </div>
    <div class="" @keypress.enter="handleLogin">
      <input
        class="login-input"
        v-model="formValue.username"
        placeholder="输入账号"
        type="text"
      />
      <input
        class="login-input"
        v-model="formValue.password"
        placeholder="输入密码"
        type="password"
      />
    </div>
    <div class="flex mt-4 mb-8">
      <div class="flex-1">
        <n-checkbox v-model:checked="isRemembers"> 记住我 </n-checkbox>
      </div>
      <div class="flex-1 text-right">
        <n-button text type="primary" @click="other('1')"> 忘记密码 </n-button>
      </div>
    </div>
    <div class="mb-6">
      <n-button
        type="primary"
        block
        size="large"
        @click="handleLogin"
        :loading="loading"
        >登 录</n-button
      >
    </div>
    <div class="">
      没有账号？<n-button text type="primary" @click="other('2')">
        点击注册
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
