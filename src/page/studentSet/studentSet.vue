<template>
    <div class="studentSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入家长或孩子姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="phoneNum">
                        <el-input v-model="ruleForm.phoneNum" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--数据表格-->
        <el-table :data="studentSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 16px;margin-top: 20px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="studentName" label="学生姓名" width="160" align="center"></el-table-column>
            <el-table-column prop="birthday" label="出生日期" width="" align="center"></el-table-column>
            <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
            <el-table-column prop="phoneNum" label="联系电话" width="" align="center"></el-table-column>
            <el-table-column prop="classRoom" label="所在班级" width="" align="center"></el-table-column>
            <el-table-column prop="studentState" label="学生状态" width="" align="center">
                <template slot-scope="scope">
                    <span type="text" v-if="scope.row.studentState == 1" class="greenText">上课中</span>
                    <span type="text" v-if="scope.row.studentState == 2">停课中</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" prop="studentState" label="操作" width="" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view">查看</el-button>
                    <el-button type="text" v-if="scope.row.studentState == 1" icon="el-icon-notebook-2">停课</el-button>
                    <el-button type="text" v-if="scope.row.studentState == 2" icon="el-icon-notebook-2">开课</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    phoneNum: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入家长或孩子姓名', trigger: 'blur' },
                    ],
                    phoneNum: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                },
                studentSetData:[
                    {
                        num:1,
                        studentName:'王强强',
                        birthday:'2011-12-21',
                        parentName:'王王王',
                        phoneNum:'15811223456',
                        classRoom:'智障一班',
                        studentState:1,
                    },
                    {
                        num:2,
                        studentName:'张强强',
                        birthday:'2011-12-21',
                        parentName:'张张',
                        phoneNum:'15811223456',
                        classRoom:'智障二班',
                        studentState:2,
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

<style scoped class="less">
    .studentSet{

    }
</style>
