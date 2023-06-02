// import Vue from 'vue'
// import App from './App.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import router from '@/router'

// //引入axios配置
// // import axios from '@/api/index'
// import axios from "axios"
// // axios.create({
// //   baseURL: "localhost:3007",
// //   timeout: 5000
// // })

// axios.defaults.baseURL="localhost:3007"
// axios.interceptors.response.use((res)=>{
//   return res.data
// })
// console.log(axios,111);
// Vue.use(ElementUI);
// Vue.config.productionTip = false
// //修改vue的原型链
// Vue.prototype.$axios = axios

// new Vue({
//   axios,
//   router,
//   render: h => h(App),
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);
//引入vue-router
import VueRouter from 'vue-router'
//应用vue-router
Vue.use(VueRouter)
// 引入我们写的路由文件
import router from './router'
Vue.config.productionTip = false
Vue.prototype.$axios=axios

// 对接口进行简单配置
axios.defaults.baseURL = 'http://localhost:3007'
axios.interceptors.response.use((res)=>{
  return res
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
