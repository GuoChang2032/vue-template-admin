<script lang="ts">
import { useIndex } from "@/stores/indexStore";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import m from "@/utils/mitt";
export default defineComponent({
  name: "Header",
  setup() {
    const inver = useIndex();
    const router = useRouter();
    const theme = ref<boolean>(false);

    onMounted(() => {
      theme.value = inver.getInverted;
    });

    return {
      theme,
      handleSelect(key: string) {
        if (key === "1") {
          router.push({ path: "/usercenter" });
        }
      },
      goCenter() {
        router.push({ path: "/usercenter" });
      },
      logout() {
        router.push({ path: "/login", replace: true });
      },
      themeChange() {
        inver.setInverted();
        m.emit("switch", { val: theme.value });
      },
    };
  },
});
</script>

<template>
  <div :class="['header','flex-between',theme?'theme-black':'theme-white']">
    <div class="h-left flex-center-start">
      <img src="@/assets/elogo-large.png" class="h-l-logo" alt="" />
      <div class="h-l-topic">世界第一无代码平台</div>
    </div>
    <div class="h-right">
      <div class="flex-center">
        <div class="search-content">
          <n-input type="text" placeholder="搜索..." clearable />
        </div>
        <div class="theme-content">
          <n-switch v-model:value="theme" @update:value="themeChange">
            <template #checked-icon>
              <icon icon="material-symbols:nights-stay-rounded" />
            </template>
            <template #unchecked-icon>
              <icon icon="material-symbols:partly-cloudy-day-outline" />
            </template>
          </n-switch>
        </div>
        <div class="notice-content">
          <div class="n-c-wrap" title="通知">
            <icon
              icon="material-symbols:add-alert-outline-rounded"
              size="26px"
            />
          </div>
        </div>
        <div class="user-content flex-center">
          <n-avatar
            round
            size="large"
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
          <div class="h-r-a-name">张三</div>
        </div>
        <div class="logout flex-center" @click="logout">
          <icon icon="teenyicons:logout-outline" size="18px" />
          注销
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.theme-white {
  color: #000;
  background-color: #fff;
  border-bottom: 1px solid rgb(241, 241, 241);
}
.theme-black {
  color: #fff;
  background-color: #333536;
  border-bottom: 1px solid rgb(88, 87, 87);
}
.h-l-logo {
  height: 50px;
}
.search-content,
.user-content,
.notice-content,
.logout {
  margin: 0 10px;
  cursor: pointer;
}
.n-c-wrap {
  padding: 8px;
  border-radius: 3px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.logout {
  padding: 5px 8px;
  font-size: 15px;
  transition: all 0.2s;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.h-r-a-name {
  font-size: 17px;
  margin-left: 10px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header {
  min-width: 600px;
  padding: 10px 30px;
  box-sizing: content-box;
  transition: all .2s;
  .h-l-topic {
    font-size: 24px;
    margin-left: 10px;
    letter-spacing: 1px;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
}

.search-content {
  @media screen and (max-width: 1024px) {
    display: none;
  }
}
.h-right {
  text-align: right;
}
</style>
