<template>
    <div class="bg">
        <!--头部 START-->
        <Header></Header>
        <!--头部 END-->

        <div class="clearfix">
            <!--左侧导航 START-->
            <LeftBar class="fl"></LeftBar>
            <!--左侧导航 END-->

            <!--中间内容 START-->
            <div class="main clearfix">
                <router-view/>
            </div>
            <!--中间内容 END-->
        </div>

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
            padding: 20px 20px 20px 239px;
            width: 100%;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
        }
    }
</style>
