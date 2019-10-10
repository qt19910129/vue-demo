<template>
    <div class="bg">
        <!--头部 START-->
        <Header></Header>
        <!--头部 END-->

        <!--左侧导航 START-->
        <LeftBar class="fl"></LeftBar>
        <!--左侧导航 END-->

        <!--中间内容 START-->
        <div class="main">
            我是中间的内容
        </div>
        <!--中间内容 END-->
    </div>
</template>

<script>
    import Header from './header.vue'
    import LeftBar from './leftBar.vue'
    export default {
        data() {
            return {
            }
        },
        mounted() {

        },
        components: {
            Header,
            LeftBar,
        }
    }
</script>

<style scoped lang="less">
    .bg{
        height: 100%;
        width: 100%;
        .main{
            padding-left: 219px;
            width: 100%;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
        }
    }
</style>
