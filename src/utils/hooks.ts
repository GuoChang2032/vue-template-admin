// import { Message } from "@/utils/tool.js";
import { createDiscreteApi } from "naive-ui";
import router from "../router";

const logout = () => {
  router.push({ path: "/login", replace: true });
  localStorage.removeItem("user_login_info");
  // Message("warning", "登录过期,请重新登录!");
};

const Message = (type: any, msg: string) => {
  const { message } = createDiscreteApi(["message"]);
  if (type === "info") {
    message.info(msg);
  } else if (type === "warning") {
    message.warning(msg);
  } else if (type === "error") {
    message.error(msg);
  } else if (type === "success") {
    message.success(msg);
  }
};

const Notification = (type: any, title: string, content: string) => {
  const { notification } = createDiscreteApi(["notification"]);
  notification.create({ type, title, content, duration: 2500 });
};

export { logout, Notification,Message };
