<script lang="ts" setup>
import { useIndex } from "@/stores/indexStore";
import { onMounted, ref } from "vue";
import m from "@/utils/mitt";
import { useDark, useToggle } from "@vueuse/core";
import { Message, logout } from "@/utils/utils";
import { useI18n } from "vue-i18n";
const isDark = useDark();
const toggleDark = useToggle(isDark);

const inver = useIndex();
const theme = ref<boolean>(false);
const isCollapsed = ref<boolean>(false);

onMounted(() => {
  theme.value = inver.getInverted;
});
const i18n = useI18n();
const { t } = useI18n();

const options = ref<any>([
  {
    label: "简体中文",
    key: "zh",
  },
  {
    label: "英语",
    key: "en",
  },
]);
const handleSelect = (key: string) => {
  Message("success", `切换${key === "zh" ? "中文" : "英语"}成功`);
  i18n.locale.value = key;
};
const logoutss = () => {
  logout();
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
</script>

<template>
  <div
    :class="['header', 'flex-between', theme ? 'theme-black' : 'theme-white']"
  >
    <div class="h-left flex-center-start">
      <icon class="contract" v-if="isCollapsed" icon="ant-design:menu-unfold-outlined" size="26px" @click="collapseChange"/>
      <icon class="contract" v-else icon="ant-design:menu-fold-outlined" size="26px" @click="collapseChange"/>
      <n-breadcrumb>
        <n-breadcrumb-item> {{ t("page.index") }} </n-breadcrumb-item>
        <n-breadcrumb-item> pagename </n-breadcrumb-item>
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
          <div class="n-c-wrap" title="通知">
            <icon
              icon="material-symbols:add-alert-outline-rounded"
              size="24px"
            />
          </div>
        </div>
        <div class="i18n-content">
          <n-dropdown trigger="hover" :options="options" @select="handleSelect">
            <div class="n-c-wrap" title="语言">
              <icon icon="mdi:language" size="23px" />
            </div>
          </n-dropdown>
        </div>
        <div class="user-content flex-center">
          <n-avatar
            round
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
          <div class="h-r-a-name">张三</div>
        </div>
        <div class="logout flex-center" @click="logoutss">
          <icon icon="teenyicons:logout-outline" size="18px" />
          {{ t("logout") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.contract {
  padding: 5px;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(65, 65, 65, 0.2);
  }
}
.theme-white {
  color: #000;
  background-color: #fff;
  border-bottom: 1px solid rgb(241, 241, 241);
}
.theme-black {
  color: #fff;
  background-color: #333536;
  border-bottom: 1px solid rgb(88, 87, 87);
}
.h-l-logo {
  height: 50px;
}
.search-content,
.user-content,
.theme-content,
.logout {
  margin: 0 10px;
  font-size: 18px;
  cursor: pointer;
}
.i18n-content,
.notice-content {
  cursor: pointer;
}
.n-c-wrap {
  padding: 8px;
  border-radius: 3px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(65, 65, 65, 0.2);
  }
}
.logout {
  padding: 5px 8px;
  font-size: 15px;
  transition: all 0.2s;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
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
  min-width: 600px;
  padding: 10px 10px;
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
