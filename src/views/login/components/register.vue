<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/stores/user";
import { Message } from "@/utils/utils";

const emit = defineEmits(["callback"]);

const loginForm = ref<FormInst | null>(null);
const loginModel = ref<any>({
  account: null,
  password: null,
  phone: null,
  code: null,
});
const isRemembers = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();
const us = useUserInfo();
const { t } = useI18n();

const handleLogin = () => {
  Message("success", "注册成功");
  setTimeout(() => {
    other("0");
  }, 800);
};
const other = (type: string) => {
  emit("callback", { type });
};

const count = ref<number>(60);
const timer = ref<any>();
const sendSys = () => {
  count.value--;
  timer.value = setInterval(() => {
    count.value--;
    if (count.value <= 0) {
      clearInterval(timer.value);
      count.value = 60;
    }
  }, 1000);
};
</script>

<template>
  <div class="ml-auto mr-auto 2xl:w-6/12 xl:w-8/12 lg:w-9/12 md:10/12 sm:9/12">
    <div class="mb-6 mb-10 text-3xl">账号注册</div>
    <div class="flex justify-around mx-4">
      <div
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <img src="@/assets/google-icon.svg" class="w-6 mr-1.5" alt="" />
        <span> Google 注册</span>
      </div>
      <div
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <img src="@/assets/facebook.svg" class="w-6 mr-1.5" alt="" />
        <span> Facebook 注册</span>
      </div>
    </div>
    <div class="mt-12 mb-8 text-lg font-extrabold text-center text-gray-600">
      - OR -
    </div>
    <div class="register-no-flex">
      <input
        class="login-input"
        v-model="loginModel.account"
        placeholder="输入账号"
        type="text"
      />
      <input
        class="login-input"
        v-model="loginModel.password"
        placeholder="输入密码"
        type="password"
      />
      <input
        class="login-input"
        v-model="loginModel.phone"
        placeholder="输入手机号"
        type="text"
      />
      <div class="flex">
        <input
          class="flex-grow mr-2 login-input"
          v-model="loginModel.code"
          placeholder="输入验证码"
          type="text"
        />
        <n-button
          :disabled="count < 60"
          text
          class="flex-1 w-2/6"
          type="primary"
          @click="sendSys"
        >
          {{ count >= 60 ? "发送验证码" : count + "秒后重新发送" }}
        </n-button>
      </div>
    </div>
    <div class="mt-12 mb-6">
      <n-button
        type="primary"
        block
        size="large"
        @click="handleLogin"
        :loading="loading"
        >注 册</n-button
      >
    </div>
    <div class="">
      已有账号，<n-button text type="primary" @click="other('0')">
        点击登录
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
<style lang="less">
.register-no-flex {
  .n-form-item-blank {
    display: block;
  }
}
</style>
