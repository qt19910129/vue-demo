<template>
    <div class="subjectSet">
        <!--新增-->
        <div class="subjectAddBox">
            <el-button type="primary" @click="subjectVisible = true">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="subjectSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
            <el-table-column prop="subjectExplain" label="课程级别" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center" prop="isAll">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" v-if="scope.row.isAll == 1" @click="subjectVisible = true">编辑</el-button>
                    <span class="color999" type="text" icon="el-icon-edit" v-if="scope.row.isAll == 2">编辑</span>
                </template>
            </el-table-column>
        </el-table>
        <!--新增，编辑弹窗-->
        <el-dialog title="新增科目" :visible.sync="subjectVisible" class="subjectAlert">
            <el-form :model="subjectForm" :rules="subjectRules" ref="subjectForm">
                <el-form-item label="科目名称" prop="name">
                    <el-input v-model="subjectForm.name" placeholder="请输入科目名称"></el-input>
                </el-form-item>
                <el-form-item label="科目编号" prop="num">
                    <el-input v-model="subjectForm.num" placeholder="请输入科目编号"></el-input>
                </el-form-item>
                <el-form-item label="科目说明" prop="explain">
                    <el-input  v-model="subjectForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入科目说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editForm('subjectForm')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('subjectForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subjectSetData:[
                    {
                        num:1,
                        subjectName:'语文',
                        subjectExplain:'快速成为智障',
                        isAll:1
                    },
                    {
                        num:2,
                        subjectName:'语文',
                        subjectExplain:'快速成为智障',
                        isAll:2
                    }
                ],
                subjectVisible:false,   //新增编辑弹窗
                subjectForm: {
                    name:'',
                    num:'',
                    explain:''
                },
                subjectRules: {
                    name: [
                        { required: true, message: '请输入科目名称', trigger: 'blur' },
                    ],
                    num: [
                        { required: true, message: '请输入科目编号', trigger: 'blur' },
                    ],
                    explain: [
                        { required: true, message: '请输入科目说明', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            editForm(formName) {   //添加科目弹窗取消
                this.subjectVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitEditForm(formName) {   //签约保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.subjectVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.subjectVisible = true;
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .subjectSet{
        .subjectAddBox{
            margin: 20px 0;
        }
    }
</style>
