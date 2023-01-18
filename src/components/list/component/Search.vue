<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import _ from 'super-tools-lib'
const options = defineProps(["direction", "searchOpt"]);

const emit = defineEmits(["searchHandle", "resetHandle"]);

const searchForm = reactive({});

const search = () => {
  emit("searchHandle",{params:searchForm});
};

const reset = () => {
  emit("resetHandle");
};

const setVal = (e: any, name: string,type?:string) => {

  if(type === 'date'){
    e = _.dateFormater('yyyy-MM-DD',e)
  }
  //@ts-ignore
  searchForm[name] = e
};

const computedPlace = (item: any) => {
  return item.placeholder ? item.placeholder : `搜索${item.text}`;
};

onMounted(() => {});
</script>

<template>
  <div class="search-wrap">
    <n-space :justify="options.direction">
      <div v-for="(item, idx) in options.searchOpt" :key="idx">
        <template v-if="item.type === 'input'">
          <n-input
            @update:value="setVal($event, item.name)"
            class="input"
            :placeholder="computedPlace(item)"
          ></n-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <n-select
            class="input"
            filterable
            :placeholder="computedPlace(item)"
            :options="item.options() || []"
            @update:value="setVal($event, item.name)"
          ></n-select>
        </template>
        <template v-else-if="item.type === 'date'">
          <n-date-picker clearable :placeholder="computedPlace(item)" type="date"  @update:value="setVal($event, item.name,item.type)"/>
        </template>
      </div>
      <n-button type="info" @click="search"> 搜索 </n-button>
      <n-button strong secondary type="tertiary" @click="reset">
        重置
      </n-button>
    </n-space>
  </div>
</template>

<style scoped lang="less">
.search-wrap{
  padding: 15px 20px;
}
.input {
  width: 200px;
}
</style>
