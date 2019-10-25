<template>
    <div class="teachers">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>教师管理</el-breadcrumb-item>
            <el-breadcrumb-item>教师详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main">
            <div class="tit"><span>老师资料</span></div>
            <div class="teacherDetail">
                <el-row>
                    <el-col :span="6" class="tableName">老师姓名</el-col>
                    <el-col :span="6">刘老师</el-col>
                    <el-col :span="6" class="tableName">英文名字</el-col>
                    <el-col :span="6">Tony</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">老师电话</el-col>
                    <el-col :span="6">138888888</el-col>
                    <el-col :span="6" class="tableName">出生日期</el-col>
                    <el-col :span="6">1998-01-08</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">身份证号</el-col>
                    <el-col :span="6">110106133236546235</el-col>
                    <el-col :span="6" class="tableName">入职日期</el-col>
                    <el-col :span="6">1998-01-08</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">所在部门</el-col>
                    <el-col :span="6">教务</el-col>
                    <el-col :span="6" class="tableName">职业头衔</el-col>
                    <el-col :span="6">教务</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">在职类型</el-col>
                    <el-col :span="6">全职</el-col>
                    <el-col :span="6" class="tableName">教师状态</el-col>
                    <el-col :span="6">在职</el-col>
                </el-row>
            </div>
            <div class="tit"><span>授课班级</span></div>
            <el-table :data="teachersData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="序号" width="" align="center"></el-table-column>
                <el-table-column prop="className" label="班级名称" width="" align="center"></el-table-column>
                <el-table-column prop="subject" label="授课科目" width="" align="center"></el-table-column>
                <el-table-column prop="allNum" label="总课时" width="" align="center"></el-table-column>
                <el-table-column prop="consume" label="课耗" width="" align="center"></el-table-column>
                <el-table-column prop="noConsume" label="剩余课时" width="" align="center"></el-table-column>
                <el-table-column prop="stuNum" label="学生人数" width="" align="center"></el-table-column>
                <el-table-column prop="" label="状态" width="" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state == 1" class="greenText">上课中</span>
                        <span v-if="scope.row.state == 2">已结课</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goClassDetail(scope.row.classId)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                teachersData: [
                    {
                        className:'英语1班',
                        subject:'数学',
                        allNum:200,
                        consume:40,
                        noConsume:160,
                        stuNum:50,
                        state:1,
                        classId:22
                    },
                    {
                        className:'英语2班',
                        subject:'语文',
                        allNum:200,
                        consume:40,
                        noConsume:160,
                        stuNum:50,
                        state:2,
                        classId:23
                    }
                ],
            }
        },
        methods: {
            goClassDetail(classId) {  //跳转教师课表详情
                this.$router.push({
                    path: `/content/details/teacherClassTable/${classId}`,
                })
            }
        }

    }
</script>

<style scoped lang="less">
    .teachers{
        .main{
            padding: 0 20px 20px 20px;
            margin-top: 20px;
            background: #fff;
            .tit{
                font-size: 18px;
                line-height: 18px;
                padding: 20px 0;
            }
            .teacherDetail{
                border-radius: 10px;
                font-size: 14px;
                .tableName{
                    background: #E8EEF3;
                }
                .el-col-6,.el-col-18{
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    border: 1px solid #ddd;
                    button{
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>