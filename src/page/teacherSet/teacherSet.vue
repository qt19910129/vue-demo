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
                            <el-option label="全职" value="全职"></el-option>
                            <el-option label="兼职" value="兼职"></el-option>
                            <el-option label="试用期" value="试用期"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="status">
                        <el-select v-model="ruleForm.status" placeholder="请选择教师状态">
                            <el-option label="在职" value="1"></el-option>
                            <el-option label="离职" value="2"></el-option>
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
                <el-button type="primary" @click="isAdd">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="teacherSetData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;min-height: 440px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column type="index" label="序号" width="" align="center"></el-table-column>
                <el-table-column prop="name" label="教师名称" width="" align="center"></el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="" align="center" width="200"></el-table-column>
                <el-table-column prop="deptName" label="所在部门" width="" align="center" width="230"></el-table-column>
                <el-table-column prop="duty" label="职业头衔" width="" align="center" width="230"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="" align="center" width="180"></el-table-column>
                <el-table-column prop="teacherType" label="教师类型" width="" align="center" width="100">
                    <!--<template slot-scope="scope">-->
                        <!--<span type="text" v-if="scope.row.teacherType == 1">全职</span>-->
                        <!--<span type="text" v-if="scope.row.teacherType == 2">兼职</span>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column prop="status" label="教师状态" width="" align="center" width="100">
                    <template slot-scope="scope">
                        <span type="text" v-if="scope.row.status == 1" class="greenText">在职</span>
                        <span type="text" v-if="scope.row.status == 2">离职</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="125" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goTeachers(scope.row.id)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="openEdit(scope.row.id,1)">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="changePassWord(scope.row.id,scope.row.mobile)">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template>
                <el-pagination
                        align="right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="records"
                        background
                        :hide-on-single-page="pageValue"
                        class="pages">
                </el-pagination>
            </template>
        </div>
        <!--新增，编辑老师信息-->
        <el-dialog :title="isEdit" :visible.sync="teacherVisible" class="teacherAlert" :before-close="handleClose">
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
                            <el-input v-model="teacherForm.phone" placeholder="请输入手机号" :maxlength=11></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker type="date" placeholder="请选择出生日期" v-model="teacherForm.birthday" style="width: 189px" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="card">
                            <el-input v-model="teacherForm.card" placeholder="请输入身份证号" :maxlength=18></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入职日期" prop="jobDate">
                            <el-date-picker type="date" placeholder="请选择入职日期" v-model="teacherForm.jobDate" style="width: 189px" value-format="yyyy-MM-dd"></el-date-picker>
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
                        <el-form-item label="在职类型" prop="teacherType">
                            <el-select v-model="teacherForm.teacherType" placeholder="请选择在职类型">
                                <el-option label="全职" value="全职"></el-option>
                                <el-option label="兼职" value="兼职"></el-option>
                                <el-option label="试用期" value="试用期"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教师状态" prop="status">
                            <el-select v-model="teacherForm.status" placeholder="请选择教师状态">
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
    import {
        getTeacherList,
        addTeacher,
        editTeacher,
        saveEdit,
        resetPassword,
    } from "../../axios/teacherSet";
    export default {
        data() {
            return {
                ruleForm: {
                    teacherName: '',
                    status: '',
                    teacherJob:'',
                },
                rules: {
                    teacherName: [],
                    status: [],
                    teacherJob: [],
                },
                teacherSetData:[],  //数据列表
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
                    teacherType:'',
                    status:''
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
                        { type: 'string', required: true, message: '请选择出生日期', trigger: 'change' }
                        // { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                    ],
                    card: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                        { min: 18, max: 18, message: '请输入正确的18位身份证号', trigger: 'blur' }
                    ],
                    jobDate: [
                        { type: 'string', required: true, message: '请选择入职日期', trigger: 'change' }
                        // { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
                    ],
                    dep: [
                        { required: true, message: '请输入所在部门', trigger: 'blur' },
                    ],
                    job: [
                        { required: true, message: '请输入职业头衔', trigger: 'blur' },
                    ],
                    teacherType: [
                        { required: true, message: '请选择在职类型', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择教师状态', trigger: 'change' }
                    ],
                },
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                isEdit:'',  //0是新增 1是编辑
                editState:-1,  //0是新增 1是编辑
                id:0,  //编辑id
            }
        },
        mounted() {
            this.getList();  //列表数据
        },
        methods: {
            getList() {
                let data = {
                    'rows':this.rows,
                    'page':this.page
                };
                getTeacherList(data).then(res => {
                    this.teacherSetData = res.data.jqGirdPage.rows;
                    this.records = res.data.jqGirdPage.records;
                    if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                        this.pageValue = true;
                    }
                }).catch((e) => {});
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //搜索成功
                        if(this.ruleForm.teacherName == '' && this.ruleForm.status == '' && this.ruleForm.teacherJob == '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            let data = {
                                'name':this.ruleForm.teacherName,
                                'status':this.ruleForm.status,
                                'teacherType':this.ruleForm.teacherJob,
                            };
                            getTeacherList(data).then(res => {
                                this.teacherSetData = res.data.jqGirdPage.rows;
                                this.records = res.data.jqGirdPage.records;
                                if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                                    this.pageValue = true;
                                }
                            }).catch((e) => {});
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changePassWord(id,mobile) {
                this.$confirm('此操作将重置密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        'id':id,
                        'mobile':mobile
                    };
                    resetPassword(data).then(res => {
                        if(res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '重置密码成功!'
                            });
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
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
                        console.log(this.teacherForm);
                        if(this.editState == 0) {  //新增
                            let data = {
                                'name':this.teacherForm.name,
                                'mobile':this.teacherForm.phone,
                                'identityCard':this.teacherForm.card,
                                'deptName':this.teacherForm.dep,
                                'teacherType':this.teacherForm.teacherType,
                                'englishName':this.teacherForm.englishName,
                                'birthday':this.teacherForm.birthday,
                                'inductionTime':this.teacherForm.jobDate,
                                'duty':this.teacherForm.job,
                                'status':this.teacherForm.status,
                            };
                            console.log(data);
                            addTeacher(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.teacherVisible = false;
                                    setTimeout(function () {
                                        // window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        } else {  //编辑
                            if(this.teacherForm.status == '在职') {
                                this.teacherForm.status = 1;
                            } else if(this.teacherForm.status == '离职') {
                                this.teacherForm.status = 2;
                            }
                            let data = {
                                'name':this.teacherForm.name,
                                'mobile':this.teacherForm.phone,
                                'identityCard':this.teacherForm.card,
                                'deptName':this.teacherForm.dep,
                                'teacherType':this.teacherForm.teacherType,
                                'englishName':this.teacherForm.englishName,
                                'birthday':this.teacherForm.birthday,
                                'inductionTime':this.teacherForm.jobDate,
                                'duty':this.teacherForm.job,
                                'status':this.teacherForm.status,
                                'id':this.id
                            };
                            saveEdit(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.teacherVisible = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        }
                    } else {
                        console.log('error submit!!');
                        this.teacherVisible = true;
                        return false;
                    }
                });
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.rows = `${val}`;
                let data = {
                    'page':this.page,
                    'rows':this.rows
                };
                getTeacherList(data).then(res => {
                    // console.log(res.data);
                    // console.log(res.data.jqGirdPage.rows);
                    this.records = res.data.jqGirdPage.records;
                    this.teacherSetData = res.data.jqGirdPage.rows;
                    if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                        this.pageValue = true;
                    }
                }).catch((e) => {});
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                let data = {
                    'page':this.page,
                    'rows':this.rows
                };
                getTeacherList(data).then(res => {
                    // console.log(res.data);
                    // console.log(res.data.jqGirdPage.rows);
                    this.records = res.data.jqGirdPage.records;
                    this.teacherSetData = res.data.jqGirdPage.rows;
                    if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                        this.pageValue = true;
                    }
                }).catch((e) => {});
            },
            isAdd() {
                this.editState = 0;
                this.teacherVisible = true;
                this.isEdit = '新增教师资料';
            },
            openEdit(id,edit) {  //点击编辑
                this.editState = 1;
                this.teacherVisible = true;
                this.isEdit = '编辑教师资料';
                this.id = id;
                let data = {
                    'id':id
                };
                editTeacher(data).then(res => {
                    if(res.code == 0) {
                        this.teacherForm.name = res.data.teacher.name;
                        this.teacherForm.phone = res.data.teacher.mobile;
                        this.teacherForm.card = res.data.teacher.identityCard;
                        this.teacherForm.dep = res.data.teacher.deptName;
                        this.teacherForm.status = res.data.teacher.status;
                        this.teacherForm.englishName = res.data.teacher.englishName;
                        this.teacherForm.birthday = res.data.teacher.birthday;
                        this.teacherForm.jobDate = res.data.teacher.inductionTime;
                        this.teacherForm.job = res.data.teacher.duty;
                        this.teacherForm.teacherType = res.data.teacher.teacherType;
                        if(res.data.teacher.status == 1) {
                            this.teacherForm.status = '在职';
                        } else if(res.data.teacher.status == 2) {
                            this.teacherForm.status = '离职';
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleClose(done) {
                this.$refs['teacherForm'].resetFields();
                this.teacherVisible = false;
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
