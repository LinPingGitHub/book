<template>
  <div class="test-container">
      Empty
    <Empty />
  </div>
</template>

<script>
import Empty from "./";
export default {
  name: "无数据", //如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Empty,
  },
};
</script>

<style lang="less">
.test-container{
  position: relative;
  width: 500px;
  height: 400px;
  border:2px solid;
  margin: 0 auto;
  
}
</style>