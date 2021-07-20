import Vue from 'vue';
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import App from './App';


Vue.config.productionTip = false;
Vue.use(Ant)
new Vue({
  render: h => h(App),
}).$mount('#app');

