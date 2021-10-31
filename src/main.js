import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";
import tree from "vue-table-with-tree-grid"
Vue.use(ElementUI);
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts
import axios from "axios"
Vue.config.productionTip = false
Vue.component("tree-table", tree)
Vue.prototype.$http = axios
Vue.filter("dateformat", (datastr, pattern = "YYYY-MM-DD HH:mm:ss") => {
  return moment(datastr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
