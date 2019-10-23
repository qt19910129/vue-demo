<template>
    <div class="seeSubject">
        <!--返回首页-->
        <el-page-header @back="goBack" content="班级科目课表详情" title="返回首页"></el-page-header>
        <div class="main">
            <!--科目列表-->
            <el-table :data="subjectData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="name" label="科目名称" width="" align="center"></el-table-column>
                <el-table-column prop="stuNum" label="学生数" width="" align="center"></el-table-column>
                <el-table-column prop="allNum" label="课时" width="" align="center"></el-table-column>
                <el-table-column prop="consume" label="课耗" width="" align="center"></el-table-column>
                <el-table-column prop="noConsume" label="未消耗课时" width="" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subjectData: [  //科目列表数据
                    {
                        name: '数学',
                        readyNum:4,
                        stuNum:20,
                        allNum:40,
                        consume:30,
                        noConsume:10
                    }
                ]
            }
        },
        methods:{
            goBack() {  //返回首页
                this.$router.push({
                    path: `/content/pageIndex`,
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .seeSubject{
        .main{
            background: #fff;
            padding: 20px;
            margin-top: 20px;
        }
    }
</style>