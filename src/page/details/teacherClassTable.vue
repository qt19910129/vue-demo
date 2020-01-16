<template>
    <div class="teacherClassTable">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/teacherSet' }">教师管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">教师详情</a></el-breadcrumb-item>
            <el-breadcrumb-item>教师课表详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="teacherClassTableData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;margin-top: 20px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
            <el-table-column type="index" label="ID" align="center"></el-table-column>
            <el-table-column prop="arrangeBegintime" label="上课时间" width="200" align="center"></el-table-column>
            <el-table-column prop="crName" label="上课教室" width="" align="center"></el-table-column>
            <el-table-column prop="studentCount" label="学生人数" width="" align="center"></el-table-column>
            <el-table-column prop="qd" label="已签到" width="" align="center"></el-table-column>
            <el-table-column prop="wqd" label="未签到" width="" align="center"></el-table-column>
        </el-table>
        <template>
            <el-pagination
                    align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
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
</template>

<script>
    import {
        getTeacheringDetail,
    } from "../../axios/teacherSet";
    export default {
        data() {
            return {
                teacherClassTableData: [],  //数据列表
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
            }
        },
        mounted() {
            this.teacherDetail();  //获取课堂详细信息列表
        },
        methods: {
            teacherDetail() {  //教师课程列表
                let data = {
                    'classId':this.$route.params.classId,
                    'teacherId':this.$route.query.teacherId,
                    'subject':this.$route.query.subject,
                    'page':this.page,
                    'rows':this.rows
                };
                getTeacheringDetail(data).then(res => {
                    if(res.code == 0) {
                        this.teacherClassTableData = res.data.rows;
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
                this.currentPage = 1;
                this.page = 1;
                let data = {
                    'page':this.page,
                    'rows':this.rows,
                    'classId':this.$route.params.classId,
                    'teacherId':this.$route.query.teacherId,
                    'subject':this.$route.query.subject,
                };
                getTeacheringDetail(data).then(res => {
                    if(res.code == 0) {
                        this.teacherClassTableData = res.data.rows;
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
                    'page':this.page,
                    'rows':this.rows,
                    'classId':this.$route.params.classId,
                    'teacherId':this.$route.query.teacherId,
                    'subject':this.$route.query.subject,
                };
                getTeacheringDetail(data).then(res => {
                    if(res.code == 0) {
                        this.teacherClassTableData = res.data.rows;
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
    .teacherClassTable{

    }
</style>