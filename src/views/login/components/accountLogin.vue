<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/stores/user";

const emit = defineEmits(["callback"]);

const loginForm = ref<FormInst | null>(null);
const loginModel = ref<any>({
  account: null,
  password: null,
  code: null,
});
const remember = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();
const us = useUserInfo();
const { t } = useI18n();
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

const handleLogin = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    us.setUserInfo(loginModel.value);
    router.push({ path: "/index" });
  }, 800);
};
const otherLogin = (type: string) => {
  emit("callback", { type });
};
</script>

<template>
  <div class="l-c-head">{{ t("form.login.title") }}</div>
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
          :placeholder="t('form.login.account')"
        />
      </n-form-item>
      <n-form-item label="" path="password">
        <n-input
          type="password"
          size="large"
          v-model:value="loginModel.password"
          :placeholder="t('form.login.password')"
        />
      </n-form-item>
      <n-form-item label="" path="code">
        <div class="code-wrap flex-between">
          <n-input
            size="large"
            v-model:value="loginModel.code"
            :placeholder="t('form.login.code')"
          />
          <img src="@/assets/checkcode.png" class="code-img" alt="" />
        </div>
      </n-form-item>
    </n-form>
    <div class="l-c-operation">
      <div class="flex-between">
        <n-checkbox size="large" v-model:value="remember" :label="t('form.login.remember')" />
        <n-button text type="primary" @click="otherLogin('6')"
          >{{t('form.login.forgot')}}</n-button
        >
      </div>
    </div>
    <div class="l-c-btn">
      <n-button
        size="large"
        type="primary"
        block
        @click="handleLogin"
        :loading="loading"
      >
      {{t('form.login.title')}}
      </n-button>
    </div>
    <n-divider>{{t('form.login.otherLogin')}} </n-divider>
    <div class="other-btn">
      <n-space justify="space-around">
        <n-button ghost @click="otherLogin('2')"> {{t('form.login.phoneLogin')}} </n-button>
        <n-button ghost @click="otherLogin('3')"> {{t('form.login.codeLogin')}} </n-button>
        <n-button ghost @click="otherLogin('4')"> {{t('form.login.faceLogin')}} </n-button>
        <n-button ghost @click="otherLogin('5')"> {{t('form.login.register')}} </n-button>
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
