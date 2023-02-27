<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" href="#" :class="{disabled:current === 1}">|&lt;&lt;</a>
    <a @click="handleClick(current-1)" href="#" :class="{disabled:current === 1}">&lt;&lt;</a>
    <!-- <a href="" class="active">1</a>
    <a href="">2</a>
    <a href="">3</a>
    <a href="">4</a>
    <a href="">5</a>
    <a href="">6</a>
    <a href="">7</a>
    <a href="">8</a>
    <a href="">9</a>
    <a href="">10</a> -->
    <a @click="handleClick(n)" href="#" v-for="(n, i) in numbers" :key="i" :class="{active: n == current}">{{n}}</a>
    <a @click="handleClick(current+1)" href="#" :class="{disabled:current === pageNumber}">&gt;&gt;</a>
    <a @click="handleClick(pageNumber)" href="#" :class="{disabled:current === pageNumber}">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
    // props是父组件传过来的数据
    props:{
        current:{
            type:Number,
            default:1
        },
        total:{
            type:Number,
            default:0
        },
        limit:{
            type:Number,
            default:10
        },
        visibleNumber:{
            type:Number,
            default:10
        }
    },
    computed:{
        //总页数
        pageNumber(){
            return Math.ceil(this.total / this.limit)
        },
        visibleMin(){
            //得到显示的最小数字
            let min = this.current - Math.floor(this.visibleNumber / 2)
            if(min < 1){
                min = 1
            }
            return min
        },
        visibleMax(){
            let max = this.visibleMin + this.visibleNumber -1;
            if(max > this.pageNumber){
                max = this.pageNumber;
            }
            return max
        },
        numbers(){
           let num = [];
           for(let i = this.visibleMin; i <= this.visibleMax; i++){
               num.push(i);
           }
           return num
        }
    },
    methods:{
        handleClick(newPage){
            // console.log(newPage)
            if(newPage < 1){
                newPage = 1;
            }
            if(newPage > this.pageNumber){
                newPage = this.pageNumber;
            }
            if(newPage === this.current){
                return
            }
            //抛出一个事件，通知父组件处理 
            this.$emit("pageChange",newPage);
        }
    }

};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";//~@代表src目录，在样式中的写法，在脚本中使用@
.pager-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a{
        color: @primary;
        margin: 0 8px;
        cursor: pointer;
        &.disabled{
            color: @lightWords;
            cursor: not-allowed;
        }
        &.active{
            color: @words;
            font-weight: bold;
            cursor: text;
        }
    }
}
</style>