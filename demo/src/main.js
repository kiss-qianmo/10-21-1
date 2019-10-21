// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vuex from 'vuex'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(vuex);

// axios.interceptors.response.use(response => {
// // Do something before response is sent
// console.log("======================="+response.config.url+"=====================")
// console.log(response)
// return response;
// },error => {
// // Do something with response error
// return Promise.reject(error);
// });



Vue.prototype.$axios = axios

var state={
  isAdmin:1
}
var mutations={
  adminLogin(state,val){
      state.isAdmin=1
  }
}
var actions={
  adminLogin(context,val){
      context.commit("adminLogin",val)
  }
}


var store = new vuex.Store({
  state,
  actions,
  mutations
});


import './assets/css/base.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
