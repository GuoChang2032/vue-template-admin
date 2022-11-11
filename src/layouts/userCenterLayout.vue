<script lang="ts">
import { defineComponent, ref, onMounted, h } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { NIcon } from "naive-ui";
import { getUserInfo, logout, Message } from "@/utils/hooks";
import { BookOutline } from "@vicons/ionicons5";
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
export default defineComponent({
  setup() {
    const router = useRouter();
    const menuOpt = ref<any>([
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "usercenter",
              },
            },
            { default: () => "课程中心" }
          ),
        key: "1",
        icon: renderIcon(BookOutline),
      },
    ]);
    onMounted(() => {});

    return {
      menuOpt,
      logoutHandle() {
        router.push({ path: "/login" });
      },
      goFuckingIndex() {
        router.push({ path: "/" });
      },
      menuChange(key: string, item: any) {
        // 退出登录要清除
      },
    };
  },
  components: {},
});
</script>

<template>
  <div class="uc-header">
    <div class="g-layout-container flex-between">
      <div class="uc-h-left flex-center-start" @click="goFuckingIndex">
        <img class="logo" src="@/assets/logo.png" alt="" />
        <div class="uc-head-topic">个人中心</div>
      </div>
      <div class="uc-h-right flex-center">
        <div class="description1" style="margin-right: 10px">
          欢迎你，小瘪三
        </div>
        <div class="logout flex-center" @click="logoutHandle">
          <icon icon="ant-design:logout-outlined" size="22px" />
          登出
        </div>
      </div>
    </div>
  </div>

  <div class="g-layout-container">
    <div class="main-content">
      <n-layout>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            show-trigger
          >
            <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOpt"
              @update:value="menuChange"
            />
          </n-layout-sider>
          <n-layout-content
            content-style="padding: 14px 24px;min-height:700px;height: calc(100vh - 140px);"
          >
            <div class="nav">
              <n-breadcrumb>
                <n-breadcrumb-item @click="goFuckingIndex">
                  首页
                </n-breadcrumb-item>
                <n-breadcrumb-item> 个人中心</n-breadcrumb-item>
              </n-breadcrumb>
            </div>
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>
<style scoped lang="less">
.tag-content {
  margin-bottom: 10px;
  .t-c-tag {
    margin-right: 20px;
  }
}
.nav {
  padding-bottom: 10px;
}

.uc-header {
  padding: 8px 0;
  background-color: #3c3c3ce6;
  color: rgb(240, 240, 240);
}

.main-content {
  margin: 15px 0;
  height: 100%;
}

.logo {
  width: 40px;
  margin-right: 15px;
}

.logout {
  padding: 8px;
  transition: all 0.25s;
  cursor: pointer;
  border-radius: 2px;
  margin-left: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.uc-h-left {
  cursor: pointer;
}

.uc-head-topic {
  font-size: 20px;
  font-weight: bold;
}
</style>
