<template>
    <div class="classSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="className">
                        <el-input v-model="ruleForm.className" placeholder="请输入班级名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="classState">
                        <el-select v-model="ruleForm.classState" placeholder="请选择班级状态">
                            <el-option label="上课中" value="inClass"></el-option>
                            <el-option label="已结课" value="offClass"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="classSetMain">
            <!--新增-->
            <div class="classAddBox">
                <el-button type="primary" @click="goEditClass(1)">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="classSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="className" label="班级名称" width="160" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="班主任" width="" align="center"></el-table-column>
                <el-table-column prop="studentNum" label="学生人数" width="" align="center"></el-table-column>
                <el-table-column prop="classState" label="状态" width="" align="center">
                    <template slot-scope="scope">
                        <span type="text" v-if="scope.row.classState == 1" class="greenText">上课中</span>
                        <span type="text" v-if="scope.row.classState == 2">已结课</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goSeeClass()">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="goEditClass(2)">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="classOver(scope.row)">结课</el-button>
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
                    className: '',
                    classState: '',
                },
                rules: {
                    className: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                    ],
                    classState: [
                        { required: true, message: '请选择班级状态', trigger: 'change' }
                    ],
                },
                classSetData:[
                    {
                        num:1,
                        className:'智障培训班',
                        teacherName:'王老师',
                        studentNum:'45',
                        classState:1,
                        allkeshi:20,
                        keshi:10
                    },
                    {
                        num:2,
                        className:'智障培训班-2',
                        teacherName:'李老师',
                        studentNum:'45',
                        classState:2,
                        allkeshi:20,
                        keshi:20
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
            goSeeClass() {   //跳转查看班级
                this.$router.push({
                    path: `/content/details/seeClass`,
                })
            },
            goEditClass(edit) {  //跳转编辑班级
                this.$router.push({
                    path: `/content/details/editClass/${edit}`,
                })
            },
            classOver(data) {  //结课弹窗
                console.log(data);
                if(data.allkeshi == data.keshi) {
                    //已结课
                    this.$confirm('此操作将为该学员结课, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '结课成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消结课'
                        });
                    });
                } else {
                    //还未结课
                    this.$message({
                        message: '该学员还有未上完课时，不可以结课',
                        type: 'warning'
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .classSet{
        .classAddBox{
            margin: 20px 0;
        }
    }
</style>
