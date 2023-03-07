<script lang="ts" setup>
import { onMounted } from "vue";
import { Message } from "@/utils/utils";
import http from "@/service/http";

onMounted(() => {});

const api_key = "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";
const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
const loading = ref<boolean>(false);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${api_key}`,
};
const prompt = ref<string>("");

const send = () => {
  if (!prompt.value) {
    Message("info", "请输入问题");
    return;
  }
  loading.value = true;
  http
    .post("engines/davinci/completions", {
      prompt: prompt.value,
      max_tokens: 5,
    })
    .then((res) => {
      console.log("zzz", res);
    })
    .catch((err) => {
      console.error("ERR", err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div class="wrap">
    <div class="header">
      <n-alert
        title="这是ChatGPT，当前世界最先进的聊天智能AI，你可以问他任何事。"
        type="info"
        closable
      >
        问完记得说，“谢谢你，ChatGPT!”
      </n-alert>
    </div>
    <div class="main-content">
      <div class="items">
        <div class="reply-wrap">
          <div class="avatar-img">
            <img src="@/assets/openai.webp" />
          </div>
          <div class="reply-content">你好!</div>
        </div>
        <div class="ask-wrap">
          <div class="ask-content">
            你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好!
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="input-content">
    <input
      class="ic-input"
      type="text"
      v-model="prompt"
      placeholder="输入你的问题......"
      @keypress.enter="send"
    />
  </div>
</template>

<style scoped lang="less">
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  .header {
    margin: 10px 15px;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    .tip {
      font-size: 14px;
      color: #666;
    }
  }
  .main-content {
  }
}
.reply-wrap {
  display: flex;
  justify-content: flex-start;
  margin: 15px 0;
  padding: 10px 15px;
  background-color: #e7e7e7b0;
  .avatar-img {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 3px;
    padding: 5px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .reply-content {
    font-size: 16px;
    border-radius: 12px;
    background-color: #fff;
    padding: 10px;
  }
}
.ask-wrap {
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  .ask-content {
    font-size: 16px;
    border-radius: 12px;
    background-color: #ecc488;
    padding: 10px;
  }
}
.input-content {
  position: absolute;
  left: 30px;
  right: 60px;
  bottom: 30px;
  box-shadow: 0 -5px 40px 5px rgba(0, 0, 0, 0.1);
  .ic-input {
    outline-style: none;
    border: 1px solid #eee;
    padding: 0 14px;
    border-radius: 6px;
    width: 100%;
    color: #000;
    height: 50px;
    font-size: 18px;
  }
}
</style>
