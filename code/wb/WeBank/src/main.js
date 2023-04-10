import Vue from 'vue';
import router from '../common/router';
import http from '../common/http';
import common from '../common/common';
import config from '../common/config';
import util from '../common/util';
import App from './App.vue';
import RouterTab from 'vue-router-tab';
import ViewUI from 'view-design';
import message from '../common/message.js';
import store from '../common/store.js';
import 'vue-router-tab/dist/lib/vue-router-tab.css';
import 'view-design/dist/styles/iview.css';
import './assets/bootstrap.min.css';
import './assets/main.css';
import './assets/style/wbank.css'
import dataV from '@jiaminghi/data-view';

import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import axios from 'axios';
Vue.use(VueQuillEditor);

Vue.use(dataV)
Vue.use(RouterTab);
Vue.use(ViewUI);
Vue.prototype.http = http;
Vue.prototype.store = store;
Vue.prototype.common = common;
Vue.prototype.message = message;
Vue.prototype.util = util;
Vue.prototype.config = config;
Vue.prototype.$axios = axios;


if (process.env.NODE_ENV === "local") {
	require('../common/mock.js');
}
new Vue({
  render: h => h(App),
  router
}).$mount('#app');