// import Home from "../views/Home"
// import About from "@/views/About"
// import Blog from "../views/Blog"
// import Message from "@/views/Message"
// import Project from "../views/Project"
// import BlogDetail from "@/views/Blog/Detail";
// 改成动态导入
// 配置路由规则

import "nprogress/nprogress.css";
import {start, done, configure} from "nprogress";
import NotFound from "@/views/NotFound.vue";
configure({
    trickleSpeed:20,//速度
    showSpinner:false,//不显示小圈圈

})
// window.start = start;
function delay(duration) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}
function getPageComponent(pageComResolve){
    return async () => {
        // console.log("组件开始加载")
        start();
        if (process.env.NODE_ENV === "development") {
            await delay(2000);
        }
        const comp = await pageComResolve();
        // console.log("组件加载完成");
        done();
        return comp;
    }
}
export default [
    {
        name: "Home",
        path: '/',
        component: getPageComponent(()=> import(/* webpackChunkName:"home" */"@/views/Home")),
        meta: { title: "首页" }
    },
    {
        name: "About",
        path: '/about',
        component: getPageComponent(() => import(/* webpackChunkName:"about" */"@/views/About")),
        meta: { title: "关于我" }
    },
    {
        name: "Blog",
        path: '/article',
        component: getPageComponent(() => import(/* webpackChunkName:"blog" */"@/views/Blog")),
        meta: { title: "文章" }
    },
    {
        name: "CategoryBlog",
        path: '/article/cate/:categoryId',
        component: getPageComponent(() => import(/* webpackChunkName:"blog" */"@/views/Blog")),
        meta: { title: "文章" }
    },//动态路由 :xxx 形式说明路由是动态的。
    {
        name: "BlogDetail",
        path: '/article/:id',
        component: getPageComponent(() => import(/* webpackChunkName:"blogdetail" */"@/views/Blog/Detail")),
        meta: { title: "文章详情" }
    },//动态路由 :xxx 形式说明路由是动态的。
    {
        name: "Message",
        path: '/message',
        component: getPageComponent(() => import(/* webpackChunkName:"message" */"@/views/Message")),
        meta: { title: "留言板" }
    },
    {
        name: "Project",
        path: '/project',
        component: getPageComponent(() => import(/* webpackChunkName:"project" */"@/views/Project")),
        meta: { title: "项目&效果" }
    },
    {
        name:"NotFound",
        path:"*",
        component:NotFound,
    }
]