<template>
  <div ref="messcontainer" class="message-container">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messcontainer")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  components: {
    MessageArea,
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroued() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      // console.log('数据',this.data.rows.length,this.data.total);
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await msgApi.getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
    },
    handleScroll(dom) {
      // console.log(dom);
      //dom不存在就不处理了
      if (this.isLoading || !dom) {
        //表示目前正在加载更多
        return;
      }
      const range = 100; //定一个可接受的范围，在这个范围内都算到达了底部。
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        // console.log('到达底部了');
        this.fetchMore();
      }
    },
    async fetchMore() {
      //加载下一页
      if (!this.hasMore) {
        //没有更多的数据了
        console.log("没有更多的数据了");
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>