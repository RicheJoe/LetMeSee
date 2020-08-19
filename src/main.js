import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fastclick from 'fastclick'
import lazyload from 'vue-lazyload'


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue;

Vue.use(ElementUI);

//解决移动端300ms延迟
Fastclick.attach(document.body)

//懒加载  和占位的图片
Vue.use(lazyload,{
  loading:require ('./assets/imgs/common/urban.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
