import { nextTick, onMounted, onActivated } from "vue";
function buildShortUUID(prefix = "") {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  return prefix + "_" + random + String(time);
}
const toString = Object.prototype.toString;
function is(val: any, type: any) {
  return toString.call(val) === `[object ${type}]`;
}
function isNumber(val: any) {
  return is(val, "Number");
}

function onMountedOrActivated(hook: any) {
  let mounted: any;
  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });
  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}

export { isNumber, is, buildShortUUID, onMountedOrActivated };
