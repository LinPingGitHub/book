//组件混入


// 公共的远程获取数据
// 具体的组件中，需要提供一个远程获取数据的方法 festchData
export default function(defaultDataValue = null){
    return {
        data(){
            return {
                isLoading:true,
                data:defaultDataValue
            }
        },
        async created(){
            // console.log('ddd',this);
           this.data = await this.fetchData();
           this.isLoading = false;
        }
    }
}