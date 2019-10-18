<template>
    <div class="signSet">
        <!--搜索from表单-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="5">
                    <el-form-item prop="phoneNum" class="signSetStyle">
                        <el-input v-model="ruleForm.phoneNum" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="stuName" class="signSetStyle">
                        <el-input v-model="ruleForm.stuName" placeholder="请输入孩子姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">至</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 20px;">搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="signSetMain">
            <!--新增-->
            <div class="signAddBox">
                <el-button type="primary" @click="">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="signSetData" height="500" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="studentName" label="孩子姓名" width="120" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="120" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="60" align="center"></el-table-column>
                <el-table-column prop="phoneNum" label="联系电话" width="" align="center"></el-table-column>
                <el-table-column prop="address" label="家庭地址" width="" align="center"></el-table-column>
                <el-table-column prop="signDate" label="报名时间" width="" align="center"></el-table-column>
                <el-table-column label="沟通记录" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit">记录</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-document-checked">签约</el-button>
                        <el-button type="text" icon="el-icon-document-delete">未签约</el-button>
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
                    phoneNum: '',
                    stuName: '',
                    date1: '',
                    date2: '',
                },
                rules: {
                    phoneNum: [
                        { required: true, message: '请输入用户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    stuName: [
                        { required: true, message: '请输入孩子姓名', trigger: 'blur' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                },
                signSetData:[
                    {
                        num:1,
                        studentName:'哇啦啦',
                        birthday:'2011-12-21',
                        sex:'女',
                        phoneNum:'14311324422',
                        address:'中关村南大街',
                        signDate:'2019-02-04 22:32:02'
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
    .signSet{
        .signAddBox{
            margin: 20px 0;
        }
    }
</style>
