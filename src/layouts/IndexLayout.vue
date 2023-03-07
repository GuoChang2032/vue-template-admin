<script lang="ts" setup>
import { Component } from "vue";
// import Footer from "@/components/footer.vue";
// import Header from "@/components/header.vue";
import { NIcon } from "naive-ui";
import { SettingsOutline, HomeOutline } from "@vicons/ionicons5";
import { useIndex } from "@/stores/indexStore";
import m from "@/utils/mitt";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const { t } = useI18n();
const ui = useIndex();
const collapsed = ref<boolean>(false);
const inverted = ref<boolean>(ui.getInverted);
const menuOptions = ref<any>([]);
const clientWidth = ref<number>(document.body.clientWidth);
const activeKey = ref<string>("1");
m.on("switch", (e: any) => {
  inverted.value = e.val;
});
m.on('menuCollapsed',(e:any)=>{
  collapsed.value = e.val;
})

watch(
  () => clientWidth.value,
  (nv, ov) => {
    if (nv < 900) {
      collapsed.value = true;
    } else {
      collapsed.value = false;
    }
  }
);

onMounted(() => {
  setMenuData();
  window.onresize = () => {
    return (() => {
      clientWidth.value = document.body.clientWidth;
    })();
  };
});

const setMenuData = () => {
  let m = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: "index",
              params: {
                lang: "zh-CN",
              },
            },
          },
          { default: () => t("page.index") }
        ),
      key: "1",
      icon: renderIcon(HomeOutline),
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: "dashboard",
              params: {
                lang: "zh-CN",
              },
            },
          },
          { default: () => t("page.dashboard") }
        ),
      icon: renderIcon(SettingsOutline),
      key: "2",
    },
    // {
    //   label: () =>
    //     h(
    //       RouterLink,
    //       {
    //         to: {
    //           name: "chat",
    //           params: {
    //             lang: "zh-CN",
    //           },
    //         },
    //       },
    //       { default: () => t("page.chat") }
    //     ),
    //   icon: renderIcon(SettingsOutline),
    //   key: "chat",
    // },
    {
      label: () => {
        return t("page.system");
      },
      icon: renderIcon(SettingsOutline),
      key: "3",
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "userManage",
                  params: {
                    lang: "zh-CN",
                  },
                },
              },
              { default: () => t("page.userManage") }
            ),
          key: "userManage",
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: "routeManage",
                  params: {
                    lang: "zh-CN",
                  },
                },
              },
              { default: () => t("page.routeManage") }
            ),
          key: "routeManage",
        },
      ],
    },
  ];
  menuOptions.value = m;
};

onUnmounted(() => {
  m.off("switch");
});
</script>

<template>
  <n-layout style="height: 100%">
    <n-layout class="heights" has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="logo-center">
          <img v-show="collapsed" src="@/assets/logo.png" class="h-l-logo" alt="" />
          <img v-show="!collapsed" src="@/assets/elogo-large.png" class="h-l-logo" alt="" />
        </div>
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header> <Header /> </n-layout-header>
        <n-layout-content :class="['nlc',inverted ? 'n-l-c-b' : 'n-l-c-w']">
          <div :class="['router-content', inverted ? 'bkb' : 'bkw']">
            <n-scrollbar style="max-height: 100%;">
              <router-view />
            </n-scrollbar>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer>成府路</n-layout-footer> -->
  </n-layout>

  <!-- <Footer /> -->
</template>

<style scoped lang="less">
.h-l-logo {
  height: 50px;
}
.logo-center {
  text-align: center;
  padding: 15px 0;
  font-size: 22px;
}
.bkb {
  background-color: rgb(24, 24, 28);
}
.bkw {
  background: #fff;
}
.nlc{
  height: calc(100% - 71px);
  padding: 24px 12px;
  background-color: #f5f5f5;
}
.n-l-c-w {
  background-color: #f5f5f5;
}
.n-l-c-b {
  background-color: black;
}
.router-content {
  height: calc(100% - 25.5px);
  min-height: 500px;
  border-radius: 3px;
  max-height: 100%;
}
.index-wrap {
  height: 100%;
}
.heights {
  height: 100%;
}
</style>
