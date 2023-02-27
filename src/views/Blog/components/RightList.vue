<template>
  <ul class="right-list-container">
    <li v-for="(item,i) in list" :key="i">
        <span @click="handleClick(item)" :class="{active: item.isSelect}">{{item.name}}</span>
        <span @click="handleClick(item)" v-if="item.aside" class="aside" :class="{active: item.isSelect}">{{item.aside}}</span>
        <RightList :list="item.children" @select="handleClick"/>
        </li>
  </ul>
</template>

<script>
export default {
 name:"RightList",
 props:{
    // 格式 [{name:"xxx",isSelect:true,children:[{name:"yyy",isSelect:true,children:["name","aaa"]}]}]
    // name:选中的名字
    // isSelect:true表示是不是选中项
    // children表示子项
    list:{
        type:Array,
        default:() =>[],//像数组对象，可以写成一个函数，这个函数的默认值是个空数组或对象
    }
 },
 methods:{
    handleClick(item){
        if(!item.isSelect){
            this.$emit("select",item);
        }       
    }
 }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container{
    list-style: none;
    padding: 0;
    .right-list-container{
        margin-left: 1em;
    }
    li{
        min-height: 40px;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
        .active{
        color: @warn;
        font-weight: bold;
    }
    }
}
.aside{
    font-size: 12px;
    margin-left: 1em;
    color: @gray;
}

</style>