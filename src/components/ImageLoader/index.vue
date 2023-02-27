<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" />
    <img
      :src="src"
      @load="handleLoad"
      :style="{ opacity: originOpacity,transition:`${duration}ms` }"
    />
  </div>
</template>

<script>
/**
 * src原始图片的路径
 * placeholder 原始图片加载完成前的占位图片
 * duration 原始图片加载完成后，切换到原始图片经过的毫秒数
 */
export default {
  props: {
    src: {
      type: String,
      required: true, //属性必填
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everythingDone:false,//是否一切都完成了
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      // console.log("原图加载完成");
      setTimeout(() => {
          this.everythingDone = true;
          this.$emit('load');
      }, this.duration)
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw); //模糊
  }
}
</style>