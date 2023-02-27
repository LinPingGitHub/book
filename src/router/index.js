import VueRouter from "vue-router"
import Vue from 'vue'
import routes from './routes'
import {titleController} from "@/utils";

//判断一下全局变量中有没有VueRouter，如果有的话说明这是cdn中引用的。
//如果是cdn中引用的就不需要Vue.use(VueRouter);这句代码。
if(!window.VueRouter){
  Vue.use(VueRouter);//使用一个vue插件
}

const router = new VueRouter({
  //配置信息
  routes,//路由匹配规则
  mode:"history"
})

router.afterEach((to,from)=>{
  if(to.meta.title){
    titleController.setRouteTitle(to.meta.title);
  }
})
export default router;