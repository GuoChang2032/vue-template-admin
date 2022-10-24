<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  ref,
  watch,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig, IDomEditor, IEditorConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";
import { getUserInfo } from "@/utils/hooks";

type InsertFnType = (url: string, alt: string, href: string) => void;

export default defineComponent({
  components: { Editor, Toolbar },
  props: {
    isClear: {
      type: Boolean,
      default: false,
      require: false,
    },
    defaultVal: {
      type: String,
      default: "",
      require: false,
    },
    placeholderTxt: {
      type: String,
      default: "请输入内容......",
      require: false,
    },
    excludeKeys: {
      default: [
        "fullScreen",
        // "group-image",
        "group-video",
        "group-more-style",
        "insertTable",
        "divider",
        "todo",
        "numberedList",
        "lineHeight",
        "fontFamily",
      ],
      require: false,
    },
    mode: {
      type: String,
      default: "default",
      require: false,
    },
    height: {
      type: String,
      default: "300px",
      require: false,
    },
  },
  setup(prop, context) {
    const editorRef = shallowRef();
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: prop.placeholderTxt,
      MENU_CONF: {
        uploadImage: {
          fieldName:'file',
          server: import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload",
          maxFileSize: 1 * 1024 * 1024,
          allowedFileTypes: ["image/*"],
          headers: {
            "x-access-token": getUserInfo().token,
          },
          customInsert(res: any, insertFn: InsertFnType) {
            let url = res.message;
            let alt = '图片';
            let href = res.message;
            insertFn(url, alt, href);
          },
        },
      },
    };
    const mode = ref<string>(prop.mode);
    const height = ref<string>(prop.height);
    onMounted(() => {
      toolbarConfig.excludeKeys = prop.excludeKeys;
    });

    onBeforeUnmount(() => {
      const z = editorRef.value;
      z && z.destroy();
    });
    watch(
      () => [prop.defaultVal, prop.isClear],
      (nv, ov) => {
        editorRef.value.setHtml(nv[0]);
        if (nv[1]) {
          editorRef.value.clear();
        }
      }
    );

    return {
      height,
      mode,
      editorRef,
      toolbarConfig,
      editorConfig,

      handleCreated(editor: any) {
        editorRef.value = editor;
      },
      change(editor: IDomEditor) {
        let content = editor.getText();
        if (content) {
          context.emit("valUpdate", {
            html: editor.getHtml(),
            text: editor.getText(),
          });
        }
      },
    };
  },
});
</script>

<template>
  <div class="editor-wrap">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{ height: height, 'overflow-y': 'hidden' }"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="change"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style scoped lang="less">
.editor-wrap {
  width: 100%;
  border: 1px solid #ddd;
}
</style>
