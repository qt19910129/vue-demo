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
                <el-button type="primary" @click="teacherVisible = true">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="teacherSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
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
                <el-table-column fixed="right" label="操作" width="130" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goTeachers(scope.row.teacherId)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="teacherVisible = true">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="changePassWord">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增，编辑老师信息-->
        <el-dialog title="新增教师资料" :visible.sync="teacherVisible" class="teacherAlert">
            <el-form :model="teacherForm" :rules="teacherRules" ref="teacherForm" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="教师姓名" prop="name">
                            <el-input v-model="teacherForm.name" placeholder="请输入教师姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="英文姓名" prop="englishName">
                            <el-input v-model="teacherForm.englishName" placeholder="请输入英文姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="teacherForm.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker type="date" placeholder="请选择出生日期" v-model="ruleForm.birthday" style="width: 189px"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="card">
                            <el-input v-model="teacherForm.card" placeholder="请输入身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入职日期" prop="jobDate">
                            <el-date-picker type="date" placeholder="请选择入职日期" v-model="ruleForm.jobDate" style="width: 189px"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所在部门" prop="dep">
                            <el-input v-model="teacherForm.dep" placeholder="请输入所在部门"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职业头衔" prop="job">
                            <el-input v-model="teacherForm.job" placeholder="请输入职业头衔"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="在职类型" prop="state">
                            <el-select v-model="teacherForm.state" placeholder="请选择在职类型">
                                <el-option label="全职" value="1"></el-option>
                                <el-option label="兼职" value="2"></el-option>
                                <el-option label="试用期" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教师状态" prop="teacherState">
                            <el-select v-model="teacherForm.teacherState" placeholder="请选择教师状态">
                                <el-option label="在职" value="1"></el-option>
                                <el-option label="离职" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editForm('teacherForm')" class="btns">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('teacherForm')" class="btns">保 存</el-button>
            </div>
        </el-dialog>
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
                        teacherId:11
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
                        teacherId:12
                    },
                ],

                teacherVisible:false,  //新增编辑教师资料弹窗
                teacherForm: {
                    name:'',
                    englishName:'',
                    phone:'',
                    birthday:'',
                    card:'',
                    jobDate:'',
                    dep:'',
                    job:'',
                    state:'',
                    teacherState:''
                },
                teacherRules: {
                    name: [
                        { required: true, message: '请输入教师姓名', trigger: 'blur' },
                    ],
                    englishName: [
                        { required: true, message: '请输入英文姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    birthday: [
                        { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                    ],
                    card: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                        { min: 18, max: 18, message: '请输入正确的18位身份证号', trigger: 'blur' }
                    ],
                    jobDate: [
                        { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
                    ],
                    dep: [
                        { required: true, message: '请输入所在部门', trigger: 'blur' },
                    ],
                    job: [
                        { required: true, message: '请输入职业头衔', trigger: 'blur' },
                    ],
                    state: [
                        { required: true, message: '请选择在职类型', trigger: 'change' }
                    ],
                    teacherState: [
                        { required: true, message: '请选择教师状态', trigger: 'change' }
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
            },
            goTeachers(teacherId) {  //跳转差看教师详情页
                this.$router.push({
                    path: `/content/details/teachers/${teacherId}`,
                })
            },
            editForm(formName) {   //添加课时弹窗取消
                this.teacherVisible = false;
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
                        this.teacherVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.teacherVisible = true;
                        return false;
                    }
                });
            },
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
