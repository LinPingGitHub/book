<template>
  <div class="blog-toc-container">
    <h1>目录</h1>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import {debounce} from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    //根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    //根据toc得到他们对应的元素数组
    doms(){
      const doms = [];
      const addToDoms = (toc) =>{
        for(const t of toc){
          doms.push(document.getElementById(t.anchor));
          if(t.children && t.children.length){
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  created(){
    // window.setSelect = this.setSelect;
    // console.log('bbb',window.setSelect);
    this.setSelectDebounce = debounce(this.setSelect,50);
    this.$bus.$on("mainScroll",this.setSelectDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //设置activeAnchor为正确值
    setSelect(scrollDom){
      //传过来的dom不存在的话就不处理
      if(!scrollDom){
        return;
      }
      // console.log('a');
      this.activeAnchor = ""; //由于后续要重新设置，先清空之前的状态
      const range = 200;//设置一个元素到视口顶部的范围，设置成200
      // console.log(this.doms);
      for(const dom of this.doms){
        //看一下当前这个dom元素是不是应该被选中
        if(!dom){
          continue;
        }
        //得到元素距离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        // console.log('top',top);
        if(top >= 0 && top <= range){
          //在规定的范围内
          // console.log('aaa');
          this.activeAnchor = dom.id;
          return;
        }else if(top > range){
          //在规定的范围下方
          return;
        }else{
          //在规定的范围上方
          this.activeAnchor = dom.id;//先假设自己是激活的，然后继续看后边，如果后边是激活的那就使用后边的。
        }
      }
    }
  },
  destroyed(){
    console.log('xiaoh')
    this.$bus.$off("mainScroll",this.setSelectDebounce);
  }
};
</script>

<style scoped lang="less">
.blog-toc-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>