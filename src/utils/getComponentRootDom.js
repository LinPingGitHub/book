import Vue from 'vue'

export default function getComponentRootDom(comp, props) {
    const vm = new Vue({
        render: h => h(comp, { props })
    })//生成一个vue实例
    vm.$mount();//挂载，不挂载的话生成不了真实的dom元素
    return vm.$el;//$el属性，渲染dom元素
}