// import Vuex from "vuex";
import {Store, install} from "vuex";//为了简化代码，只取vuex中的一部分
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";
// Vue.use(Vuex);

//判断一下全局变量中有没有Vue，如果有的话说明这是cdn中引用的。
//如果是cdn中引用的就不需要install(Vue);这句代码。
if(!window.Vuex){
    install(Vue);
  }

export default new Store({
    modules:{
        banner,
        setting,
        about,
        project,
    },
    strict:true,
})