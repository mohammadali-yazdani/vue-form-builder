// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const options = {
  rtl: true,
  containerClassName: "ma-toast",
  toastClassName: "ma-toast-container",
  bodyClassName: "ma-toast-container--body",
  position: "bottom-left",
  transition: "",
  maxToasts: 1,
  closeButton: false,
  hideProgressBar: true,
  icon: false,
  timeout: 2000,
};

app.use(Toast, options);

app.mount("#app");
