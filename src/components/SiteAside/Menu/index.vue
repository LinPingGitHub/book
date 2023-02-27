<template>
  <nav class="menu-container">
    <router-link
      v-for="item in items"
      :key="item.name"
      :to="{name:item.name}"
      :exact="item.exact"
      active-class="selected"
      exact-active-class=""
    >
    <!-- 可以通过active-class属性更改匹配的类名 ，通过exact-active-class更改精确匹配的类名-->
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact:true,//激活状态是否要精确匹配
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          // startWith:true,//只要当前路径以link开头，当前菜单就是选中的
          exact:false,//激活状态是否要精确匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact:true,//激活状态是否要精确匹配
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
           exact:true,//激活状态是否要精确匹配
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact:true,//激活状态是否要精确匹配
        },
      ],
    };
  },
  // methods: {
  //   isSelected(item) {
  //       var link = item.link.toLowerCase();//菜单的链接地址
  //       var curPathName = location.pathname.toLowerCase();//当前浏览器访问路径
  //       if(item.startWith){
  //           console.log('aa',curPathName.startsWith(link))
  //           return curPathName.startsWith(link);
  //       }else{
  //           return curPathName === link;
  //       }
  //   },
  // },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.selected {
      background: darken(@words, 3%);
    }
  }
}
</style>