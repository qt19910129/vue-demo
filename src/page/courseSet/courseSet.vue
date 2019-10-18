<template>
    <div class="courseSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="5">
                    <el-form-item prop="courseName">
                        <el-input v-model="ruleForm.courseName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="subject">
                        <el-select v-model="ruleForm.subject" placeholder="请选择科目">
                            <el-option label="语文" value="inClass"></el-option>
                            <el-option label="数学" value="offClass"></el-option>
                            <el-option label="英语" value="offClass"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="level">
                        <el-select v-model="ruleForm.level" placeholder="请选择级别">
                            <el-option label="初级" value="inClass"></el-option>
                            <el-option label="高级" value="offClass"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="courseSetMain">
            <!--新增-->
            <div class="courseAddBox">
                <el-button type="primary" @click="">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="courseSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="subject" label="科目" align="center"></el-table-column>
                <el-table-column prop="level" label="课程级别" align="center"></el-table-column>
                <el-table-column prop="subjectName" label="课程名称" width="" align="center"></el-table-column>
                <el-table-column prop="subjectExplain" label="课程说明" width="" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.subjectExplain == ''" class="color999">暂无课程说明</span>
                        <span v-else>{{scope.row.subjectExplain}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
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
                    courseName: '',
                    subject: '',
                    level:'',
                },
                rules: {
                    courseName: [
                        { required: true, message: '请输入课程名称', trigger: 'blur' },
                    ],
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                    level: [
                        { required: true, message: '请选择级别', trigger: 'change' }
                    ],
                },
                courseSetData:[
                    {
                        num:1,
                        subject:'语文',
                        level:'高级',
                        subjectName:'智障培训',
                        subjectExplain:'快速成为智障',
                    }
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
    .courseSet{
        .courseAddBox{
            margin: 20px 0;
        }
    }
</style>
