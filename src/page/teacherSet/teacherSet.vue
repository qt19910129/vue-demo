<template>
    <div class="teacherSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="5">
                    <el-form-item prop="teacherName">
                        <el-input v-model="ruleForm.teacherName" placeholder="请输入老师名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="teacherJob">
                        <el-select v-model="ruleForm.teacherJob" placeholder="请选择教师在职类型">
                            <el-option label="全职" value="inClass"></el-option>
                            <el-option label="兼职" value="offClass"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="teacherState">
                        <el-select v-model="ruleForm.teacherState" placeholder="请选择教师状态">
                            <el-option label="在职" value="inClass"></el-option>
                            <el-option label="离职" value="offClass"></el-option>
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
        <div class="teacherSetMain">
            <!--新增-->
            <div class="teacherAddBox">
                <el-button type="primary" @click="">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="teacherSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 16px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="教师名称" width="120" align="center"></el-table-column>
                <el-table-column prop="phoneNum" label="联系电话" width="" align="center" width="200"></el-table-column>
                <el-table-column prop="dep" label="所在部门" width="" align="center" width="230"></el-table-column>
                <el-table-column prop="jobTitle" label="职业头衔" width="" align="center" width="230"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="" align="center" width="180"></el-table-column>
                <el-table-column prop="teacherType" label="教师类型" width="" align="center" width="100">
                    <template slot-scope="scope">
                        <span type="text" v-if="scope.row.teacherType == 1">全职</span>
                        <span type="text" v-if="scope.row.teacherType == 2">兼职</span>
                    </template>
                </el-table-column>
                <el-table-column prop="teacherState" label="教师状态" width="" align="center" width="100">
                    <template slot-scope="scope">
                        <span type="text" v-if="scope.row.teacherState == 1" class="greenText">在职</span>
                        <span type="text" v-if="scope.row.teacherState == 2">离职</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view">查看</el-button>
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="changePassWord">重置密码</el-button>
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
                    teacherName: '',
                    teacherState: '',
                    teacherJob:'',
                },
                rules: {
                    teacherName: [
                        { required: true, message: '请输入老师名称', trigger: 'blur' },
                    ],
                    teacherState: [
                        { required: true, message: '请选择教师状态', trigger: 'change' }
                    ],
                    teacherJob: [
                        { required: true, message: '请选择教师在职类型', trigger: 'change' }
                    ],
                },
                teacherSetData:[
                    {
                        num:1,
                        teacherName:'张哈哈',
                        phoneNum:'15633225456',
                        dep:'财务部',
                        jobTitle:'部长',
                        birthday:'1655-03-05',
                        teacherType:1,
                        teacherState:1,
                    },
                    {
                        num:2,
                        teacherName:'张哈哈',
                        phoneNum:'15633225456',
                        dep:'财务部',
                        jobTitle:'部长',
                        birthday:'1655-03-05',
                        teacherType:2,
                        teacherState:2,
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
            changePassWord() {
                this.$confirm('此操作将重置密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '重置密码成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置密码'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .teacherSet{
        .teacherAddBox{
            margin: 20px 0;
        }
    }
</style>
