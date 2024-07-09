<script lang="ts" setup>
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

const props = withDefaults(
  defineProps<{
    file: string;
    text: string;
    max: number;
    type: string;
    showFileList: boolean;
  }>(),
  {
    file: "",
    text: "上传文件",
    max: 1,
    type: "image",
    showFileList: true,
  }
);
const emits = defineEmits(["uploadSuccess", "uploadProgress"]);

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
  () => props.file,
  (nv, ov) => {
    fileList.value = [{ name: "img", url: props.file }];
  }
);

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  upload.value!.submit();
};

const uploadURL = ref<string>(
  import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload"
);
const success = (res: any) => {
  if (res.success) {
    Message("success", "上传成功");
    emits("uploadSuccess", { path: res.message });
  } else {
    Message("warning", "上传失败");
  }
};
const fileSuccess = (res: any) => {
  if (res.success) {
    Message("success", "上传成功");
    emits("uploadSuccess", { path: res.message });
  } else {
    Message("warning", "上传失败");
  }
};
const handleRemove = () => {};
const progress = (res: any) => {
  Message("info", "上传中");
  emits("uploadProgress", {});
};
</script>

<template>
  <template v-if="type === 'image'">
    <el-upload
      class="image-upload"
      ref="upload"
      v-model:file-list="fileList"
      :action="uploadURL"
      :on-exceed="handleExceed"
      :limit="max"
      @success="success"
      @progress="progress"
      :on-remove="handleRemove"
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
      ref="upload"
      v-model:file-list="fileList"
      multiple
      :action="uploadURL"
      :limit="max"
      @success="fileSuccess"
      @progress="progress"
      :on-remove="handleRemove"
      :show-file-list="props.showFileList"
      :headers="{
        'x-access-token': token,
      }"
      list-type="text"
    >
      <el-button>{{ props.text }}</el-button>
    </el-upload>
  </template>
</template>

<style scoped lang="less"></style>
