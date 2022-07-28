<script lang='ts'>
import { defineComponent, onMounted, ref, reactive } from "vue";
import http from "@/service/http";
import { useRouter } from "vue-router";
import { Message } from "@/utils/tool.js";
import { FormRules,FormInstance } from "element-plus";
import {useUserInfo} from '@/stores/user'
export default defineComponent({
  setup() {
    onMounted(() => {
      handleChangeCheckCode();
    });
    const user = useUserInfo()
    const formRef = ref<FormInstance>();
    const formValue = reactive({
      account: "admin",
      password: "elang1234",
      code: "",
    });
    const router = useRouter();

    const currentDateTime = ref(0);
    const img = ref("");
    // 获取验证码
    const handleChangeCheckCode = () => {
      currentDateTime.value = new Date().getTime();
      http
        .get(`/sys/randomImage/${currentDateTime.value}`)
        .then((res: any) => {
          img.value = res.result;
        })
        .catch((err) => {
          Message("error", "获取验证码失败");
          console.error(err)
        });
    };
    const loading = ref(false)
    return {
      formRef,
      handleChangeCheckCode,
      currentDateTime,
      formValue,
      img,
      router,
      loading,
      rules: reactive<FormRules>({
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, max: 15, message: "最少6位密码", trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      }),
      // 登录
      login(formEl: FormInstance | undefined) {

        formEl?.validate((valid,fields) => {
          if (valid) {
            let params = {
              captcha: formValue.code,
              checkKey: currentDateTime.value,
              password: formValue.password,
              username: formValue.account,
            };
            loading.value = true
            http
              .post("/sys/login", params)
              .then((res: any) => {
                loading.value = false
                if (res.success) {
                  router.push({ path: "/" });
                  user.add(res)
                } else {
                  handleChangeCheckCode();
                }
              })
              .catch((err) => {
                loading.value = false
                Message("error", "请求错误");
              });
          }
        });
      },
    };
  },
});
</script>

<template>
  <div class="main-container">
    <div class="head-topic">模板项目</div>
    <el-row justify="center" style="width: 100%; margin: 60px 0 40px">
      <el-col :xs="16" :sm="14" :md="10" :lg="8" :xl="6">
        <div class="login-content-wrap">
          <div class="login-content">
            <div class="topic">账号登录</div>
            <div class="login-card">
              <el-form
                ref="formRef"
                :label-width="80"
                label-placement="left"
                :model="formValue"
                hide-required-asterisk
                :rules="rules"
                @keydown.enter="login(formRef)"
              >
                <el-form-item label="账号" prop="account">
                  <el-input
                    size="large"
                    v-model="formValue.account"
                    placeholder="admin"
                  />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    type="password"
                    size="large"
                    show-password-on="mousedown"
                    v-model="formValue.password"
                    placeholder="elang1234"
                  />
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <el-row justify="space-between" align="middle" :gutter="10">
                    <el-col :span="15">
                      <el-input
                        size="large"
                        v-model="formValue.code"
                        placeholder="输入验证码"
                      />
                    </el-col>
                    <el-col :span="9">
                      <div class="green">
                        <img
                          v-if="img"
                          @click="handleChangeCheckCode"
                          :src="img"
                          alt=""
                        />
                        <img v-else src="@/assets/checkcode.png" alt="" />
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <n-button type="info" block :loading="loading" @click="login(formRef)" style="margin:40px 0 10px" size="large">登 录</n-button>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='less'>
.main-container {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    min-height: 800px;
    width: 100%;
    background-image: url("https://s.cn.bing.net/th?id=OHR.Balsamroot_ZH-CN9456182640_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=30");
    background-size: 100% 130%;
    filter: blur(3px);
    z-index: -1;
  }
  .head-topic {
    width: 70%;
    margin: 0 auto;
    padding: 20px 40px;
    font-size: 30px;
    color: #000;
    font-weight: bold;
  }
  .login-content {
    opacity: 0.9;
    padding: 24px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  }
  .topic {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  .login-card {
    margin-top: 20px;
  }
}
.green {
  height: 38px;
  img {
    width: 100%;
    cursor: pointer;
    height: 100%;
  }
}
.login-content-wrap {
  padding: 30px;
}
</style>
