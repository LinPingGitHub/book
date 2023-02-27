<template>
<div>
  <h1>App组件</h1>
  <Avatar :size="100" :url="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftx28%2F41011424129646.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655906459&t=0219c4d4cbc3c3136b543e02d382a098'"/>
  <Avatar :size="200" :url="'https://img1.baidu.com/it/u=807378470,951237135&fm=253&fmt=auto&app=138&f=JPEG?w=555&h=500'"/>
</div>
</template>

<script>
import Avatar from './'

export default {
  name:"头像",//如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Avatar
  }
}
</script>