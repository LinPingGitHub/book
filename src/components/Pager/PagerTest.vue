<template>
<div>
  <h1>App组件</h1>
  <Pager :current="current" :total="total" @pageChange="handlePageChange($event)" />
</div>
</template>

<script>
import Pager from './'

export default {
  name:"分页",//如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Pager
  },
  data(){
    return{
      current:3,
      total:302
    }
  },
  methods:{
    handlePageChange(newPage){
      this.current = newPage;
      // console.log('页码改变了',newPage)
    }
  }
}
</script>

<style scoped>
.iconfont{
  font-size: 26px;
  color: red;
}
</style>