<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Header",
  setup() {
    const options = ref<any>([
      {
        label: "个人中心",
        key: "1",
      },
      {
        label: "退出登录",
        key: "2",
      },
    ]);
    const router = useRouter();
    return {
      options,
      handleSelect(key: string) {
        if (key === "1") {
          router.push({ path: "/usercenter" });
        }
      },
      goCenter() {
        router.push({ path: "/usercenter" });
      },
    };
  },
});
</script>

<template>
  <div class="header flex-between">
    <div class="h-left flex-center-start">
      <img src="@/assets/logo.png" style="width: 50px" alt="" />
      <span class="h-l-topic">世界第一无代码平台</span>
    </div>
    <div class="h-right">
      <!-- <n-dropdown trigger="hover" :options="options" @select="handleSelect"> -->
      <div class="flex-center">
        <div class="search-content">
          <n-input type="text" placeholder="搜索" clearable />
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
        <div class="logout flex-center">
          <icon icon="teenyicons:logout-outline" size="18px" />
          注销
        </div>
      </div>
      <!-- </n-dropdown> -->
    </div>
  </div>
</template>

<style scoped lang="less">
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
  color: #fff;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.logout {
  padding: 5px 8px;
  font-size: 15px;
  color: #fff;
  transition: all 0.2s;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.h-r-a-name {
  color: #fff;
  font-size: 17px;
  margin-left: 10px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header {
  padding: 10px 30px;
  background-color: #404346;
}
.h-l-topic {
  font-size: 24px;
  color: #fff;
  margin-left: 10px;
  letter-spacing: 1px;
}
.h-right {
  text-align: right;
}
</style>
