<template>
    <div class="leftBar">
        <el-menu router
                 :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#202D3D"
                text-color="#ccc"
                active-text-color="#1890ff">
            <router-link to="/content/pageIndex">
                <el-menu-item index="/content/pageIndex">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/timeTableSet">
                <el-menu-item index="/content/timeTableSet">
                    <i class="el-icon-reading"></i>
                    <span slot="title">排课管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/dayFood">
                <el-menu-item index="/content/dayFood">
                    <i class="el-icon-fork-spoon"></i>
                    <span slot="title">每日食谱</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/signSet">
                <el-menu-item index="/content/signSet">
                    <i class="el-icon-set-up"></i>
                    <span slot="title">报名管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/classSet">
                <el-menu-item index="/content/classSet">
                    <i class="el-icon-bank-card"></i>
                    <span slot="title">班级管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/studentSet">
                <el-menu-item index="/content/studentSet">
                    <i class="el-icon-user"></i>
                    <span slot="title">学生管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/teacherSet">
                <el-menu-item index="/content/teacherSet">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">教师管理</span>
                </el-menu-item>
            </router-link>

            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>课程管理</span>
                </template>
                <router-link to="/content/courseSet">
                    <el-menu-item-group>
                        <el-menu-item index="/content/courseSet">课程管理</el-menu-item>
                    </el-menu-item-group>
                </router-link>

                <router-link to="/content/subjectSet">
                    <el-menu-item-group>
                        <el-menu-item index="/content/subjectSet">科目设置</el-menu-item>
                    </el-menu-item-group>
                </router-link>

                <router-link to="/content/levelSet">
                    <el-menu-item-group>
                        <el-menu-item index="/content/levelSet">级别设置</el-menu-item>
                    </el-menu-item-group>
                </router-link>
            </el-submenu>

            <router-link to="/content/classRoomSet">
                <el-menu-item index="/content/classRoomSet">
                    <i class="el-icon-discount"></i>
                    <span slot="title">教室管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/schoolIntroduce">
                <el-menu-item index="/content/schoolIntroduce">
                    <i class="el-icon-school"></i>
                    <span slot="title">学校介绍</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/schoolNotice">
                <el-menu-item index="/content/schoolNotice">
                    <i class="el-icon-chat-line-square"></i>
                    <span slot="title">校区公告</span>
                </el-menu-item>
            </router-link>

            <router-link to="/content/posterExtend">
                <el-menu-item index="/content/posterExtend">
                    <i class="el-icon-postcard"></i>
                    <span slot="title">海报推广</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return{

            }

        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .leftBar{
        width: 220px;
        position: fixed;
        height: 100%;
        overflow-y: scroll;
    }
    .el-menu-item.is-active {
        background: #1a2431 !important;
        box-sizing: border-box;
        border-left: 2px solid #1890ff;
    }
    .el-menu-item {

    }

</style>
