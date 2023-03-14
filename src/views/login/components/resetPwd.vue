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
  code: null,
});
const isRemembers = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();
const us = useUserInfo();
const { t } = useI18n();
const reset_type = ref<number>(1);

const loginRules = {
  account: {
    required: true,
    trigger: ["blur", "input"],
    message: t("form.login.account"),
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: t("form.login.password"),
  },
  code: {
    required: true,
    trigger: ["blur", "input"],
    message: t("form.login.code"),
  },
};

const other = (type: string) => {
  emit("callback", { type });
};

const count = ref<number>(60);
const timer = ref<any>();
const sendSys = () => {
  let msg =
    reset_type.value === 1 ? "已发送验证码到手机" : "已发送验证码到邮箱";
  Message("success", msg);
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
    <div class="mb-6 mb-10 text-3xl">重置密码</div>
    <div class="flex justify-start">
      <div
        v-if="reset_type === 1"
        @click="reset_type = 2"
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <icon icon="material-symbols:mark-email-unread-outline-rounded" />
        <span> 邮箱重置 </span>
      </div>
      <div
        v-else
        @click="reset_type = 1"
        class="flex px-4 py-2 text-base text-gray-800 border border-gray-200 cursor-pointer rounded-xl hover:bg-gray-200"
      >
        <icon icon="material-symbols:phone-android-outline" />
        <span> 手机重置 </span>
      </div>
    </div>
    <div class="mt-10 mb-6">
      <input
        class="login-input"
        :placeholder="reset_type === 1 ? '输入手机号' : '输入邮箱'"
        type="text"
      />
      <div class="flex">
        <input
          class="flex-grow mr-2 login-input"
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
      <input class="login-input" placeholder="输入新密码" type="password" />
      <input class="login-input" placeholder="重复新密码" type="password" />
    </div>
    <div class="mt-12 mb-6">
      <n-button block size="large" @click="other('0')" :loading="loading"
        >返回登录</n-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.btn-primary {
  background-color: #5a67ba;
}
</style>
