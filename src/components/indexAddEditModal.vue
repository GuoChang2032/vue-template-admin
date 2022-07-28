<script lang='ts'>
import { defineComponent, ref, watch, reactive } from "vue";
import { sourceOpt, Message } from "@/utils/tool.js";
import http from "@/service/http";
import bus from "@/utils/bus";
export default defineComponent({
  name: "indexAddEditModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    modalType: {
      type: String,
      required: false,
    },
    itemData: {
      type: Object,
      required: false,
    },
  },
  setup(props, context) {
    watch(
      () => [props.show, props.modalType, props.itemData],
      (state: any, prevState) => {
        isShow.value = state[0];
        modalType.value = state[1];
        // 如果是编辑,回显
        if (state[2]) {
          model.value = state[2];
        }
      }
    );

    const isShow = ref(props.show);
    // 1添加 2编辑
    const modalType = ref(props.modalType);
    const model = ref({
      querySource: "",
      articleName: "",
      authorComp: "",
      articleAuthor: "",
    });
    const cancel = () => {
      isShow.value = false;
      context.emit("close");
    };
    return {
      isShow,
      model,
      sourceOpt,
      modalType,
      // 取消
      cancel,
      // 确定新增/编辑
      confirm() {
        if (!model.value.querySource) {
          Message("warning", "请选择查找源");
          return;
        }
        bus.emit("loading", { show: true });
        let url = "";
        let action = "post";
        if (modalType.value === "1") {
          url = "/crawercontents/crawerContents/add";
          action = "post";
        } else {
          url = "/crawercontents/crawerContents/edit";
          action = "put";
        }
        http
          .action(action, url, model.value)
          .then((res) => {
            Message(
              "success",
              modalType.value === "1" ? "新建成功" : "编辑成功"
            );
            bus.emit("reload");
            cancel();
            model.value = {
              querySource: "",
              articleName: "",
              authorComp: "",
              articleAuthor: "",
            };
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            bus.emit("loading", { show: false });
          });
      },
    };
  },
});
</script>

<template>
  <div>
    <el-dialog
      @close="cancel"
      :width="450"
      v-model="isShow"
      :title="modalType === '1' ? '新建' : '编辑'"
    >
      <el-form
        :model="model"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <el-form-item label="查找源" prop="querySource">
          <el-select
            style="width: 100%"
            v-model="model.querySource"
            placeholder="选择查找源"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, idx) in sourceOpt"
              :key="idx"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="论文标题" prop="articleName">
          <el-input v-model="model.articleName" placeholder="输入论文标题" />
        </el-form-item>
        <el-form-item label="公司" prop="authorComp">
          <el-input v-model="model.authorComp" placeholder="输入公司" />
        </el-form-item>
        <el-form-item label="作者" prop="articleAuthor">
          <el-input v-model="model.articleAuthor" placeholder="输入作者" />
        </el-form-item>
      </el-form>
      <div class="add-btn-content">
        <n-button @click="cancel"> 取消 </n-button>
        <n-button type="primary" @click="confirm"> 确定 </n-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang='less'>
.add-btn-content {
  text-align: right;
  button {
    margin: 0 0 20px 10px;
  }
}
.title {
  font-size: 22px;
  color: #000;
}
</style>
