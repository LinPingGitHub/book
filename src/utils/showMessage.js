import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from './showMessage.module.less';
/**
 * 
 * @param {String} content //消息内容
 * @param {String} type //消息类型 error(错误消息) info(普通消息) success(成功消息) warn(警告消息)
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则会显示到页面正中
 * @param {Number} duration //消息内容消失的时间,0为不消失
 */

export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;;
    //创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, {
        type
    })
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`
    //设置样式
    // console.log('styles', styles.message);
    div.className = `${styles.message} ${styles['message-' + type]}`;
    //将div加入都容器中

    //查看容器的postition是否改动过
    if(options.container){
        if (getComputedStyle(container).position === "static") {
            container.style.position = 'relative';
        }
    }
    container.appendChild(div);
    // console.log('div', div);
    //浏览器强行渲染
    div.clientHeight;//导致reflow
    //回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`

    // 等待一段时间，消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
        // {once:true}表示时间只执行一次
        div.addEventListener("transitionend", function () {
            div.remove();
            //运行回调函数
            options.callback && options.callback();
        }, { once: true })
    }, duration);
}