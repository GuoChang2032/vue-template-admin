<script lang="ts" setup>
import http from "@/service/http";
import { onMounted } from "vue";
import { useIndex } from "@/stores/indexStore";
import _ from "super-tools-lib";
onMounted(() => {
  getWeather();
});

const loading = ref<boolean>(false);
const key = "e61122acf3ef4e94bdf45105860a4e2d";
const ui = useIndex();
const inverted = ref<boolean>(ui.getInverted);
const wd = ref<any>(null);
const qiIcon = ref<any>([]);
const upTime = ref<string>("");
watch(
  () => ui.getInverted,
  (nv, ov) => {
    inverted.value = nv;
  }
);

const getWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        loading.value = true;
        let loc = position.coords.longitude + "," + position.coords.latitude;
        http
          .get(`/weather/3d?location=${loc}&key=${key}`)
          .then((res: any) => {
            wd.value = res.daily[0];
            upTime.value = _.dateFormater(
              "yyyy-MM-DD HH:mm:ss",
              res.updateTime
            );
            qiIcon.value = [
              "qi-" + wd.value.iconDay,
              "qi-" + wd.value.iconNight,
            ];
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            loading.value = false;
          });
      },
      (err) => {
        console.error("get location error", err);
      }
    );
  }
};
</script>

<template>
  <template v-if="wd">
    <div
      class="px-4 py-2 mb-2 rounded-lg shadow-md"
      :class="inverted ? 'bg-gray-800' : 'bg-blue-100'"
    >
      <n-skeleton v-if="loading" text :repeat="2" />
      <template v-else>
        <div class="flex">
          <div class="flex-none w-16 mr-2">
            <i style="font-size: 3rem" :class="qiIcon[0]"></i>
          </div>
          <div class="flex-grow">
            <div class="text-base">
              今日白天 {{ wd.textDay }}
              <i class="text-base" :class="qiIcon[0]"></i>，夜晚
              {{ wd.textNight }}
              <i class="text-base" :class="qiIcon[1]"></i>，最高气温
              {{ wd.tempMax }}℃，<span v-if="wd.tempMax >= 30"
                >注意解暑降温，</span
              >最低气温 {{ wd.tempMin }}℃，<span v-if="wd.tempMin <= 5"
                >注意防寒保暖 ，</span
              >
              紫外线强度{{ wd.uvIndex }}，<span v-if="wd.uvIndex > 5"
                >注意防晒，</span
              >相对湿度{{ wd.humidity || 0 }}%
            </div>
            <div class="my-1 text-sm text-gray-500">
              风向 {{ wd.windDirDay }}，风力 {{ wd.windScaleDay }} 级，风速
              {{ wd.windSpeedDay }} km/h
            </div>
            <div class="text-xs text-right text-gray-400">
              更新时间: {{ upTime }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <n-alert title="Mayday!Mayday!" type="info" closable>
      你似乎在一个虚无之地，我们无法获取你的位置，也无法得知你的天气情况，也许你可以出门自己看。
    </n-alert>
  </template>
</template>

<style scoped lang="less"></style>
