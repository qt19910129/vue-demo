<template>

</template>

<script>
    //全局参数设置
    const serverSrc='http:// 192.168.0.192:8080';
    const token='9999';
    const hasEnter=false;
    const userSite="中国钓鱼岛";
    const domainUrl = 'http://47.104.251.161:8080';
    //欣宇本地 http://192.168.0.191:8080
    //测试环境 http://47.104.251.161:8080
    export default
    {
        userSite,//用户地址
        token,//用户token身份
        serverSrc,//服务器地址
        hasEnter,//用户登录状态
        domainUrl,
    }
</script>

<style scoped>

</style>
