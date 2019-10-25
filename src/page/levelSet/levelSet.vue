<template>
    <div class="levelSet">
        <!--新增-->
        <div class="levelAddBox">
            <el-button type="primary" @click="levelVisible = true">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="levelSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="subjectLevel" label="课程级别" align="center"></el-table-column>
            <el-table-column prop="levelExplain" label="级别说明" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.levelExplain == ''" class="color999">暂无级别说明</span>
                    <span v-else>{{scope.row.levelExplain}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center" prop="isAll">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" v-if="scope.row.isAll == 1" @click="levelVisible = true">编辑</el-button>
                    <span class="color999" type="text" icon="el-icon-edit" v-if="scope.row.isAll == 2">编辑</span>
                </template>
            </el-table-column>
        </el-table>
        <!--新增，编辑弹窗-->
        <el-dialog title="新增科目" :visible.sync="levelVisible" class="levelAlert">
            <el-form :model="levelForm" :rules="levelRules" ref="levelForm">
                <el-form-item label="级别名称" prop="name">
                    <el-input v-model="levelForm.name" placeholder="请输入级别名称"></el-input>
                </el-form-item>
                <el-form-item label="级别编号" prop="num">
                    <el-input v-model="levelForm.num" placeholder="请输入级别编号"></el-input>
                </el-form-item>
                <el-form-item label="级别说明" prop="explain">
                    <el-input  v-model="levelForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入级别说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editForm('levelForm')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('levelForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                levelSetData:[
                    {
                        num:1,
                        subjectLevel:'高级',
                        levelExplain:'为了成为高级智障',
                        isAll:1
                    },
                    {
                        num:2,
                        subjectLevel:'初级',
                        levelExplain:'',
                        isAll:2
                    }
                ],
                levelVisible:false,   //新增编辑弹窗
                levelForm: {
                    name:'',
                    num:'',
                    explain:''
                },
                levelRules: {
                    name: [
                        { required: true, message: '请输入级别名称', trigger: 'blur' },
                    ],
                    num: [
                        { required: true, message: '请输入级别编号', trigger: 'blur' },
                    ],
                    explain: [
                        { required: true, message: '请输入级别说明', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            editForm(formName) {   //添加级别弹窗取消
                this.levelVisible = false;
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
                        this.levelVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.levelVisible = true;
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .levelSet{
        .levelAddBox{
            margin: 20px 0;
        }
    }
</style>
