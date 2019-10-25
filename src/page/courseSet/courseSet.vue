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
                <el-button type="primary" @click="courseVisible = true">新增</el-button>
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
                        <el-button type="text" icon="el-icon-edit" @click="courseVisible = true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增，编辑弹窗-->
        <el-dialog title="新增课程" :visible.sync="courseVisible" class="courseAlert">
            <el-form :model="courseForm" :rules="courseRules" ref="courseForm">
                <el-form-item label="选择科目" prop="subject">
                    <el-select v-model="courseForm.subject" placeholder="请选择科目">
                        <el-option label="科目1" value="1"></el-option>
                        <el-option label="科目2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择级别" prop="level">
                    <el-select v-model="courseForm.level" placeholder="请选择级别">
                        <el-option label="级别1" value="1"></el-option>
                        <el-option label="级别2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model="courseForm.name" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程说明" prop="explain">
                    <el-input  v-model="courseForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入课程说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editForm('courseForm')" class="btns">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('courseForm')" class="btns">保 存</el-button>
            </div>
        </el-dialog>
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
                ],
                courseVisible:false,  //新增编辑课程弹窗
                courseForm: {
                    subject:'',
                    level:'',
                    name:'',
                    explain:''
                },
                courseRules: {
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' },
                    ],
                    level: [
                        { required: true, message: '请选择级别', trigger: 'change' },
                    ],
                    name: [
                        { required: true, message: '请选择课程名称', trigger: 'change' },
                    ],
                    explain: [
                        { required: true, message: '请输入课程说明', trigger: 'blur' },
                    ],
                }
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
            editForm(formName) {   //添加课时弹窗取消
                this.courseVisible = false;
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
                        this.courseVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.courseVisible = true;
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
