<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule } from "naive-ui";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup(props, { emit }) {
    const registerForm = ref<FormInst | null>(null);
    const { t } = useI18n();
    const registerModel = ref<any>({
      account: null,
      phone: null,
      code: null,
      password: null,
    });
    const loading = ref<boolean>(false);

    return {
      loading,
      t,
      registerForm,
      registerModel,
      loginRules: {
        account: {
          required: true,
          trigger: ["blur", "input"],
          message: t('form.login.account'),
        },
        phone: {
          validator(rule: FormItemRule, value: number) {
            return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
              value.toString()
            );
          },
          trigger: ["blur", "input"],
          message: t('form.login.rightPhone'),
        },
        password: {
          required: true,
          trigger: ["blur", "input"],
          message: t('form.login.password'),
        },
        code: {
          required: true,
          trigger: ["blur", "input"],
          message: t('form.login.code'),
        },
      },

      handleRegister() {},
      back() {
        emit("callback", { type: "1" });
      },
    };
  },
});
</script>

<template>
  <div class="l-c-head">{{ t("form.login.register") }}</div>
  <div class="l-c-form">
    <n-form
      ref="registerForm"
      :model="registerModel"
      :rules="loginRules"
      label-placement="left"
      label-width="auto"
      :show-require-mark="false"
      class="l-f"
    >
      <n-form-item label="" path="account">
        <n-input
          size="large"
          v-model:value="registerModel.account"
          :placeholder="t('form.login.account')"
        />
      </n-form-item>
      <n-form-item label="" path="phone">
        <n-input
          size="large"
          v-model:value="registerModel.phone"
          :placeholder="t('form.login.phone')"
        />
      </n-form-item>
      <n-form-item label="" path="code">
        <div class="code-wrap flex-between" style="width: 100%">
          <div style="width: 85%">
            <n-input
              size="large"
              v-model:value="registerModel.code"
              :placeholder="t('form.login.code')"
            />
          </div>
          <div style="width: 10%"></div>
          <n-button size="large"> {{t('form.login.sendCode')}} </n-button>
        </div>
      </n-form-item>
      <n-form-item label="" path="password">
        <n-input
          type="password"
          show-password-on="mousedown"
          size="large"
          v-model:value="registerModel.password"
          :placeholder="t('form.login.password')"
        />
      </n-form-item>
    </n-form>
    <div class="l-c-btn">
      <n-button size="large" type="info" block @click="handleRegister">
        {{t('form.login.register')}}
      </n-button>
    </div>
    <div class="other-btn">
      <n-button block @click="back"> {{t('form.login.return')}} </n-button>
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
