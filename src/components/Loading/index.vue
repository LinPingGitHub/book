<template>
  <img class="loading-container" :src="loadingUrl">
</template>

<script>
import loadingUrl from "@/assets/loading.svg";//如果是动态的地址就采样，这种方式，
export default {
    data(){
        return{
            loadingUrl,
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
    .loading-container{
        .self-center()
    }
</style>