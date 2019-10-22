<template>
    <div class="editClass">
        <!--返回首页-->
        <el-page-header @back="goBack" content="添加班级详情" title="返回首页" v-if="edit == 1"></el-page-header>
        <el-page-header @back="goBack" content="编辑班级详情" title="返回首页" v-if="edit == 2"></el-page-header>

        <el-form :inline="false" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-form-item prop="className" label="班级名称">
                <el-input v-model="ruleForm.className" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item prop="className" label="班级老师">
                <el-button type="text" icon="el-icon-document-add" @click="addTeacherVisible = true">添加老师</el-button>
                <!--添加老师数据-->
                <el-table :data="addTeacherData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" v-if="addTeacherData != []">
                    <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                    <el-table-column prop="name" label="老师姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="phoneNum" label="老师手机号" width="" align="center"></el-table-column>
                    <el-table-column prop="dep" label="所在部门" width="" align="center"></el-table-column>
                    <el-table-column prop="headMaster" label="班主任" width="" align="center"></el-table-column>
                    <el-table-column prop="edit" label="操作" width="" align="center"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="stuName" label="班级学生">
                <el-button type="text" icon="el-icon-document-add" @click="addStuVisible = true">添加学生</el-button>
                <!--添加学生数据-->
                <el-table :data="addStuData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                    <el-table-column prop="name" label="学生姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="birthday" label="出生年月" width="" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="" align="center"></el-table-column>
                    <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="phone" label="家长电话" width="" align="center"></el-table-column>
                    <el-table-column prop="edit" label="操作" width="" align="center"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="subjectName" label="班级科目">
                <el-button type="text" icon="el-icon-document-add" @click="addSubjctVisible = true">添加科目</el-button>
                <!--添加学生数据-->
                <el-table :data="addSubjectData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                    <el-table-column prop="name" label="科目名称" width="" align="center"></el-table-column>
                    <el-table-column prop="edit" label="操作" width="" align="center"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item align="center">
                <el-button @click="resetAddForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitAddForm('ruleForm')">保 存</el-button>
            </el-form-item>
        </el-form>
        <!--添加老师弹窗-->
        <el-dialog title="添加老师" :visible.sync="addTeacherVisible">
            <el-form :model="serchTeacherForm" :rules="serchTeacherRules" ref="serchTeacherForm" :inline="true">
                <el-form-item prop="name">
                    <el-input v-model="serchTeacherForm.name" autocomplete="off" placeholder="请输入老师姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="serchTeacherForm.phone" autocomplete="off" placeholder="请输入老师电话"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitserchTeacherForm('serchTeacherForm')">查询</el-button>
                </el-form-item>
            </el-form>
            <!--老师标签名字-->
            <div class="teacherTag">
                <el-form :model="tagsForm" :rules="tagsRules" ref="tagsForm">
                    <el-form-item prop="dynamicTags">
                        <el-tag
                                v-for="(tag,index) in tagsForm.dynamicTags"
                                :key="index"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </div>
            <!--添加老师信息-->
            <el-table :data="teacherTable" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="name" label="老师姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="120" align="center"></el-table-column>
                <el-table-column prop="dep" label="所在部门" width="" align="center"></el-table-column>
                <el-table-column prop="job" label="职业头衔" width="" align="center"></el-table-column>
                <el-table-column prop="edit" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="changeTeacher(scope.row)" icon="el-icon-check">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="resetTeacherForm('tagsForm')">取 消</el-button>
                <el-button type="primary" @click="submitTeacherForm('tagsForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--添加学生弹窗-->
        <el-dialog title="添加学生" :visible.sync="addStuVisible">
            <el-form :model="serchStuForm" :rules="serchStuRules" ref="serchStuForm" :inline="true">
                <el-form-item prop="name">
                    <el-input v-model="serchStuForm.name" autocomplete="off" placeholder="请输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="serchStuForm.phone" autocomplete="off" placeholder="请输入家长电话"></el-input>
                </el-form-item>
                <el-form-item prop="state">
                    <el-select v-model="serchStuForm.state" placeholder="请选择状态">
                        <el-option label="已有班级" value="shanghai"></el-option>
                        <el-option label="暂无班级" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitserchStuForm('serchStuForm')">查询</el-button>
                </el-form-item>
            </el-form>
            <!--老师标签名字-->
            <div class="teacherTag">
                <el-form :model="tagsStuForm" :rules="tagsStuRules" ref="tagsStuForm">
                    <el-form-item prop="dynamicTags">
                        <el-tag
                                v-for="(tag,index) in tagsStuForm.dynamicTags"
                                :key="index"
                                closable
                                :disable-transitions="false"
                                @close="handleStuClose(tag)">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </div>
            <!--添加学生信息-->
            <el-table :data="stuTable" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="name" label="学生姓名" width="" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生年月" width="120" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phone" label="家长电话" width="120" align="center"></el-table-column>
                <el-table-column prop="edit" label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="changeStuTeacher(scope.row)" icon="el-icon-check">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="resetStuForm('tagsStuForm')">取 消</el-button>
                <el-button type="primary" @click="submitStuForm('tagsStuForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加科目" :visible.sync="addSubjctVisible" class="addSubject">
            <el-form :model="addSubjectForm" :rules="addSubjectRules" ref="addSubjectForm">
                <el-form-item prop="subject">
                    <el-select v-model="addSubjectForm.subject" placeholder="请选择状态">
                        <el-option label="语文" value="1"></el-option>
                        <el-option label="数学" value="2"></el-option>
                        <el-option label="英语" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item align="center" style="margin-top: 60px;">
                    <el-button @click="resetSubjectForm('addSubjectForm')">取消</el-button>
                    <el-button type="primary" @click="submitSubjectForm('addSubjectForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    className: '',
                },
                rules: {
                    className: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                    ],
                },
                addTeacherData: [
                    {
                        num:1,
                        name:'王老师',
                        phoneNum:'15633225566',
                        dep:'语文组',
                        headMaster:'',
                        edit:''
                    }
                ],
                addStuData:[
                    {
                        num:1,
                        name:'小王',
                        birthday:'1563-03-20',
                        sex:'女',
                        parentName:'李先生',
                        phone:'15466558899',
                        edit:''
                    }
                ],
                addSubjectData:[
                    {
                        num:1,
                        name:'数学',
                        edit:''
                    }
                ],
                edit:-1, //获取新增或者编辑 1新增 2编辑
                addTeacherVisible:false,  //添加老师弹窗
                serchTeacherForm: {
                    name:'',
                    phone:''
                },
                serchTeacherRules: {
                    phone: [
                        { required: true, message: '请输入用户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入老师姓名', trigger: 'blur' }
                    ],
                },
                teacherTable: [  //老师数据
                    {
                        num:1,
                        name:'老王',
                        phone:'15455889966',
                        dep:'数学组',
                        job:'英语老师',
                        edit:''
                    },
                    {
                        num:2,
                        name:'老李',
                        phone:'15455889966',
                        dep:'数学组',
                        job:'英语老师',
                        edit:''
                    }
                ],
                tagsForm: {
                    dynamicTags: [],  //老师标签
                },
                tagsRules: {
                    dynamicTags: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                },
                addStuVisible:false,  //添加学生弹窗
                serchStuForm: {
                    name:'',
                    phone:'',
                    state:''
                },
                serchStuRules: {
                    phone: [
                        { required: true, message: '请输入用户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入老师姓名', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: '请选择班级状态', trigger: 'change' }
                    ],
                },
                stuTable: [
                    {
                        num:1,
                        name:'嘿嘿1',
                        birthday:'1322-03-03',
                        sex:'男',
                        parentName:'家长',
                        phone:'15633221144',
                        edit:''
                    },
                    {
                        num:1,
                        name:'嘿嘿2',
                        birthday:'1322-03-03',
                        sex:'男',
                        parentName:'家长',
                        phone:'15633221144',
                        edit:''
                    }
                ],
                tagsStuForm: {
                    dynamicTags: [],  //学生标签
                },
                tagsStuRules: {
                    dynamicTags: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                },
                addSubjctVisible:false,  //添加科目弹窗
                addSubjectForm: {
                    subject:'',
                },
                addSubjectRules: {
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                }
            }
        },
        mounted() {
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
        },
        methods:{
            submitAddForm(formName) {   //新增
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetAddForm(formName) {  //新增取消
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitserchTeacherForm(formName) {  //弹窗查询老师
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '查询成功'
                        });
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClose(tag) {  //删除老师标签
                this.tagsForm.dynamicTags.splice(this.tagsForm.dynamicTags.indexOf(tag), 1);
            },
            changeTeacher(row) {  //选择老师
                let teacherName = row.name;
                let tagNum = this.tagsForm.dynamicTags.indexOf(teacherName);
                if(tagNum == -1) {  //不存在则添加数组
                    this.tagsForm.dynamicTags.push(teacherName);
                }
            },
            resetTeacherForm(formName) {  //重置选择老师弹窗
                this.addTeacherVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitTeacherForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        // this.$refs[formName].resetFields();
                        this.addTeacherVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.$message({
                            message: '请选择老师',
                            type: 'warning'
                        });
                        this.addTeacherVisible = true;
                        return false;
                    }
                });
            },
            submitserchStuForm(formName) {  //查询弹窗 学生
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '查询成功'
                        });
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleStuClose(tag) {  //删除老师标签
                this.tagsStuForm.dynamicTags.splice(this.tagsStuForm.dynamicTags.indexOf(tag), 1);
            },
            changeStuTeacher(row) {  //选择老师
                let teacherName = row.name;
                let tagNum = this.tagsStuForm.dynamicTags.indexOf(teacherName);
                if(tagNum == -1) {  //不存在则添加数组
                    this.tagsStuForm.dynamicTags.push(teacherName);
                }
            },
            resetStuForm(formName) {  //重置选择老师弹窗
                this.addStuVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitStuForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        // this.$refs[formName].resetFields();
                        this.addTeacherVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.$message({
                            message: '请选择老师',
                            type: 'warning'
                        });
                        this.addStuVisible = true;
                        return false;
                    }
                });
            },
            submitSubjectForm(formName) {   //选择科目弹窗
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.addSubjctVisible = false;
                        // this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        this.$message({
                            message: '请选择科目',
                            type: 'warning'
                        });
                        this.addSubjctVisible = true;
                        return false;
                    }
                });
            },
            resetSubjectForm(formName) {  //重置选择科目弹窗
                this.addSubjctVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            goBack() {  //返回首页
                this.$router.push({
                    path: `/content/pageIndex`,
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .editClass{
        .demo-form-inline{
            margin: 20px 0;
            padding: 20px;
            background: #fff;
        }
        .teacherTag{
            min-height: 52px;
            margin-bottom: 10px;
        }
    }
</style>