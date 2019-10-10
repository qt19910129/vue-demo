<template>
    <div class="leftBar">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#202D3D"
                text-color="#ccc"
                active-text-color="#1890ff">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-reading"></i>
                <span slot="title">排课管理</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-fork-spoon"></i>
                <span slot="title">每日食谱</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-set-up"></i>
                <span slot="title">报名管理</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i class="el-icon-bank-card"></i>
                <span slot="title">班级管理</span>
            </el-menu-item>
            <el-menu-item index="6">
                <i class="el-icon-user"></i>
                <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="7">
                <i class="el-icon-s-custom"></i>
                <span slot="title">教师管理</span>
            </el-menu-item>
            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>课程管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="8-1">课程管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="8-2">科目设置</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="8-3">级别设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="9">
                <i class="el-icon-discount"></i>
                <span slot="title">教室管理</span>
            </el-menu-item>
            <el-menu-item index="10">
                <i class="el-icon-school"></i>
                <span slot="title">学校介绍</span>
            </el-menu-item>
            <el-menu-item index="11">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">校区公告</span>
            </el-menu-item>
            <el-menu-item index="12">
                <i class="el-icon-postcard"></i>
                <span slot="title">海报推广</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="less">
    .leftBar{
        width: 220px;
        overflow: hidden;
    }
    .el-menu-item.is-active {
        background: #1a2431 !important;
        box-sizing: border-box;
        border-left: 2px solid #1890ff;
    }
    .el-menu-item {

    }

</style>
