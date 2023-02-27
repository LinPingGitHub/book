<template>
  <div class="blog-comment-container">
     <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading"
     @submit="handleSubmit"
     />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import {getComments, postComment} from "@/api/blog.js";
export default {
    mixins:[fetchData({total:0,rows:[]})],
    components:{
        MessageArea,
    },
    data(){
        return{
            page:1,
            limit:10,
        }
    },
    created(){
        this.$bus.$on("mainScroll",this.handleScroll);
    },
    destroued(){
        this.$bus.$off("mainScroll",this.handleScroll);
    },
    computed:{
        hasMore(){
            // console.log('数据',this.data.rows.length,this.data.total);
            return this.data.rows.length < this.data.total;
        }
    },
    methods:{
        handleScroll(dom){
            // console.log(dom);
            //dom不存在就不处理了
            if(this.isLoading || !dom){
                //表示目前正在加载更多
                return;
            }
            const range = 100;//定一个可接受的范围，在这个范围内都算到达了底部。
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            if(dec <= range){
                // console.log('到达底部了');
                this.fetchMore();
            }
        },
       async fetchData(){
        // console.log('getComments',await  getComments(this.$route.params.id,this.page,this.limit))
        // console.log('bbbccc',this.$route.params);
        return await  getComments(this.$route.params.id,this.page,this.limit)
       },
       async fetchMore(){//加载下一页
       if(!this.hasMore){
        //没有更多的数据了
        console.log('没有更多的数据了');
        return;
       }
        this.isLoading = true;
        this.page++;
        const resp = await this.fetchData();
        this.data.total = resp.total;
        this.data.rows = this.data.rows.concat(resp.rows);
        this.isLoading = false;
       },
       async handleSubmit(formData, callback){
        // console.log('formData',formData);
        const resp = await postComment({
            blogId:this.$route.params.id,
            ...formData,
        })
        this.data.rows.unshift(resp);
        this.data.total++;
        callback("评论成功！");//告诉子组件我这边处理完了，你继续。
       }
    }
}
</script>

<style scoped lang="less">
    .blog-comment-container{
        margin: 30px 0;
    }
</style>