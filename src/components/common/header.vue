<template>
    <div class="header">
        <div class="logo">
            <div class="left"></div>
            <div class="right">托马斯教育管理平台</div>
        </div>
        <div class="user">
            <span>用户名</span>
            <img src="../../static/img/common/triangle-icon.png" class="triangle-icon">
            <img src="../../static/img/common/user-icon.png">
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less">
    .header{
        height: 50px;
        background: #fff;
        padding: 10px 40px;
        line-height: 50px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        .logo{
            width: 450px;
            height: 100%;
            background: linear-gradient(94deg, #1C89E8, #55A2E8);
            border-radius: 35px;
            .left{
                width: 160px;
                height: 100%;
                float: left;
                background: #fbfaff;
                border: 1px solid #1C89E8;
                border-radius: 35px;
            }
            .right{
                color: #fff;
                font-size: 24px;
                text-align: center;
            }
        }
        .user{
            width: 160px;
            height: 100%;
            line-height: 100%;
            background: #edf4fa;
            border-radius: 35px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            .triangle-icon{
                margin: 0 10px;
            }
        }
    }
</style>
