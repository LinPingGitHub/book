<template>
  <i class="iconfont icon-container" :class="fontClass"/>
</template>

<script>
const classMap = {
    home:"icon-zhuye",
    success:"icon-zhengque",
    error:"icon-cuowu",
    close:"icon-guanbi",
    warn:"icon-jinggao",
    info:"icon-xinxi",
    blog:"icon-blog",
    code:"icon-code",
    about:"icon-set_about_hov",
    weixin:"icon-weixin-copy",
    mail:"icon-email",
    github:"icon-github-fill",
    qq:"icon-QQ-circle-fill",
    arrowUp:"icon-jiantoushang",
    arrowDown:"icon-jiantouxia",
    empty:"icon-empty-fill",
    chat:"icon-liuyan"


}
export default {
props:{
    type:{
        type:String,
        required:true
    }
},
computed:{
    //计算属性
    //图标的类样式
    fontClass(){
        return classMap[this.type]
    }
}
}
</script>

<style scoped>
@import"//at.alicdn.com/t/font_3426059_7uhhomuvfyx.css";
</style>