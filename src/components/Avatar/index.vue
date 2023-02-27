// 头像组件

<template>
   <img class="avatar-container" :src="url" :style="{width:size+'px',height:size+'px'}">
</template>

<script>
export default {
    props:{
        url:{
            type: String,//url属性必须是一个字符串
            required: true,//属性必填
        },
        size:{
            type: Number,
            default:150,//默认值，属性没有填就使用默认值
        }
    },
}
</script>

<style scoped>
/* 加上scoped后会变成带有作用域的样式 */
    .avatar-container{
        border-radius: 50%;
        object-fit: cover;
        display: block;
        /* 反正图片挤压变形 */
    }
</style>

