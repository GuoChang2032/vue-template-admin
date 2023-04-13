<script lang="ts" setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Message } from "@/utils/utils";
import { accountLogin, register, resetPwd } from "./components";
onMounted(() => {});

const { t } = useI18n();
const i18n = useI18n();
const type = ref<string>("0");

const router = useRouter();
const handleSelect = () => {
  let k = i18n.locale.value;
  Message("success", `切换${k === "zh" ? "英语" : "中文"}成功`);
  if (k === "zh") {
    i18n.locale.value = "en";
  } else {
    i18n.locale.value = "zh";
  }
};

interface valType {
  type: string;
}

const cb = (val: valType) => {
  type.value = val.type;
};
</script>

<template>
  <div class="flex w-full h-screen l-main">
    <div class="flex-1 hidden md:block sm:hidden" style="position: relative">
      <div class="px-8 font-serif text-5xl font-bold text-white my-28 l-wrap">
        <div class="mb-4">人生如寄</div>
        <div class="text-xl">
          很不幸，时间的流逝永远不会停止，时光荏苒，光阴如梭。你的过去在不停增多，你的未来在不断减少。末知的可能性只会越来越少，而无法改变的后悔在累积成山。你明白了吗?
        </div>
      </div>
    </div>
    <div
      class="flex-1 p-4 font-sans bg-white md:p-4 md:rounded-l-3xl sm:p-10 sm:w-full sm:rounded-none"
    >
      <div class="mt-4 mb-10 text-right">
        <n-button quaternary @click="handleSelect">
          <template #icon><icon icon="mdi:language" size="23px" /></template>
          {{ i18n.locale.value === "zh" ? "中" : "英" }}
        </n-button>
      </div>
      <accountLogin
        :class="type === '0' ? 'fadeInRight animated' : 'none-block'"
        @callback="cb"
      />
      <resetPwd
        :class="type === '1' ? 'fadeInRight animated' : 'none-block'"
        @callback="cb"
      />
      <register
        :class="type === '2' ? 'fadeInRight animated' : 'none-block'"
        @callback="cb"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.l-main {
  background-image: url(@/assets/bg2.jpg);
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: cover;
}
.l-wrap {
  text-shadow: 1px 1px 10px rgb(0, 0, 0);
}

.none-block {
  display: none;
}

/*base code*/
.animated {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}
/*the animation definition*/
@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(10%, 0, 0);
    transform: translate3d(10%, 0, 0);
  }
  100% {
    opacity: 1;
    display: block;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(10%, 0, 0);
    -ms-transform: translate3d(10%, 0, 0);
    transform: translate3d(10%, 0, 0);
  }
  100% {
    opacity: 1;
    display: block;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}
.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}
</style>
