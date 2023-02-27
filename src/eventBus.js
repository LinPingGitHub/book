// 事件总线

//第一种方式，自己编写
// const listeners = {};
// export default {
//     //监听某一个事件
//     /**
//      * 
//      * @param {*} eventName 事件名字
//      * @param {*} handler 事件处理函数
//      */
//     $on(eventName, handler){
//         if(!listeners[eventName]){
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler);
//     },//取消监听
//     $off(eventName, handler){
//         if(!listeners[eventName]){
//             return
//         }
//         listeners[eventName].delete(handler);
//     },//触发事件
//     $emit(eventName,...args){
//         if(!listeners[eventName]){
//             return
//         }
//         for(const handler of listeners[eventName]){
//             handler(...args);
//         }
//     }
// }

// 第二种，使用vue实例


import Vue from "vue";
const app = new Vue({});//生成一个vue实例
// export default new Vue({});


/**
 * 事件名称：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * 滚动条的dom元素,如果是undefined,则表示dom元素已经不存在了。
 * 
 * s事件名称：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数:
 * -滚动高度
 */
Vue.prototype.$bus = app;//将这个实例放到原型里这样就都可以使用了
export default app;