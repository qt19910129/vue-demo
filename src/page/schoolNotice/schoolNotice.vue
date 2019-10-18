<template>
    <div class="schoolNotice">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="noticeName">
                        <el-input v-model="ruleForm.noticeName" placeholder="请输入公告标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="schoolNoticeMain">
            <!--新增-->
            <div class="noticeAddBox">
                <el-button type="primary" @click="">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="noticeData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="noticeName" label="公告标题" width="160" align="center"></el-table-column>
                <el-table-column prop="noticeTime" label="发布时间" width="" align="center"></el-table-column>
                <el-table-column prop="noticePeople" label="指定群体" width="" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete">删除</el-button>
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
                ruleForm: {
                    noticeName: '',
                },
                rules: {
                    noticeName: [
                        { required: true, message: '请输入公告标题', trigger: 'blur' },
                    ],
                },
                noticeData:[
                    {
                        num:1,
                        noticeName:'一直变智障吧',
                        noticeTime:'2019-03-06',
                        noticePeople:'小学生',
                    },
                ]
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .schoolNotice{
        .noticeAddBox{
            margin: 20px 0;
        }
    }
</style>
