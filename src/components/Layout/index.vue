<template>
  <div class="layout-container">
      <div class="left">
          <slot name="left"/>
      </div>
      <div class="main">
          <slot></slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .layout-container{
        width: 100%;
        height: 100%;
        display: flex;
        .left .right{
            flex:0 0 auto;//表示不能压缩，也不能增长。需要保存宽度
            overflow: hidden;
        }
        .main{
            flex: 1 1 auto;//表示可以增长可以压缩
            overflow: hidden;
        }
    }
</style>