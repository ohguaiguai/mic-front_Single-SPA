import Vue from 'vue';
import App from './App.vue';
import router from './router';

import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

const appOptions = {
  el: '#vue', // 挂载到父应用中的id为vue的标签中
  router,
  render: (h) => h(App),
};

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});

// 如果是父应用引用我
if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:10000/'; // 指定加载路径为绝对路径，而且是自己的
}

if (!window.singleSpaNavigate) {
  alert(1);
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}

// 协议接入
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;
