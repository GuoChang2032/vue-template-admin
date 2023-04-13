<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { getUserInfo, Message } from "@/utils/utils";
import { genFileId } from "element-plus";
import type {
  UploadFile,
  UploadProps,
  UploadInstance,
  UploadRawFile,
} from "element-plus";
import icon from "@/components/icon.vue";

interface FileListType {
  name: string;
  url: string;
}

export default defineComponent({
  components: { icon },
  props: {
    file: {
      require: false,
      type: String,
      default: "",
    },
    text: {
      require: false,
      type: String,
      default: "上传文件",
    },
    max: {
      require: false,
      type: Number,
      default: 1,
    },
    type: {
      require: false,
      type: String,
      default: "image",
    },
  },
  setup(prop, context) {
    const token = ref<string>("");
    const fileList = ref<Array<FileListType>>([]);
    const dialogVisible = ref(false);
    token.value = getUserInfo()?.token;
    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!;
      dialogVisible.value = true;
    };
    const dialogImageUrl = ref("");
    const upload = ref<UploadInstance>();
    watch(
      () => prop.file,
      (nv, ov) => {
        fileList.value = [{ name: "img", url: prop.file }];
      }
    );

    const handleExceed: UploadProps["onExceed"] = (files) => {
      upload.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upload.value!.handleStart(file);
      upload.value!.submit();
    };

    return {
      upload,
      token,
      dialogVisible,
      dialogImageUrl,
      fileList,
      uploadURL: ref<string>(
        import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload"
      ),
      handlePictureCardPreview,
      success(res: any) {
        if (res.success) {
          Message("success", "上传成功");
          context.emit("uploadSuccess", { path: res.message });
        } else {
          Message("warning", "上传失败");
        }
      },
      fileSuccess(res: any) {
        if (res.success) {
          Message("success", "上传成功");
          context.emit("uploadSuccess", { path: res.message });
        } else {
          Message("warning", "上传失败");
        }
      },

      handleRemove() {},
      handleExceed,
    };
  },
});
</script>

<template>
  <template v-if="type === 'image'">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      :action="uploadURL"
      :on-exceed="handleExceed"
      :limit="max"
      @success="success"
      :headers="{
        'x-access-token': token,
      }"
      list-type="picture-card"
    >
      <icon icon="fluent:add-24-regular" size="30px" />
    </el-upload>
  </template>
  <template v-else-if="type === 'file'">
    <el-upload
      v-model:file-list="fileList"
      multiple
      :action="uploadURL"
      :limit="max"
      @success="fileSuccess"
      :on-remove="handleRemove"
      :headers="{
        'x-access-token': token,
      }"
      list-type="text"
    >
      <el-button>点击上传文件</el-button>
    </el-upload>
  </template>
</template>

<style scoped lang="less"></style>
