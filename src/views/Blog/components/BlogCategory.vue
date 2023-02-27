<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h1>文章分类</h1>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit(){
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      // console.log("totalArticleCount", totalArticleCount);
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      // console.log("result", result);
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside:`${it.articleCount}篇`
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategories();
    },
    handleSelect(item) {
      // console.log("item", item);
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        //当前没有分类
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        //当前有分类
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id, //动态路由
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>