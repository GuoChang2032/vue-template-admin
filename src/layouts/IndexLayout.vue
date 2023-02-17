<script lang="ts" setup>
import { ref, Component, h, onMounted, watch, onUnmounted } from "vue";
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
    <n-layout-header> <Header /> </n-layout-header>
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
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout-content :class="[inverted ? 'n-l-c-b' : 'n-l-c-w']">
        <n-breadcrumb>
          <n-breadcrumb-item> {{ t("page.index") }} </n-breadcrumb-item>
          <n-breadcrumb-item> 西巴龙 </n-breadcrumb-item>
        </n-breadcrumb>
        <!-- <div class="router-content"> -->
        <div :class="['router-content', inverted ? 'bkb' : 'bkw']">
          <n-scrollbar style="max-height: 100%">
            <router-view />
          </n-scrollbar>
        </div>
      </n-layout-content>
    </n-layout>
    <!-- <n-layout-footer>成府路</n-layout-footer> -->
  </n-layout>

  <!-- <Footer /> -->
</template>

<style scoped lang="less">
.bkb {
  background-color: rgb(24, 24, 28);
}
.bkw {
  background: #fff;
}
.n-l-c-w {
  padding: 24px 12px;
  height: 100%;
  background-color: white;
}
.n-l-c-b {
  padding: 24px 12px;
  height: 100%;
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
  height: calc(100% - 71px);
}
</style>
