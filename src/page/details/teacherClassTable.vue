<template>
    <div class="teacherClassTable">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>教师管理</el-breadcrumb-item>
            <el-breadcrumb-item>教师详情</el-breadcrumb-item>
            <el-breadcrumb-item>教师课表详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="teacherClassTableData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;margin-top: 20px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="classTime" label="上课时间" width="200" align="center"></el-table-column>
            <el-table-column prop="classRoom" label="上课教室" width="" align="center"></el-table-column>
            <el-table-column prop="stuNum" label="学生人数" width="" align="center"></el-table-column>
            <el-table-column prop="onClass" label="已签到" width="" align="center"></el-table-column>
            <el-table-column prop="noClass" label="未签到" width="" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                teacherClassTableData: [
                    {
                        classTime:'2018-10-11   10:00--11:00',
                        classRoom:'教师003',
                        stuNum:20,
                        onClass:17,
                        noClass:3
                    }
                ],
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="less">
    .teacherClassTable{

    }
</style>