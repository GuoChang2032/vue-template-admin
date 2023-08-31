<template>
  <div class="prefixCls" :style="{ width: containerWidth }">
    <n-spin :show="loading">
      <textarea
        :id="tinymceId"
        ref="elRef"
        :style="{ visibility: 'hidden' }"
      ></textarea>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/hr";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/print";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/importcss"; //图片工具

import {
  computed,
  nextTick,
  ref,
  unref,
  watch,
  onDeactivated,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { toolbar, plugins } from "./tinymce";
import { buildShortUUID, isNumber, onMountedOrActivated } from "./utils";
import http from "@/service/http";
import { bindHandlers } from "./helper";
import "tinymce-i18n/langs6/zh-Hans.js";

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  value: {
    type: String,
  },

  toolbar: {
    type: Array,
    default: toolbar,
  },
  plugins: {
    type: Array,
    default: plugins,
  },
  modelValue: {
    type: String,
  },
  height: {
    type: [Number, String],
    required: false,
    default: 400,
  },
  width: {
    type: [Number, String],
    required: false,
    default: "100%",
  },
  showImageUpload: {
    type: Boolean,
    default: true,
  },
  menubar: {
    type: String || Boolean,
    default: "file edit insert view format table",
  },
});
const emits = defineEmits([
  "change",
  "update:modelValue",
  "inited",
  "init-error",
]);

const loading = ref<boolean>(true);
const attrs = getCurrentInstance()?.attrs;
const tinymceId = ref(buildShortUUID("tiny-vue"));
const containerWidth = computed(() => {
  const width = props.width;
  if (isNumber(width)) {
    return `${width}px`;
  }
  return width;
});
const editorRef = ref(null);
const fullscreen = ref(false);
const elRef = ref(null);
const tinymceContent = computed(() => props.modelValue);

const initOptions: any = computed(() => {
  const { height, options, toolbar, plugins, menubar } = props;
  const publicPath = import.meta.env.VITE_APP_PUBLIC_PATH || "/";
  return {
    selector: `#${unref(tinymceId)}`,
    height,
    toolbar,
    menubar,
    plugins,
    language: "zh-Hans",
    // language_url: "/tinymce/langs/zh_CN.js",
    branding: false,
    default_link_target: "_blank",
    link_title: false,
    object_resizing: false,
    auto_focus: true,
    skin: "oxide",
    skin_url: publicPath + "tinymce/skins/ui/oxide",
    content_css: publicPath + "tinymce/skins/ui/oxide/content.min.css",
    mathjax: {
      // lib: "/mathjax/tex-mml-chtml.js",
      // configUrl: "/mathjax/config.js",

      lib: publicPath + "mathjax/tex-mml-chtml2.js", //required path to mathjax
      symbols: { start: "\\(", end: "\\)" }, //optional: mathjax symbols
      className: "math-tex", //optional: mathjax element class
      openUrl: publicPath + "mathjax/wiriseditor.html",
      configUrl: publicPath + "mathjax/config2.js", //optional: mathjax config js
      // elementId: "divider_" + this.id,
    },
    external_plugins: {
      // mathjax: "/mathjax/plugin.js",
      mathjax: publicPath + "mathjax/plugin2.js",
      "kityformula-editor":
        publicPath + "tinymce/plugins/kityformula-editor/plugin.min.js",
      // tiny_mce_wiris: `${import.meta.env.BASE_URL}/tinymce/plugins/tiny_mce_wiris/plugin.min.js`,
      tiny_mce_wiris: "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js",
    },
    ...options,
    setup: (editor: any) => {
      editorRef.value = editor;
      editor.on("init", (e: any) => initSetup(e));
    },
    images_upload_handler: function (
      blobInfo: any,
      success: any,
      failure: any
    ) {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      let imgUrl = "";
      http
        .action(
          "post",
          import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload",
          formData
        )
        .then((res: any) => {
          if (res.success) {
            imgUrl = res.message;
          }
        })
        .catch((err) => {
          console.dir(err);
        })
        .finally(() => {
          success(imgUrl);
        });
    },
  };
});

