<template>
    <div class="classFeedback">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="请选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="teacher">
                        <el-select v-model="ruleForm.teacher" placeholder="请选择主讲老师">
                            <el-option label="王老师" value="inClass"></el-option>
                            <el-option label="李老师" value="offClass"></el-option>
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
        <!--数据表格-->
        <el-table :data="feedBackData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="text" label="评论内容" align="center"></el-table-column>
            <el-table-column prop="stuName" label="学员姓名" align="center"></el-table-column>
            <el-table-column prop="teacher" label="主讲老师" align="center"></el-table-column>
            <el-table-column prop="dateTime" label="评论时间" align="center"></el-table-column>
            <el-table-column label="操作" width="" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" @click.native.prevent="deleteRowStu(scope.$index,feedBackData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--全选删除-->
        <div class="editBox">
            <el-button type="primary" @click="removeAll()">删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    date: '',
                    teacher: '',
                },
                rules: {
                    date: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    teacher: [
                        { required: true, message: '请选择主讲老师', trigger: 'change' }
                    ],
                },
                feedBackData: [
                    {
                        text:'哈哈哈',
                        stuName:'李狗蛋',
                        teacher:'张老师',
                        dateTime:'2012-03-02 15:33:50',
                        id:1
                    },
                    {
                        text:'嘿嘿嘿',
                        stuName:'李狗蛋',
                        teacher:'张老师',
                        dateTime:'2012-03-02 15:33:50',
                        id:2
                    }
                ],
                multipleSelection:[]
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
            deleteRowStu(index, rows) {  //删除table一行
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            },
            removeAll() {
                console.log(this.multipleSelection);
                if(this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请选择要删除的内容',
                        type: 'warning'
                    });
                } else {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped lang="less">
    .classFeedback{
        .editBox{
            margin: 20px 0;
        }
    }
</style>