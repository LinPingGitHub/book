<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: { categoryId: item.category.id },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading"/>
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({ total:0,rows:[]}),mainScroll("container")],
  components: {
    Pager,
    Empty,
  },
  // mounted() {
  //   this.$bus.$on("setMainScroll", this.handleSetMainScroll);
  //   this.$refs.container.addEventListener("scroll", this.handleScroll);
  // },
  // beforeDestroy() {
  //   this.$bus.$emit("mainScroll");
  //   this.$bus.$off("setMainScroll", this.handleSetMainScroll);
  //   this.$refs.container.removeEventListener("scroll", this.handleScroll);
  // },
  computed: {
    //获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    formatDate,
    handlePageChange(newPage) {
      // 跳转到当前的分类Id 当前的页容量 newpage的页码
      // 两种格式
      // /article?page=${newPage}&limit=${this.routeInfo.limit}
      // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
      // console.log("newPage", newPage);
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // console.log("categoryId", this.routeInfo.categoryId);
      if (this.routeInfo.categoryId === -1) {
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
            categoryId: this.routeInfo.categoryId, //动态路由
          },
        });
      }
    },
    // handleSetMainScroll(scrollTop) {
    //   this.$refs.container.scrollTop = scrollTop;
    // },
    // handleScroll() {
    //   // console.log('滚动条变化了');
    //   this.$bus.$emit("mainScroll", this.$refs.container);
    // },
  },
  watch: {
    //利用watch配置，可以直接观察某个数据的变化，变化时可以做一下处理。
    async $route() {
      // console.log("路由变化了");
      this.isLoading = true;
      //滚动高度设置为0
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth; //平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
