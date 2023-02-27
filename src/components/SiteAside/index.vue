<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :size="150" :url="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.keaidian.com%2Fuploads%2Fallimg%2F190419%2F19234800_51.png&refer=http%3A%2F%2Fwww.keaidian.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669191128&t=41471c9895cc5ee25ec6e673eb8183bf'" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
    <p class="footer" v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  widows: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
}
.title {
  font-size: 1em;
  text-align: center;
  color: #fff;
}
</style>