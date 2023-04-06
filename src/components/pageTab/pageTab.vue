<script lang="ts" setup>
import { onMounted } from "vue";
import { useIndex } from "@/stores/indexStore";
import { useMenuTag } from "@/stores/menu";
import { useRouter } from "vue-router";
import _ from "super-tools-lib";
import m from "@/utils/mitt";
import { renderIconCustom, switchTab } from "@/utils/utils";

const ui = useIndex();
const ur = useRouter();
const umt = useMenuTag();
const inverted = ref<boolean>(ui.getInverted);
const activeKey = ref<string>(ui.getActiveKey);
const tabs = ref<any>(umt.getTabs);
const options = ref<any>([
  {
    label: "重新加载",
    key: "reload",
    icon: renderIconCustom("bytesize:reload"),
  },
  {
    label: "关闭所有",
    key: "close",
    icon: renderIconCustom("carbon:close-outline"),
  },
]);
onMounted(() => {});

onUnmounted(() => {
  m.off("layoutTabChange");
  m.off("login");
});

m.on("layoutTabChange", (e: any) => {
  activeKey.value = e.val;
});
m.on("login", () => {
  tabs.value = umt.getTabs;
});

watch(
  () => umt.getTabs,
  (nv, ov) => {
    tabs.value = nv;
  }
);
watch(
  () => ui.getInverted,
  (nv, ov) => {
    inverted.value = nv;
  }
);
watch(
  () => ui.getActiveKey,
  (nv, ov) => {
    activeKey.value = nv;
  }
);

const judge = (name: string): string => {
  // 选中
  if (activeKey.value === name) {
    return inverted.value ? "select-black" : "white";
  } else {
    // 未选中
    return inverted.value ? "black" : "no-select-white";
  }
};
const choose = (path: string, pname: string) => {
  switchTab(pname);
  activeKey.value = pname;
  ur.push({ path });
};

const closeTab = (path: string, selectName: string) => {
  let tab = tabs.value;
  let p: string = "/";
  let pname: string = "";
  tab.forEach((item: any, idx: number) => {
    if (item.path === path) {
      tab.splice(idx, 1);
      p = tab[idx - 1].path;
      pname = tab[idx - 1].name;
    }
  });
  if (activeKey.value === selectName) {
    switchTab(pname);
    activeKey.value = pname;
    ur.push({ path: p });
  }
};

const onSelect = (key: string) => {
  if (key === "reload") {
    location.reload();
  } else if (key === "close") {
    switchTab("index");
    ur.push({ path: "/index" });
    activeKey.value = "index";
    umt.resetTab();
  }
};
</script>

<template>
  <div class="flex flex-wrap px-2">
    <div class="flex items-center justify-center mr-2 cursor-pointer">
      <n-dropdown
        :options="options"
        @select="onSelect"
        trigger="click"
        placement="bottom-start"
      >
        <icon icon="ic:round-menu" size="26px" />
      </n-dropdown>
    </div>
    <div
      v-for="item in tabs"
      :key="item.name"
      :class="[
        'tab-wrap my-1 mx-1',
        judge(item.name),
        item.name === 'index' ? 'pr-4' : 'pr-9',
      ]"
      @click="choose(item.path, item.name)"
    >
      <div class="">{{ item.meta.title }}</div>
      <div
        v-if="item.name !== 'index'"
        class="flex items-center justify-center icon-content justify-items-center"
        @click.stop="closeTab(item.path, item.name)"
      >
        <icon icon="ic:baseline-close" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tab-wrap {
  position: relative;
  padding-top: 8px;
  padding-bottom: 6px;
  padding-left: 14px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  .icon-content {
    position: absolute;
    right: 8px;
    transition: all 0.3s;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    transform: translateY(-50%);
    &:hover {
      background-color: #cfcfcfb7;
    }
  }
}
.white {
  background-color: #4258e5;
}
.select-black {
  background-color: #202541;
}
.no-select-white {
  background-color: #eee;
  color: #333;
}
.black {
  background-color: black;
}
</style>
