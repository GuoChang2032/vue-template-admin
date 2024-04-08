<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { userInfoAbout, Message } from "@/utils/utils";
import { genFileId } from "element-plus";
import type {
  UploadFile,
  UploadProps,
  UploadInstance,
  UploadRawFile,
} from "element-plus";
import icon from "@/components/icon.vue";
export default defineComponent({
  components: { icon },
  props: {
    file: {
      require: false,
      type: String,
      default: "",
    },
    showFileName: {
      require: false,
      type: Boolean,
      default: false,
    },
    showFileList: {
      require: false,
      type: Boolean,
      default: true,
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
    const fileList = ref<any>([]);
    const showFileList = ref<boolean>(true);
    const dialogVisible = ref(false);
    token.value = userInfoAbout("token");
    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!;
      dialogVisible.value = true;
    };
    const dialogImageUrl = ref("");
    const upload = ref<UploadInstance>();
    const com_type = ref<string>("image");

    watch(
      () => prop.file,
      (nv, ov) => {
        fileList.value = getFileList(prop.file);
        showFileList.value = prop.showFileList;
      }
    );

    const handleExceed: UploadProps["onExceed"] = (files) => {
      upload.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upload.value!.handleStart(file);
      upload.value!.submit();
    };
    const getFileList = (url: string) => {
      if (prop.showFileName) {
        let name = url.split("/").pop();
        return [{ name: name, url: url }];
      } else {
        return [{ name: "img", url: url }];
      }
    };
    onMounted(() => {
      prop.file && (fileList.value = getFileList(prop.file));
      com_type.value = prop.type;
    });

    const dealCallbackPath = (path: string): string => {
      if (path && path.indexOf("http") >= 0) {
        return path;
      }
      return import.meta.env.VITE_APP_API_STATIC_URL + "/" + path;
    };
    return {
      com_type,
      upload,
      token,
      dialogVisible,
      dialogImageUrl,
      fileList,
      uploadURL: ref<string>(
        import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload"
      ),
      uploadFaceURL: ref<string>(
        import.meta.env.VITE_APP_API_BASE_URL + "/front/common/uploadface"
      ),
      handlePictureCardPreview,
      success(res: any) {
        if (res.success) {
          Message("success", "上传成功");
          context.emit("uploadSuccess", {
            path: dealCallbackPath(res.message),
          });
        } else {
          Message("warning", "上传失败");
        }
      },
      progress(res: any) {
        Message("info", "上传中");
        context.emit("uploadProgress", {});
      },
      fileSuccess(res: any) {
        if (res.success) {
          Message("success", "上传成功");
          context.emit("uploadSuccess", {
            path: dealCallbackPath(res.message),
          });
        } else {
          Message("warning", "上传失败");
        }
      },
      faceSuccess(res: any) {
        if (res.success) {
          Message("success", "上传成功");
          context.emit("uploadSuccess", {
            path: import.meta.env.VITE_APP_API_FACE_URL + res.result,
          });
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
  <template v-if="com_type === 'image'">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      :action="uploadURL"
      :on-exceed="handleExceed"
      :limit="max"
      @success="success"
      @progress="progress"
      :headers="{
        'x-access-token': token,
      }"
      list-type="picture-card"
    >
      <icon icon="fluent:add-24-regular" size="30px" />
    </el-upload>
  </template>
  <template v-else-if="com_type === 'face'">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      :action="uploadFaceURL"
      :on-exceed="handleExceed"
      :limit="max"
      @success="faceSuccess"
      :headers="{
        'x-access-token': token,
      }"
      list-type="picture-card"
    >
      <icon icon="fluent:add-24-regular" size="30px" />
    </el-upload>
  </template>
  <template v-else-if="com_type === 'file'">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      multiple
      :action="uploadURL"
      :on-exceed="handleExceed"
      :limit="max"
      @success="fileSuccess"
      @progress="progress"
      :on-remove="handleRemove"
      :show-file-list="showFileList"
      :headers="{
        'x-access-token': token,
      }"
      list-type="text"
    >
      <el-button>{{ $props.text }}</el-button>
    </el-upload>
  </template>
  <template v-else>
    <el-upload
      drag
      multiple
      ref="upload"
      v-model:file-list="fileList"
      :action="uploadURL"
      :limit="max"
      @success="success"
      :headers="{
        'x-access-token': token,
      }"
    >
      <icon icon="material-symbols:cloud-upload" size="40px" />
      <div class="el-upload__text">
        {{ $props.text }}
      </div>
      <!-- <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template> -->
    </el-upload>
  </template>
</template>

<style scoped lang="less"></style>