const disabled = computed(() => {
  const { options } = props;
  const getdDisabled = options && Reflect.get(options, "readonly");
  const editor: any = unref(editorRef);
  if (editor) {
    editor.setMode(getdDisabled ? "readonly" : "design");
  }
  return getdDisabled ?? false;
});

watch(
  () => attrs?.disabled,
  () => {
    const editor: any = unref(editorRef);
    if (!editor) {
      return;
    }
    editor.setMode(attrs?.disabled ? "readonly" : "design");
  }
);

onMountedOrActivated(() => {
  if (!initOptions.value.inline) {
    tinymceId.value = buildShortUUID("tiny-vue");
  }
  nextTick(() => {
    setTimeout(() => {
      initEditor();
    }, 30);
  });
});

onBeforeUnmount(() => {
  destory();
});

onDeactivated(() => {
  destory();
});

function destory() {
  if (tinymce !== null) {
    // tinymce?.remove?.(unref(initOptions).selector!);
  }
}

function initSetup(e: any) {
  const editor: any = unref(editorRef);
  if (!editor) {
    return;
  }
  const value = props.modelValue || "";

  editor.setContent(value);
  bindModelHandlers(editor);
  bindHandlers(e, attrs, unref(editorRef));
}

function initEditor() {
  const el: any = unref(elRef);
  if (el) {
    el.style.visibility = "";
  }
  tinymce
    .init(unref(initOptions))
    .then((editor: any) => {
      emits("inited", editor);
      loading.value = false;
    })
    .catch((err: any) => {
      emits("init-error", err);
    });
}

function setValue(editor: any, val: any, prevVal?: any) {
  if (
    editor &&
    typeof val === "string" &&
    val !== prevVal &&
    val !== editor.getContent({ format: attrs?.outputFormat })
  ) {
    editor.setContent(val);
  }
}

function bindModelHandlers(editor: any) {
  const modelEvents = attrs?.modelEvents ? attrs.modelEvents : null;
  const normalizedEvents = Array.isArray(modelEvents)
    ? modelEvents.join(" ")
    : modelEvents;

  watch(
    () => props.modelValue,
    (val, prevVal) => {
      setValue(editor, val, prevVal);
    }
  );

  watch(
    () => props.value,
    (val, prevVal) => {
      setValue(editor, val, prevVal);
    },
    {
      immediate: true,
    }
  );

  editor.on(normalizedEvents || "change keyup undo redo", () => {
    const content = editor.getContent({ format: attrs?.outputFormat });
    emits("update:modelValue", content);
    emits("change", content);
  });

  editor.on("FullscreenStateChanged", (e: any) => {
    fullscreen.value = e.state;
  });
}

function handleImageUploading(name: string) {
  const editor: any = unref(editorRef);
  if (!editor) {
    return;
  }
  editor.execCommand("mceInsertContent", false, getUploadingImgName(name));
  const content = editor?.getContent() ?? "";
  setValue(editor, content);
}

function handleDone(name: string, url: string) {
  const editor: any = unref(editorRef);
  if (!editor) {
    return;
  }
  const content = editor?.getContent() ?? "";
  const val =
    content?.replace(getUploadingImgName(name), `<img src="${url}"/>`) ?? "";
  setValue(editor, val);
}

function getUploadingImgName(name: string) {
  return `[uploading:${name}]`;
}

function doUpload(blobInfo: any) {
  const formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename());
  http
    .action(
      "post",
      import.meta.env.VITE_APP_API_BASE_URL + "sys/common/upload",
      formData
    )
    .then((res: any) => {
      return res.result;
    })
    .catch((err) => {
      console.dir(err);
    })
    .finally(() => {});
  return undefined;
}
</script>

<style lang="less" scoped>
.prefixCls {
  position: relative;
  line-height: normal;
}
textarea {
  z-index: -1;
  visibility: hidden;
}
</style>
