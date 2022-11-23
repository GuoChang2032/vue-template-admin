<script lang="ts">
import { defineComponent, ref, Component, h } from "vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
import type { MenuOption } from "naive-ui";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);
    const activeKey = ref<string>("");
    const menuOptions: MenuOption[] = [
      {
        label: "且听风吟",
        key: "hear-the-wind-sing",
        icon: renderIcon(BookIcon),
      },
      {
        label: "1973年的弹珠玩具",
        key: "pinball-1973",
        icon: renderIcon(BookIcon),
        disabled: true,
        children: [
          {
            label: "鼠",
            key: "rat",
          },
        ],
      },
      {
        label: "寻羊冒险记",
        key: "a-wild-sheep-chase",
        disabled: true,
        icon: renderIcon(BookIcon),
      },
      {
        label: "舞，舞，舞",
        key: "dance-dance-dance",
        icon: renderIcon(BookIcon),
        children: [
          {
            type: "group",
            label: "人物",
            key: "people",
            children: [
              {
                label: "叙事者",
                key: "narrator",
                icon: renderIcon(PersonIcon),
              },
              {
                label: "羊男",
                key: "sheep-man",
                icon: renderIcon(PersonIcon),
              },
            ],
          },
          {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
            children: [
              {
                label: "威士忌",
                key: "whisky",
              },
            ],
          },
          {
            label: "食物",
            key: "food",
            children: [
              {
                label: "三明治",
                key: "sandwich",
              },
            ],
          },
          {
            label: "过去增多，未来减少",
            key: "the-past-increases-the-future-recedes",
          },
        ],
      },
    ];

    return {
      activeKey,
      collapsed,
      menuOptions,
    };
  },
  components: { Footer, Header },
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
      <n-layout-content
        content-style="padding: 24px;height: 100%;background-color:#f1f1f1;"
      >
        <div class="router-content">
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
.router-content {
  height: 100%;
  min-height: 500px;
  background: #fff;
  border-radius: 3px;
  max-height: 100%;
}
.index-wrap {
  height: 100%;
}
.heights {
  height: calc(100% - 70px);
}
</style>
