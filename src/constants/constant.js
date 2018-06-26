import axios from "axios";
import Cookies from "js-cookie";
import iView from "iview";
import store from "../store";
import env from "../../build/env";
import qs from "qs";
export const ApiUrl =
  env === "development"
    ? // ? "http://106.14.180.49:9001"
      "http://172.16.7.122:9001"
    : env === "production"
      ? ""
      : "http://120.77.147.241:10000/mock/59db10974720a62cc0517952"; // "http://172.16.7.119:8080/zjhb"

const uploadMaxSize = 1024;
export const uploadConfig = {
  accept: "",
  headers: { "X-USERTOKEN": Cookies.get("token") },
  name: "file",
  maxSize: uploadMaxSize,
  serviceUrl: `${ApiUrl}/upload`
};
axios.defaults.baseURL = ApiUrl;
// axios.defaults.withCredentials = true;
axios.defaults.transformRequest = [
  function(data) {
    data = qs.stringify(data);
    return data;
  }
];
axios.interceptors.request.use(config => {
  if (Cookies.get("token")) {
    config.headers.common["X-USERTOKEN"] = Cookies.get("token");
  }
  if (config.method === "post" || config.method === "put") {
    if (config.data) {
      if (
        !(config.data instanceof Array) &&
        config.data.toString() === "[object Object]"
      ) {
        let fd = {};
        for (var item in config.data) {
          if (item.substring(0, 1) !== "_") {
            fd[item] =
              config.data[item] === "true" || config.data[item] === "false"
                ? Boolean(config.data[item])
                : config.data[item];
          }
        }
        config.data = fd;
      }
    }
  }
  config.validateStatus = status => {
    return status >= 200 && status <= 502;
  };
  return config;
});

axios.interceptors.response.use(
  response => {
    if (response.status < 200 || response.status >= 400) {
      if (response.config.method === "get" && response.status === 404) {
        window.location.href = "/whoops";
      } else if (response.status === 401) {
        iView.Modal.error({
          title: "警告",
          content: "登录超时",
          onOk() {
            store.commit("logout", this);
            store.commit("clearOpenedSubmenu");
            location.href = "#/login";
          }
        });
        return;
      } else {
        // console.log(response);
        // iView.Message.error(response.data.message);
        iView.Message.error("网络异常");
      }
      return Promise.reject(response);
    }
    if (response.data.code == "1000") {
      return response.data;
    } else if (response.data.code == "1001") {
      iView.Modal.error({
        title: "警告",
        content: "登录超时",
        onOk() {
          store.commit("logout", this);
          store.commit("clearOpenedSubmenu");
          location.href = "#/login";
        }
      });
      return;
    } else {
      iView.Message.error(response.data.msg);
      return Promise.reject(response);
    }
  },
  error => {
    // iView.Spin.hide();
    return Promise.reject(error);
  }
);
const $axios = axios;
/**
 * 上传图片
 * @param {*} params
 */
export function uploadImage(params) {
  return $axios.post(uploadConfig.serviceUrl, params);
}
export default $axios;

export function closeCurrentErrPage(vm, pathname) {
  vm.$store.commit("removeTag", vm.$route.name);
  vm.$router.push({
    name: pathname || "home_index"
  });
}
export function downloadByForm(apiUrl, params, method) {
  let url =
    env === "development"
      ? `${ApiUrl}/${apiUrl}`
      : `${location.origin}/${apiUrl}`;
  var form = document.createElement("form");
  form.style.display = "none";
  form.action = url;
  form.method = method || "post";
  document.body.appendChild(form);
  if (!params) {
    params = { token: "" };
  }
  params.token = Cookies.get("token");
  for (var key in params) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
    // console.log(key);
    // console.log(parms[key]);
  }
  form.submit();
}
