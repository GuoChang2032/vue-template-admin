<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule } from "naive-ui";
import { Message } from "@/utils/utils";
import { useI18n } from "vue-i18n";

interface loginModelType{
  phone:string,
  code:string
}

export default defineComponent({
  setup(props, { emit }) {
    const loginForm = ref<FormInst | null>(null);
    const loginModel = ref<loginModelType>({
      phone: '',
      code: '',
    });
    const remember = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const count = ref<number>(60);
    const { t } = useI18n();
    return {
      count,
      loading,
      t,
      remember,
      loginForm,
      loginModel,
      loginRules: {
        phone: {
          validator(rule: FormItemRule, value: number) {
            return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
              value.toString()
            );
          },
          trigger: ["blur", "input"],
          message: t('form.login.phone'),
        },
        code: {
          required: true,
          trigger: ["blur", "input"],
          message: t('form.login.code'),
        },
      },

      handleLogin() {},
      back() {
        emit("callback", { type: "1" });
      },
      send() {
        if (
          !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
            loginModel.value.phone
          )
        ) {
          Message("warning", t('form.login.rightPhone'));
          return;
        }
        let timer: any;
        count.value--;
        timer = setInterval(() => {
          if (count.value <= 0) {
            clearInterval(timer);
            count.value = 60;
            return;
          }
          count.value--;
        }, 1000);
      },
    };
  },
});
</script>

<template>
  <div class="l-c-head">{{ t("form.login.phoneLogin") }}</div>
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
      <n-form-item label="" path="phone">
        <n-input
          size="large"
          v-model:value="loginModel.phone"
          :placeholder="t('form.login.phone')"
        />
      </n-form-item>
      <n-form-item label="" path="code">
        <div class="flex justify-between code-wrap">
          <div style="width: 85%">
            <n-input
              size="large"
              v-model:value="loginModel.code"
              :placeholder="t('form.login.code')"
            />
          </div>
          <div style="width: 10%"></div>
          <n-button
            size="large"
            @click="send"
            :disabled="count > 0 && count < 60"
            >{{ count > 0 && count < 60 ? count +  t("form.login.resendCode") : t("form.login.code")}}
          </n-button>
        </div>
      </n-form-item>
    </n-form>
    <div class="l-c-btn">
      <n-button size="large" type="info" block @click="handleLogin">
        {{t('form.login.title')}}
      </n-button>
    </div>
    <div class="other-btn">
      <n-button block @click="back"> {{t('form.login.return')}} </n-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.code-wrap {
  width: 100%;
}
.l-c-operation {
  padding: 10px 0;
}
.l-c-btn {
  margin: 20px 0;
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
