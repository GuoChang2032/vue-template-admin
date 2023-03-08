<script lang="ts" setup>
import { useIndex } from "@/stores/indexStore";
import m from "@/utils/mitt";
import { setMenuData } from "@/utils/utils";
import { MenuInst } from "naive-ui";

const ui = useIndex();
const collapsed = ref<boolean>(false);
const inverted = ref<boolean>(ui.getInverted);
const menuOptions = ref<any>([]);
const clientWidth = ref<number>(document.body.clientWidth);
const activeKey = ref<string>("");
const menuInstRef = ref<MenuInst | null>(null);

// 要改成动态路由的话,这也要动态生成菜单
menuOptions.value = setMenuData();
m.on("switch", (e: any) => {
  inverted.value = e.val;
});
m.on("menuCollapsed", (e: any) => {
  collapsed.value = e.val;
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

const menuSelect = (key: string) => {
  ui.setActiveKey(key);
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
});

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
      <n-layout>
        <n-layout-header> <Header /> </n-layout-header>
        <n-layout-content :class="['nlc', inverted ? 'n-l-c-b' : 'n-l-c-w']">
          <!-- <div :class="['router-content', inverted ? 'bkb' : 'bkw']"> -->
          <div class="router-content">
            <n-scrollbar style="max-height: 100%">
              <transition name="slide-fade">
                <router-view />
              </transition>
            </n-scrollbar>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="less">
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
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
  height: calc(100% - 71px);
  padding: 24px 12px;
  background-color: #f5f5f5c2;
}
.n-l-c-w {
  background-color: #f5f5f5c2;
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
