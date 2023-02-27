import axios from 'axios'
import showMessage from '../utils/showMessage';

const ins = axios.create();//创建一个axios的实例
// ins.interceptors.response.use创建拦截器
ins.interceptors.response.use(function(resp){
    // 使用这个实例创建一个拦截器，凡是使用这个实例得到的响应，会先运行这个函数function(resp){}
        // 例如：使用这个实例 request.get("/api/blogtype")，他得到的数据就是函数function(resp){}的返回值
    // 再把函数的运行结果返回回来
    // console.log('ins拦截器');
    // console.log('resp',resp);
    if(resp.data.code !==0){
        showMessage({
            content:resp.data.msg,
            type:'error'
        });
        return null;
    }
    return resp.data.data;
})


export default ins;