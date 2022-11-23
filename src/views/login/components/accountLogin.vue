<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormInst } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/stores/user";
export default defineComponent({
  setup(props, { emit }) {
    const loginForm = ref<FormInst | null>(null);
    const loginModel = ref<any>({
      account: null,
      password: null,
      code: null,
    });
    const remember = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const router = useRouter();
    const us = useUserInfo()
    return {
      loading,
      remember,
      loginForm,
      loginModel,
      loginRules: {
        account: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入账号",
        },
        password: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入密码",
        },
        code: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入验证码",
        },
      },

      handleLogin() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          us.setUserInfo(loginModel.value)
          router.push({ path: "/index" });
        }, 800);
      },
      otherLogin(type: string) {
        emit("callback", { type });
      },
    };
  },
});
</script>

<template>
  <div class="l-c-head">登录</div>
  <div class="l-c-form">
    <n-form
      ref="loginForm"
      :model="loginModel"
      :rules="loginRules"
      label-placement="left"
      label-width="auto"
      :show-require-mark="false"
      class="l-f"
    >
      <n-form-item label="" path="account">
        <n-input
          size="large"
          v-model:value="loginModel.account"
          placeholder="输入登录账号"
        />
      </n-form-item>
      <n-form-item label="" path="password">
        <n-input
          type="password"
          size="large"
          v-model:value="loginModel.password"
          placeholder="输入登录密码"
        />
      </n-form-item>
      <n-form-item label="" path="code">
        <div class="code-wrap flex-between">
          <n-input
            size="large"
            v-model:value="loginModel.code"
            placeholder="输入验证码"
          />
          <img src="@/assets/checkcode.png" class="code-img" alt="" />
        </div>
      </n-form-item>
    </n-form>
    <div class="l-c-operation">
      <div class="flex-between">
        <n-checkbox size="large" v-model:value="remember" label="记住我" />
        <n-button text type="primary" @click="otherLogin('6')">忘记密码？</n-button>
      </div>
    </div>
    <div class="l-c-btn">
      <n-button
        size="large"
        type="info"
        block
        @click="handleLogin"
        :loading="loading"
      >
        登 录
      </n-button>
    </div>
    <n-divider> 其他登录方式 </n-divider>
    <div class="other-btn">
      <n-space justify="space-around">
        <n-button ghost @click="otherLogin('2')"> 手机登录 </n-button>
        <n-button ghost @click="otherLogin('3')"> 二维码登录 </n-button>
        <n-button ghost @click="otherLogin('4')"> 人脸登录 </n-button>
        <n-button ghost @click="otherLogin('5')"> 立即注册 </n-button>
      </n-space>
    </div>
  </div>
</template>

<style scoped lang="less">
.l-c-operation {
  padding: 5px 0;
}
.l-c-btn {
  margin: 10px 0 20px;
}
.l-c-head {
  font-size: 28px;
  margin: 15px 0;
}
.l-f {
  width: 400px;
}
.code-img {
  width: 100px;
  margin-left: 10px;
}
</style>
