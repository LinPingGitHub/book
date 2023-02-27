<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment.vue";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData(null),mainScroll("mainContainer")],
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      //如果文字不存在，就跳转到404
      if(!resp){
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
    // handleScroll() {
    //   // console.log('滚动条变化了');
    //   this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    // },
    // handleSetMainScroll(scrollTop){
    //   this.$refs.mainContainer.scrollTop = scrollTop;
    // }
  },
  // mounted() {
  //   this.$bus.$on("setMainScroll",this.handleSetMainScroll);
  //   this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
  // },
  // beforeDestroy() {
  //   this.$bus.$emit("mainScroll");
  //   this.$bus.$off("setMainScroll",this.handleSetMainScroll);
  //   // console.log('销毁')
  //   // console.log(this.$refs.mainContainer)
  //   this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
  // },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
}
</style>