<script lang="ts" setup>
import { useIndex } from "@/stores/indexStore";
import { onMounted, ref } from "vue";
import m from "@/utils/mitt";
import { useDark, useToggle } from "@vueuse/core";
import {
  Message,
  logout,
  routerNameMapping,
  renderIconCustom,
} from "@/utils/utils";
import { notice } from "@/components/noticeComponents";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "@/stores/user";
import { UserLoginInfoType, LanguageType, IndexUserMenu } from "@/utils/types";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const inver = useIndex();
const theme = ref<boolean>(false);
const isCollapsed = ref<boolean>(false);
const pagename = ref<string>(inver.getActiveKey || "");
const i18n = useI18n();
const { t } = useI18n();
const us = useUserInfo();
const user_info = ref<UserLoginInfoType>(us.info);
const options = ref<Array<LanguageType>>([
  {
    label: "简体中文",
    key: "zh",
  },
  {
    label: "英语",
    key: "en",
  },
]);
const userMenu = ref<Array<IndexUserMenu>>([
  {
    label: t("userCenter"),
    key: "userCenter",
    icon: renderIconCustom("ph:user"),
  },
  {
    label: t("logout"),
    key: "logout",
    icon: renderIconCustom("teenyicons:logout-outline"),
  },
]);

watch(
  () => us.info,
  (nv, ov) => {
    user_info.value = nv;
  }
);
watch(
  () => inver.getActiveKey,
  (nv, ov) => {
    pagename.value = nv;
  }
);

onMounted(() => {
  theme.value = inver.getInverted;
});

const handleSelect = (key: string) => {
  Message("success", `切换${key === "zh" ? "中文" : "英语"}成功`);
  i18n.locale.value = key;
};
const themeChange = () => {
  inver.setInverted();
  m.emit("switch", { val: theme.value });
  toggleDark();
};
const collapseChange = () => {
  isCollapsed.value = !isCollapsed.value;
  m.emit("menuCollapsed", { val: isCollapsed.value });
};
const userMenuSelect = (key: string) => {
  if (key === "logout") {
    logout();
  }
};
</script>

<template>
  <div :class="[theme ? 'theme-black' : 'theme-white']">
    <div class="header flex-between" :class="[theme ? 'bm-black' : 'bm-white']">
      <div class="h-left flex-center-start">
        <!-- <icon
          class="contract"
          v-if="isCollapsed"
          icon="ant-design:menu-unfold-outlined"
          size="26px"
          @click="collapseChange"
        />
        <icon
          class="contract"
          v-else
          icon="ant-design:menu-fold-outlined"
          size="26px"
          @click="collapseChange"
        /> -->
        <n-breadcrumb>
          <n-breadcrumb-item> {{ t("page.index") }} </n-breadcrumb-item>
          <n-breadcrumb-item>
            {{ t(routerNameMapping(pagename)) }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <div class="h-right">
        <div class="flex-center">
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
            <notice />
          </div>
          <div class="i18n-content">
            <n-dropdown
              trigger="hover"
              :options="options"
              @select="handleSelect"
            >
              <div class="n-c-wrap" title="语言">
                <icon icon="mdi:language" size="23px" />
              </div>
            </n-dropdown>
          </div>

          <n-dropdown :options="userMenu" @select="userMenuSelect">
            <div class="user-content flex-center">
              <n-avatar size="small" round src="/atom.svg" />
              <div class="h-r-a-name">
                {{ user_info.nickName || "未知名称" }}
              </div>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
    <pageTab />
  </div>
</template>

<style scoped lang="less">
.bm-white {
  border-bottom: 1px solid #f1f1f1;
}
.bm-black {
  border-bottom: 1px solid #404040;
}
.contract {
  padding: 5px;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(134, 134, 134, 0.2);
  }
}
.theme-white {
  color: #000;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
}
.theme-black {
  color: #fff;
  background-color: #1f2022;
  border-bottom: 1px solid #404040;
}
.h-l-logo {
  height: 50px;
}
.search-content,
.user-content,
.theme-content,
.logout {
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
}
.i18n-content,
.notice-content {
  cursor: pointer;
  margin-right: 4px;
}
.n-c-wrap {
  padding: 8px;
  border-radius: 3px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(134, 134, 134, 0.2);
  }
}
.logout {
  padding: 5px 8px;
  font-size: 15px;
  transition: all 0.2s;
  border-radius: 3px;
  &:hover {
    background-color: rgba(134, 134, 134, 0.2);
  }
}
.h-r-a-name {
  font-size: 16px;
  margin-left: 10px;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header {
  padding: 10px 30px 10px 10px;
  box-sizing: content-box;
  transition: all 0.2s;
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
@/types/types