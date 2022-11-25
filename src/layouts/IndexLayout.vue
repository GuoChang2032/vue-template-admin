<script lang="ts">
import {
  defineComponent,
  ref,
  Component,
  h,
  onMounted,
  watch,
  onUnmounted,
} from "vue";
import Footer from "@/components/footer.vue";
import Header from "@/components/header.vue";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";
import { useIndex } from "@/stores/indexStore";
import m from "@/utils/mitt";
import { RouterLink } from "vue-router";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default defineComponent({
  setup() {
    const ui = useIndex();
    const collapsed = ref<boolean>(false);
    const inverted = ref<boolean>(ui.getInverted);
    const activeKey = ref<string>("");
    const menuOptions = ref<any>([]);
    const clientWidth = ref<number>(document.body.clientWidth);

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
              { default: () => "首页" }
            ),

          key: "1",
          icon: renderIcon(BookIcon),
        },
        {
          label: "人生如寄",
          key: "2",
          icon: renderIcon(BookIcon),
          children: [
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
                  { default: () => "Dashboard" }
                ),

              key: "3",
            },
          ],
        },
        // {
        //   label: "寻羊冒险记",
        //   key: "a-wild-sheep-chase",
        //   disabled: true,
        //   icon: renderIcon(BookIcon),
        // },
        // {
        //   label: "舞，舞，舞",
        //   key: "dance-dance-dance",
        //   icon: renderIcon(BookIcon),
        //   children: [
        //     {
        //       type: "group",
        //       label: "人物",
        //       key: "people",
        //       children: [
        //         {
        //           label: "叙事者",
        //           key: "narrator",
        //           icon: renderIcon(PersonIcon),
        //         },
        //         {
        //           label: "羊男",
        //           key: "sheep-man",
        //           icon: renderIcon(PersonIcon),
        //         },
        //       ],
        //     },
        //     {
        //       label: "饮品",
        //       key: "beverage",
        //       icon: renderIcon(WineIcon),
        //       children: [
        //         {
        //           label: "威士忌",
        //           key: "whisky",
        //         },
        //       ],
        //     },
        //     {
        //       label: "食物",
        //       key: "food",
        //       children: [
        //         {
        //           label: "三明治",
        //           key: "sandwich",
        //         },
        //       ],
        //     },
        //     {
        //       label: "过去增多，未来减少",
        //       key: "the-past-increases-the-future-recedes",
        //     },
        //   ],
        // },
      ];
      menuOptions.value = m;
    };

    onUnmounted(() => {
      m.off("switch");
    });

    return {
      inverted,
      clientWidth,
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
        :inverted="inverted"
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :inverted="inverted"
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout-content :class="[inverted ? 'n-l-c-b' : 'n-l-c-w']">
        <n-breadcrumb>
          <n-breadcrumb-item> 北京总行 </n-breadcrumb-item>
          <n-breadcrumb-item> 天津分行 </n-breadcrumb-item>
        </n-breadcrumb>
        <div :class="['router-content', inverted ? 'bkw' : 'bkb']">
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
  background: #fff;
}
.bkw {
  background-color: transparent;
}
.n-l-c-w {
  padding: 24px;
  height: 100%;
  background-color: #f1f1f1;
}
.n-l-c-b {
  padding: 24px;
  height: 100%;
  background-color: #000;
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
