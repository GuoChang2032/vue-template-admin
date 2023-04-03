<script lang="ts" setup>
import { useIndex } from "@/stores/indexStore";
import { useMenus } from "@/stores/menu";
import m from "@/utils/mitt";
import { setMenuData } from "@/utils/utils";
import { useUserInfo } from "@/stores/user";
import { MenuInst } from "naive-ui";
// import headerCom from '@/components/headerCom'
const ui = useIndex();
const um = useMenus();
const inverted = ref<boolean>(ui.getInverted);
const collapsed = ref<boolean>(false);
const isCached = ref<boolean>(false);
const menuOptions = ref<any>([]);
const clientWidth = ref<number>(document.body.clientWidth);
const activeKey = ref<string>("");
const menuInstRef = ref<MenuInst | null>(null);
const us = useUserInfo();
// const menus = ref<any>(um.getMenus);

m.on("switch", (e: any) => {
  inverted.value = e.val;
});
m.on("menuCollapsed", (e: any) => {
  collapsed.value = e.val;
});
m.on("pageTabChange", (e: any) => {
  activeKey.value = e.val;
  menuInstRef.value?.showOption(activeKey.value);
});
// m.on("login", (e: any) => {
  
// });
// 用户角色变化,重新获取菜单
watch(
  () => us.getInfo,
  (nv, ov) => {
    menuOptions.value = setMenuData();
  }
);
watch(
  () => clientWidth.value,
  (nv, ov) => {
    collapsed.value = nv < 900 ? true : false;
  }
);

const setMenu = () => {
  menuOptions.value = setMenuData();
};

const menuSelect = (key: string) => {
  ui.setActiveKey(key);
  m.emit("layoutTabChange", { val: key });
};

const expandMenuOpt = () => {
  activeKey.value = ui.getActiveKey;
  menuInstRef.value?.showOption(ui.getActiveKey);
};

onMounted(() => {
  window.onresize = () => {
    return (() => {
      clientWidth.value = document.body.clientWidth;
    })();
  };
  expandMenuOpt();
  setMenu();
});

onUnmounted(() => {
  m.off("switch");
  m.off("menuCollapsed");
  m.off("pageTabChange");
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
        <div class="grid py-2 justify-items-center">
          <img
            v-show="collapsed"
            src="@/assets/logo.png"
            class="h-l-logo"
            alt=""
          />
          <img
            v-show="!collapsed"
            src="@/assets/elogo-large.png"
            class="h-l-logo"
            alt=""
          />
        </div>
        <n-menu
          ref="menuInstRef"
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update:value="menuSelect"
        />
      </n-layout-sider>
      <n-layout :class="['flex flex-col', inverted ? 'n-l-c-b' : 'n-l-c-w']">
        <div class="fixed-head"><headerCom /></div>
        <div class="flex-auto">
          <div class="p-4">
            <router-view v-slot="{ Component }">
              <transition name="slide-fade">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="less">
.fixed-head {
  position: sticky;
  right: 0;
  top: 0;
  left: 0;
  z-index: 999;
}
.place-content {
  height: 104px;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  // transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.h-l-logo {
  height: 45px;
}
.bkb {
  background-color: rgb(24, 24, 28);
}
.bkw {
  background: #fff;
}

.nlc {
  // height: calc(100% - 71px);
  background-color: #f5f5f5c2;
}
.n-l-c-w {
  background-color: #f5f5f5c2;
}
.n-l-c-b {
  background-color: black;
}
.router-content {
  // height: calc(100% - 25.5px);
  height: 100%;
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
