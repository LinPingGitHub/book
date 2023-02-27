<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="this.showWords"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外出容器的尺寸
      innerSize: null, //里层图片的尺寸
      mouseX: 0, //鼠标的横坐标
      mouseY: 0, //鼠标的纵坐标
    };
  },
  computed: {
    imagePosition() {
      // 得到图片坐标
      // console.log("a");
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; //多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      // console.log("多出宽度和高度", extraWidth, extraHeight);
      // console.log("鼠标位置", this.mouseX, this.mouseY);
      // console.log(
      //   "外部容器",
      //   this.containerSize.width,
      //   this.containerSize.height
      // );
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      // 外边容器中间位置坐标
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    // console.log(this.titleWidth, this.descWidth);
    this.setSize();
    //初始化鼠标位置
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    //移除resize事件
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    //调用该方法，显示文字
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //强制让浏览器渲染一次
      this.$refs.title.clientWidth; //reflow
      // console.log(this.titleWidth);
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      //描述

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      //强制让浏览器渲染一次
      this.$refs.desc.clientWidth; //reflow
      // console.log(this.descWidth);
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize() {
      //设置各种尺寸
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
      // console.log("aaa", this.containerSize, this.innerSize);
    },
    handleMouseMove(e) {
      // console.log('move',e);
      const rect = this.$refs.container.getBoundingClientRect(); //返回元素的大小及其相对于视口的位置。
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      //console.log('rect',rect);
      // console.log('move',e.clientX,e.clientY);//相对于视口的横纵坐标
      //  console.log('bb',this.mouseX,this.mouseY);
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  // background: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  // z-index: -1;
  left: 0;
  top: 0;
  transition: 0.3s;
}
.title,
.desc {
  position: absolute;
  // top: 50%;
  left: 30px;
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>