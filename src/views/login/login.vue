<script lang="ts" setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Message } from "@/utils/utils";

onMounted(() => {});

const { t } = useI18n();
const i18n = useI18n();

const isRemembers = ref<boolean>(false);

const handleSelect = () => {
  let k = i18n.locale.value;
  Message("success", `切换${k === "zh" ? "英语" : "中文"}成功`);
  if (k === "zh") {
    i18n.locale.value = "en";
  } else {
    i18n.locale.value = "zh";
  }
};
</script>

<template>
  <div class="flex w-full h-screen l-main">
    <div class="flex-1 hidden md:block sm:hidden" style="position: relative">
      <div class="px-8 my-10 font-serif text-5xl font-bold text-white l-wrap">
        <div class="mb-4">GGSMD</div>
        <div class="text-3xl">人生总是充满了失败和挫折。</div>
      </div>
    </div>
    <div class="flex-1 p-4 font-sans bg-white rounded-l-3xl sm:w-full">
      <div class="mt-4 mb-10 text-right">
        <n-button quaternary @click="handleSelect">
          <template #icon><icon icon="mdi:language" size="23px" /></template>
          {{ i18n.locale.value === "zh" ? "中" : "英" }}
        </n-button>
      </div>
      <div
        class="ml-auto mr-auto 2xl:w-6/12 xl:w-8/12 lg:w-9/12 md:10/12 sm:9/12"
      >
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
        <div
          class="mt-12 mb-8 text-lg font-extrabold text-center text-gray-600"
        >
          - OR -
        </div>
        <div class="">
          <input class="login-input" placeholder="输入账号" type="text" />
          <input class="login-input" placeholder="输入密码" type="password" />
        </div>
        <div class="flex mt-4 mb-8">
          <div class="flex-1">
            <n-checkbox v-model:checked="isRemembers"> 记住我 </n-checkbox>
          </div>
          <div class="flex-1 text-right">
            <n-button text type="primary"> 忘记密码 </n-button>
          </div>
        </div>
        <div class="mb-6">
          <n-button class="btn-primary" type="primary" block size="large"
            >登 录</n-button
          >
        </div>
        <div class="">
          没有账号?<n-button text type="primary"> 点击注册 </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-input {
  outline-style: none;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #999999bd;
  width: 100%;
  margin: 15px 0;
}
.l-main {
  background-image: url(@/assets/bg2.jpg);
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: cover;
}
.l-wrap {
  text-shadow: 1px 1px 10px rgb(0, 0, 0);
}
</style>
