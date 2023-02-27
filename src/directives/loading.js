//导出指令的配置对象
// export default {
//     bind(el,bingding){
//         console.log('bind',el,bingding);
//         // 只调用一次，指令第一次绑定到元素时调用，在这里进行一次性的初始化设置

//         // 根据bingding.value的值，决定创建或删除img元素
//     },
//     inserted(){
//         console.log('inserted');
//         // 被绑定元素插入到父节点时调用
//     },
//     update(el,bingding){
//         console.log('updated');
//         // 所在组件的VNode更新时调用

//         // 根据bingding.value的值，决定创建或删除img元素
//     }
// }
import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
//得到el中loading效果的img元素
function getLoadingImage(el){
 return el.querySelector('img[data-role=loading]')
}
function createLoadingImg(){
    const img = document.createElement("img");
    img.dataset.role = "loading";//增加自定义属性
    img.src = loadingUrl;
    img.className = styles.loading;
    return img
}
// 在元素绑定（bind）和更新（update）时，都能运行到钩子函数，
// 如果这两个函数实现的功能相同，可以直接把指令配置简化成一个单独的函数
export default function(el,bingding){
    // 根据bingding.value的值，决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if(bingding.value){
        //如果没有img元素，就创建img元素
        if(!curImg){
            const img = createLoadingImg();
            el.appendChild(img);
        }
        // console.log('创建img元素')
    }else{
        //如果有img元素，就删除img元素
        if(curImg){
            curImg.remove();
        }
        // console.log('删除img元素')
    }
}