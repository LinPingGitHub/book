<template>
<!-- wheel mdn  wheel是鼠标滚轮事件，可在mdn中查询 -->
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container"
    :style="{marginTop}"
     @transitionend="handleTransitionEnd"     
    >
    <!-- transitionend="handleTransitionEnd" 过渡效果结束后触发 -->
      <li v-for="item in data" :key="item.id">
        <!-- <img :src="item.midImg" alt="">
        <h2>{{item.title}}</h2>
        <h3>{{item.description}}</h3> -->
        <Carouselitem :carousel="item"/>
      </li>
    </ul>
    <div v-show="index>=1" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div v-show="index < data.length - 1" @click="switchTo(index + 1)" class="icon icon-down">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li :class="{active:i===index}" v-for="(item,i) in data" :key="item.id" @click="switchTo(i)"></li>
    </ul>
    <!-- <Loading v-if="isLoading"/> -->
  </div>
</template>

<script>
// import { getBanners } from "@/api/banner";
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
import {mapState} from "vuex"
// import fetchData from "@/mixins/fetchData.js"
// import Loading from "@/components/Loading";
export default {
  // mixins:[fetchData([])],//改成使用仓库了
  components: {
    Carouselitem,
    Icon,
    // Loading,
  },
  data() {
    return {
      // banners: [],使用混入组件代替了
      index:0,//当前显示的是第几张轮播图
      containerHeight:0,//容器的高度
      switching:false,//是否正在切换中
      // isLoading:true,
    };
  },
  created(){
    this.$store.dispatch("banner/fetchBanner");
  },
  // async created() {
  //   // this.banners = await getBanners(); 使用混入组件代替了
  //   // console.log("this", getBanners());
  //   // this.isLoading = false; 使用混入组件代替了
  // },
  mounted(){
    // console.log('11container',this.$refs.container);
   this.containerHeight =  this.$refs.container.clientHeight;
  //  resize事件是窗口大小改变时发生的事件,通过监听窗口大小的变化重新渲染页面
   window.addEventListener("resize",this.handleResize);
  },
  destroyed(){
    //移除resize事件
    window.removeEventListener("resize",this.handleResize);
  },
  computed:{
    //计算属性
    marginTop(){
      // console.log('containerHeight',this.containerHeight);
     return -this.index * this.containerHeight +'px';
    },
    ...mapState("banner",["loading","data"])
  },
  methods:{
    //切换轮播图
    switchTo(i){
      // console.log('switchto',i);
      this.index = i;
    },
    handleWheel(e){
      // console.log(e.deltaY)
            // console.log(this.switching);
      if(this.switching){
        // console.log('return');
        return
      }
      // console.log(this.switching);
      if(e.deltaY == -100 && this.index > 0){
        this.switching = true;
        this.index--;
        // console.log('上一个');
      }else if(e.deltaY == 100 && this.index < this.data.length -1){
        this.switching = true;
        this.index++;
        // console.log("下一个");
      }
    },
    handleTransitionEnd(){
      // console.log("过渡效果结束");
      this.switching = false;
    },
    handleResize(){
      // console.log('change');
      this.containerHeight = this.$refs.container.clientHeight;
    },
    // async fetchData(){
    //   return await getBanners();
    // }
    
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  // background: lightblue;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
 //测试
//  width: 60%;
//  height: 40%;
//  overflow: visible;
//  border: 2px solid red;
//  margin:100px auto;

  ul{
    margin: 0;
    list-style: none;
    padding: 0;
  }
}
.carousel-container{
  width: 100%;
  height: 100%;
  transition: 500ms;
  li{
    width: 100%;
    height: 100%;
  }
}
.icon{
  .self-center();
  font-size: 30px;
  @gap:25px;
  color:@gray;
  cursor: pointer;
  transform: translateX(-50%);
  &.icon-up{
    top:@gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down{
    top:auto;
    bottom:@gap;
        animation: jump-down 2s infinite;
  }
  @jump:5px;
  @keyframes jump-up {
    0%{
      transform:  translate(-50%, @jump);
    }
    50%{
      transform: translate(-50%, -@jump);
    }
    100%{
      transform: translate(-50%, @jump);
    }
  }
    @keyframes jump-down {
    0%{
      transform:  translate(-50%, -@jump);
    }
    50%{
      transform: translate(-50%, @jump);
    }
    100%{
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator{
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li{
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border:1px solid #fff;
    box-sizing: border-box;
    transition: 0.5s;
    &.active{
      background: #fff;
    }

  }
}
</style>