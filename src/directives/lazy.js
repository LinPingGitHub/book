
// 自定义指令

import eventBus from "@/eventBus";
import {debounce} from "@/utils";
import defaultGif from "@/assets/default.gif";

let imgs = [];
function setImage(img){
    //处理图片
    //该图片是否在视口范围内
    img.dom.src = defaultGif;//先暂时使用默认图片
    const rect = img.dom.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;//视口高度
    const height = rect.height || 150;
    if(rect.top >= -height && rect.top <= clientHeight){
        //在视口范围
        // console.log('imgs',imgs);
        const tempImg = new Image();
        tempImg.onload = function(){
            //当真实图片加载完成之后
            img.dom.src = img.src;
        };
        tempImg.src = img.src;
        // console.log(rect.top,-height,"不在视口范围");
        imgs = imgs.filter((i) => i !== img);
    }
}

//希望，调用该函数，就可以设置那些合适的图片了
function setImages(){
    for(const img of imgs){
        //处理该图片
        setImage(img);
    }
}
function handleScroll(){
    // console.log('aaa',imgs);
    setImages()
}
eventBus.$on("mainScroll",debounce(handleScroll,100));

// unbind元素消失的时候触发。
export default{
    inserted(el,bindings){
        // console.log('bind');
        const img = {
            dom:el,
            src:bindings.value,
        }
        imgs.push(img);
        // console.log('bbb',imgs);
        //立即处理一次
        setImage(img);
    },
    unbind(el){
        imgs = imgs.filter((img) => img.dom !== el);
    }
}