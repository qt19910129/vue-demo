<template>
    <div class="teachers">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">教师管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>教师详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main">
            <div class="tit"><span>老师资料</span></div>
            <div class="teacherDetail">
                <el-row>
                    <el-col :span="6" class="tableName">老师姓名</el-col>
                    <el-col :span="6">{{teacherMssage.name}}</el-col>
                    <el-col :span="6" class="tableName">英文名字</el-col>
                    <el-col :span="6">{{teacherMssage.englishName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">老师电话</el-col>
                    <el-col :span="6">{{teacherMssage.mobile}}</el-col>
                    <el-col :span="6" class="tableName">出生日期</el-col>
                    <el-col :span="6">{{teacherMssage.birthday}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">身份证号</el-col>
                    <el-col :span="6">{{teacherMssage.identityCard}}</el-col>
                    <el-col :span="6" class="tableName">入职日期</el-col>
                    <el-col :span="6">{{teacherMssage.inductionTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">所在部门</el-col>
                    <el-col :span="6">{{teacherMssage.deptName}}</el-col>
                    <el-col :span="6" class="tableName">职业头衔</el-col>
                    <el-col :span="6">{{teacherMssage.duty}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">在职类型</el-col>
                    <el-col :span="6">{{teacherMssage.teacherType}}</el-col>
                    <el-col :span="6" class="tableName">教师状态</el-col>
                    <el-col :span="6" v-if="teacherMssage.status == 1">在职</el-col>
                    <el-col :span="6" v-if="teacherMssage.status == 2">离职</el-col>
                </el-row>
            </div>
            <div class="tit"><span>授课班级</span></div>
            <el-table :data="teachersData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="序号" width="" align="center"></el-table-column>
                <el-table-column prop="className" label="班级名称" width="" align="center"></el-table-column>
                <el-table-column prop="subject" label="授课科目" width="" align="center"></el-table-column>
                <el-table-column prop="zks" label="总课时" width="" align="center"></el-table-column>
                <el-table-column prop="kh" label="课耗" width="" align="center"></el-table-column>
                <el-table-column prop="syks" label="剩余课时" width="" align="center"></el-table-column>
                <el-table-column prop="studentCount" label="学生人数" width="" align="center"></el-table-column>
                <el-table-column prop="" label="状态" width="" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">未申请</span>
                        <span v-if="scope.row.status == 1" class="greenText">进行中</span>
                        <span v-if="scope.row.status == 2">已结束</span>
                        <span v-if="scope.row.status == 3">审核中</span>
                        <span v-if="scope.row.status == 4">审核不通过</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goClassDetail(scope.row.classId,scope.row.subject)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template>
                <el-pagination
                        align="right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="records"
                        background
                        :hide-on-single-page="pageValue"
                        class="pages">
                </el-pagination>
            </template>
        </div>
    </div>
</template>

<script>
    import {
        editTeacher,
        getClassList,
    } from "../../axios/teacherSet";
    export default {
        data() {
            return {
                teachersData: [],  //教师课堂数据列表
                teacherMssage:{},  //教师信息
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
            }
        },
        mounted() {
            this.getTeacherMessage();  //获取老师信息
            this.teacheList();  //教师课堂列表
        },
        methods: {
            goClassDetail(classId,subject) {  //跳转教师课表详情
                this.$router.push({
                    path: `/content/details/teacherClassTable/${classId}`, query: { subject: subject,teacherId: this.$route.params.teacherId },
                });
            },
            getTeacherMessage() {  //获取老师信息
                let data = {
                    'id':this.$route.params.teacherId
                };
                editTeacher(data).then(res => {
                    if(res.code == 0) {
                        this.teacherMssage = res.data.teacher;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            teacheList() {  //教师课程列表
                let data = {
                    'teacherId':this.$route.params.teacherId,
                    'page':this.page,
                    'rows':this.rows
                };
                getClassList(data).then(res => {
                    if(res.code == 0) {
                        this.teachersData = res.data.rows;
                        this.records = res.data.records;
                        if(res.data.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.rows = `${val}`;
                let data = {
                    'teacherId':this.$route.params.teacherId,
                    'page':this.page,
                    'rows':this.rows
                };
                getClassList(data).then(res => {
                    if(res.code == 0) {
                        this.teachersData = res.data.rows;
                        this.records = res.data.records;
                        if(res.data.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                let data = {
                    'teacherId':this.$route.params.teacherId,
                    'page':this.page,
                    'rows':this.rows
                };
                getClassList(data).then(res => {
                    if(res.code == 0) {
                        this.teachersData = res.data.rows;
                        this.records = res.data.records;
                        if(res.data.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
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