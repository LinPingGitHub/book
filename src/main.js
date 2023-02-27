
//入口文件

import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"
import router from './router'
import store from "./store";
import './mock'
import "./eventBus"
store.dispatch("setting/fetchSetting");



Vue.config.productionTip = false


// 获取某个组件渲染的dom根元素
/**
 * 
 * @param {*} comp //组件
 * @param {*} props 组件中的属性
 * @returns 
 */
// function getComponentRootDom(comp,props){
//   const vm = new Vue({
//     render:h => h(comp,{props})
//   })//生成一个vue实例
//   vm.$mount();//挂载，不挂载的话生成不了真实的dom元素
//   return vm.$el;//$el属性，渲染dom元素
// }
// import Icon from './components/Icon';
// console.log('Icon',Icon);
// var dom = getComponentRootDom(Icon,{type:'home'})
// console.log('dom',dom);

// 向实例注入成员

import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage;



import './api/banner'
import vLoading from "./directives/loading"
import vLazy from "./directives/lazy"
Vue.directive("loading",vLoading);
Vue.directive("lazy",vLazy);



new Vue({
  router,//配置插件
  store,//配置仓库
  render: h => h(App),
}).$mount('#app')




// 测试blog
// import * as blogApi from "./api/blog";
// blogApi.getBlogTypes().then(r=>{
//   console.log('博客分类',r)
// })


// blogApi.getBlogs(2, 10 ,3).then(r=>{
//   console.log('博客',r)
// })



// 测试
// import * as blogApi from "./api/blog";
// blogApi.getBlog("aaa").then((r) => {
//   console.log('getBlog',r);
// })

// blogApi.postComment({
//   nickname:"昵称",
//   content:"评论内容，纯文本",
//   blogId:"123",
// }).then((r) => {
//   console.log('postComment',r);
// })

// 测试
// import {getSetting} from "./api/setting";
// getSetting().then((r) => {
//   console.log('getSetting',r);
// })



// 测试
// import {getProject} from "./api/project";
// getProject().then((r) => {
//   console.log('getProject',r);
// })
