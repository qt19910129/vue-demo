<template>
    <div class="seeClass">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            <el-breadcrumb-item>班级详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main">
            <el-row>
                <el-col :span="24"><span class="classTit">班级名称 :</span> <span class="className">三年底二班</span></el-col>
            </el-row>
            <div class="tit">班级老师</div>
            <!--班级老师数据-->
            <el-table :data="classTeacherData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="name" label="老师姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phoneNum" label="老师手机号" width="" align="center"></el-table-column>
                <el-table-column prop="dep" label="所在部门" width="" align="center"></el-table-column>
            </el-table>
            <div class="tit">班级学生</div>
            <!--班级学生数据-->
            <el-table :data="classStuData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="name" label="学生姓名" width="" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生年月" width="" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="" align="center"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                <el-table-column prop="parentPhone" label="家长电话" width="" align="center"></el-table-column>
                <el-table-column prop="all" label="总课时" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.all}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ready" label="课耗" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.ready}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tit">班级科目<el-button type="text" icon="el-icon-download" class="fr">导出</el-button></div>
            <!--班级科目数据-->
            <el-table :data="classSubjectData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="name" label="科目名称" width="" align="center"></el-table-column>
                <el-table-column prop="classNum" label="课次" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.classNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="studentNum" label="学生数" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.studentNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="all" label="总课时" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.all}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ready" label="课耗" width="" align="center">
                    <template slot-scope="scope">
                        <span class="blueText">{{scope.row.ready}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="edit" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goSeeSubject()">查看</el-button>
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
                classTeacherData:[  //班级老师数据
                    {
                        num:1,
                        name:'王老师',
                        phoneNum:'18566554455',
                        dep:'垃圾部'
                    }
                ],
                classStuData:[  //班级学生数据
                    {
                        num:1,
                        name:'社会王',
                        birthday:'1336-02-06',
                        sex:'男',
                        dep:'数学组',
                        parentName:'阿王',
                        parentPhone:'15633554455',
                        all:'100',
                        ready:'20'
                    }
                ],
                classSubjectData:[
                    {
                        num:1,
                        name:'智障',
                        classNum:'20',
                        studentNum:'50',
                        all:'100',
                        ready:'10',
                    }
                ]
            }
        },
        methods:{
            goSeeSubject() {   //跳转查看科目
                this.$router.push({
                    path: `/content/details/seeSubject`,
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .seeClass{
        .main{
            margin: 20px 0;
            padding: 20px;
            background: #fff;
            .classTit{
                font-size: 18px;
            }
            .className{
                font-size: 14px;
            }
            .tit{
                font-size: 18px;
                margin: 20px 0;
            }
        }

    }
</style>