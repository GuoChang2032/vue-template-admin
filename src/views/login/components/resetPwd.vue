<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule } from "naive-ui";
import { Message } from "@/utils/hooks";
export default defineComponent({
  setup(props, { emit }) {
    const loginForm = ref<FormInst | null>(null);
    const loginModel = ref<any>({
      phone: null,
      code: null,
      password: null,
      again: null,
    });
    const remember = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const count = ref<number>(60);
    return {
      count,
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

      handleLogin() {
        Message('success','重置成功')
        emit("callback", { type: "1" });
      },
      back() {
        emit("callback", { type: "1" });
      },
      send() {
        if (
          !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
            loginModel.value.phone
          )
        ) {
          Message("warning", "请输入正确的手机号");
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
  <div class="l-c-head">重置密码</div>
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
          <n-button
            size="large"
            @click="send"
            :disabled="count > 0 && count < 60"
            >{{ count > 0 && count < 60 ? count + "秒后重发" : "发送验证码" }}
          </n-button>
        </div>
      </n-form-item>
      <n-form-item label="" path="password">
        <n-input
          size="large"
          type="password"
          show-password-on="mousedown"
          v-model:value="loginModel.password"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item label="" path="again">
        <n-input
          size="large"
          type="password"
          show-password-on="mousedown"
          v-model:value="loginModel.again"
          placeholder="确认密码"
        />
      </n-form-item>
    </n-form>
    <div class="l-c-btn">
      <n-button size="large" type="info" block @click="handleLogin">
        确 定
      </n-button>
    </div>
    <div class="other-btn">
      <n-button block @click="back"> 返 回 </n-button>
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
