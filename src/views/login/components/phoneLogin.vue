<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule } from "naive-ui";
export default defineComponent({
  setup(props, { emit }) {
    const loginForm = ref<FormInst | null>(null);
    const loginModel = ref<any>({
      phone: null,
      code: null,
    });
    const remember = ref<boolean>(false);
    const loading = ref<boolean>(false);

    return {
      loading,
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
          message: "请输入正确的手机号",
        },
        code: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入验证码",
        },
      },

      handleLogin() {},
      back() {
        emit("callback", { type: "1" });
      },
    };
  },
});
</script>

<template>
  <div class="l-c-head">手机登录</div>
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
          placeholder="输入手机号"
        />
      </n-form-item>
      <n-form-item label="" path="code">
        <div class="code-wrap flex-between">
          <div style="width: 85%">
            <n-input
              size="large"
              v-model:value="loginModel.code"
              placeholder="输入验证码"
            />
          </div>
          <div style="width: 10%"></div>
          <n-button size="large"> 发送验证码 </n-button>
        </div>
      </n-form-item>
    </n-form>
    <div class="l-c-btn">
      <n-button size="large" type="info" block @click="handleLogin">
        登 录
      </n-button>
    </div>
    <div class="other-btn">
      <n-button block @click="back"> 返回 </n-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.code-wrap{
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
