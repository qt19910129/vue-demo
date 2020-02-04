<template>
    <div class="editClass">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">班级管理</a></el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 1">添加班级详情</el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 2">编辑班级详情</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="false" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-form-item prop="className" label="班级名称">
                <el-input v-model="ruleForm.className" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item prop="classTime" label="开始时间">
                <el-date-picker v-model="ruleForm.classTime" type="date" placeholder="请输入开始时间" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item prop="" label="班级老师">
                <el-button type="text" icon="el-icon-document-add" @click="clickAddTeacher()">添加老师</el-button>
                <!--添加老师数据-->
                <el-table :data="tagsForm.dynamicTags" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column type="index" label="ID" align="center"></el-table-column>
                    <el-table-column prop="name" label="老师姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="老师手机号" width="" align="center"></el-table-column>
                    <el-table-column prop="deptName" label="所在部门" width="" align="center"></el-table-column>
                    <!--<el-table-column prop="headMaster" label="班主任" width="" align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-radio v-model="radio" :label="scope.row.name">选择</el-radio>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column prop="edit" label="操作" width="" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" @click.native.prevent="deleteRow(scope.$index, ruleForm.addTeacherData, scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="" label="班级学生">
                <el-button type="text" icon="el-icon-document-add" @click="addStuVisible = true">添加学生</el-button>
                <!--添加学生数据-->
                <el-table :data="tagsStuForm.dynamicTags" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column type="index" label="ID" align="center"></el-table-column>
                    <el-table-column prop="studentName" label="学生姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="birthDay" label="出生年月" width="100" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column prop="gender" label="性别" width="" align="center"></el-table-column>
                    <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                    <el-table-column prop="phone" label="家长电话" width="120" align="center"></el-table-column>
                    <el-table-column prop="edit" label="操作" width="140" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" @click.native.prevent="deleteRowStu(scope.$index, ruleForm.addStuData, scope.row.name)">删除</el-button>
                            <el-button v-if="edit == 2" type="text" icon="el-icon-office-building" @click="changeClass(scope.row.id,scope.row.sourceClassId)">换班</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item prop="" label="班级科目">
                <!--<el-button type="text" icon="el-icon-document-add" @click="addSubjctVisible = true">添加科目</el-button>-->
                <!--添加学生数据-->
                <el-table :data="ruleForm.addSubjectData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column label="ID" align="center" type="index"></el-table-column>
                    <el-table-column prop="subjectName" label="科目名称" width="" align="center"></el-table-column>
                    <el-table-column prop="subjectNum" label="课次" width="" align="center"></el-table-column>
                    <el-table-column prop="studentCount" label="学生数" width="" align="center"></el-table-column>
                    <el-table-column prop="allSubjectNum" label="总课时" width="" align="center"></el-table-column>
                    <el-table-column prop="subjectConsumer" label="课耗" width="" align="center"></el-table-column>
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
                    <el-input v-model="serchTeacherForm.phone" autocomplete="off" placeholder="请输入老师电话" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitserchTeacherForm('serchTeacherForm')">查询</el-button>
                    <el-button @click="teacherReset()">重置</el-button>
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
                            {{tag.name}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </div>
            <!--添加老师信息-->
            <el-table :data="teacherTable" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="name" label="老师姓名" width="" align="center"></el-table-column>
                <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="deptName" label="所在部门" width="" align="center"></el-table-column>
                <el-table-column prop="duty" label="职业头衔" width="" align="center"></el-table-column>
                <el-table-column prop="edit" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="changeTeacher(scope.row)" icon="el-icon-check">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template>
                <el-pagination
                        align="right"
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage1"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="records1"
                        background
                        :hide-on-single-page="pageValue1"
                        class="pages">
                </el-pagination>
            </template>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click="resetTeacherForm('tagsForm')">关 闭</el-button>
                <!--<el-button type="primary" @click="submitTeacherForm('tagsForm')">确 定</el-button>-->
            </div>
        </el-dialog>
        <!--添加学生弹窗-->
        <el-dialog title="添加学生" :visible.sync="addStuVisible">
            <el-form :model="serchStuForm" :rules="serchStuRules" ref="serchStuForm" :inline="true">
                <el-form-item prop="name">
                    <el-input v-model="serchStuForm.name" autocomplete="off" placeholder="请输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="serchStuForm.phone" autocomplete="off" placeholder="请输入家长电话" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="state">
                    <el-select v-model="serchStuForm.state" placeholder="请选择状态">
                        <el-option label="已有班级" value="1"></el-option>
                        <el-option label="暂无班级" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitserchStuForm('serchStuForm')">查询</el-button>
                    <el-button @click="studentReset()">重置</el-button>
                </el-form-item>
            </el-form>
            <!--学生标签名字-->
            <div class="teacherTag">
                <el-form :model="tagsStuForm" :rules="tagsStuRules" ref="tagsStuForm">
                    <el-form-item prop="dynamicTags">
                        <el-tag
                                v-for="(tag,index) in tagsStuForm.dynamicTags"
                                :key="index"
                                closable
                                :disable-transitions="false"
                                @close="handleStuClose(tag)">
                            {{tag.studentName}}
                        </el-tag>
                    </el-form-item>
                </el-form>
            </div>
            <!--添加学生信息-->
            <el-table :data="stuTable" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="studentName" label="学生姓名" width="" align="center"></el-table-column>
                <el-table-column prop="birthDay" label="出生年月" width="100" align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="gender" label="性别" align="center"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phone" label="家长电话" width="120" align="center"></el-table-column>
                <el-table-column prop="edit" label="操作" width="80" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="changeStuTeacher(scope.row)" icon="el-icon-check">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template>
                <el-pagination
                        align="right"
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page.sync="currentPage1"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="records2"
                        background
                        :hide-on-single-page="pageValue2"
                        class="pages">
                </el-pagination>
            </template>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button type="primary" @click="resetStuForm('tagsStuForm')">关 闭</el-button>
                <!--<el-button type="primary" @click="submitStuForm('tagsStuForm')">确 定</el-button>-->
            </div>
        </el-dialog>
        <el-dialog title="换班" :visible.sync="changeClassVisible" class="addSubject" :before-close="handleCloseClass">
            <el-form :model="changeClassForm" :rules="changeClassRules" ref="changeClassForm">
                <el-form-item prop="className">
                    <el-select v-model="changeClassForm.className" placeholder="请选择班级">
                        <el-option v-for="list in classList" :label="list.name" :value="list.id" :key="list.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item align="center" style="margin-top: 60px;">
                    <el-button @click="resetCCForm('changeClassForm')">取消</el-button>
                    <el-button type="primary" @click="submitCCForm('changeClassForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="添加科目" :visible.sync="addSubjctVisible" class="addSubject">
            <el-form :model="addSubjectForm" :rules="addSubjectRules" ref="addSubjectForm">
                <el-form-item prop="subject">
                    <el-select v-model="addSubjectForm.name" placeholder="请选择科目">
                        <el-option label="语文" value="语文"></el-option>
                        <el-option label="数学" value="数学"></el-option>
                        <el-option label="英语" value="英语"></el-option>
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
    import {
        classTeachers,
        classStudent,
        addClass,
        editClass,
        saveEditClass,
        changeClassList,
        saveChangeClass
    } from "../../axios/classSet";
    import moment from 'moment';
    export default {
        data() {
            var checkphone = (rule, value, callback) => {
                // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
                if (!this.isCellPhone(value) && value.length > 0) {//引入methods中封装的检查手机格式的方法
                    callback(new Error("请输入正确的11位手机号码!"));
                } else {
                    callback();
                }
            };
            return {
                radio:'',
                ruleForm: {
                    className: '',
                    classTime:'',
                    addTeacherData: [],
                    addStuData:[],
                    addSubjectData:[
                        // {
                        //     num:1,
                        //     name:'数学',
                        //     edit:''
                        // }
                    ],
                },
                rules: {
                    className: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                    ],
                    classTime: [
                        { required: true, message: '请输入开始时间', trigger: 'blur' },
                    ],
                    addTeacherData: [
                        { required: true, message: '请添加班级老师', trigger: 'blur' },
                    ],
                    addStuData: [
                        { required: true, message: '请添加班级学生', trigger: 'blur' },
                    ],
                    addSubjectData: [
                        { required: true, message: '请添加班级科目', trigger: 'blur' },
                    ]
                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
                addTeacherVisible:false,  //添加老师弹窗
                changeClassVisible:false, //换班弹窗
                sourceClassId:-1,  //换班前 的id
                kidId:-1,  //换班学生id
                serchTeacherForm: {
                    name:'',
                    phone:''
                },
                serchTeacherRules: {
                    phone: [
                        { required: true, validator: checkphone, trigger: 'blur' },
                    ],
                    name: [
                    ],
                },
                teacherTable: [],  //老师数据
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
                        { required: true, validator: checkphone, trigger: 'blur' },
                    ],
                    name: [],
                    state: [],
                },
                stuTable: [],
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
                    name:'',
                },
                addSubjectRules: {
                    name: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                },
                changeClassForm: {
                    className:'',
                },
                changeClassRules: {
                    className: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                },
                classList:[],
                delTagsArr:[],  //删除掉的标签组
                currentPage1:1,  //分页默认选中哪页
                records1:0,  //总页数
                rows1:5,  //默认每页条数
                page1:1,  //默认打开第一页
                pageValue1:false,  //当只有一页时 分页隐藏
                currentPage2:1,  //分页默认选中哪页
                records2:0,  //总页数
                rows2:5,  //默认每页条数
                page2:1,  //默认打开第一页
                pageValue2:false,  //当只有一页时 分页隐藏
            }
        },
        mounted() {
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
            if(this.edit == 2) {
                // this.tagsForm.dynamicTags == this.addTeacherData;
                this.showEditClass();
            }
            this.getTeachers();  //老师列表
            this.getStudents();  //学生列表
        },
        methods:{
            getTeachers() {  //获取老师列表数据
                let data = {
                    'rows':this.rows1,
                    'page':this.page1,
                    'name':this.serchTeacherForm.name,
                    'phone':this.serchTeacherForm.phone,
                };
                classTeachers(data).then(res => {
                    if(res.code == 0) {
                        this.records1 = res.data.jqGirdPage.records;
                        this.teacherTable = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                            this.pageValue1 = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange1(val) {
                // console.log(`每页 ${val} 条`);
                this.rows1 = `${val}`;
                this.currentPage1 = 1;
                this.page1 = 1;
                this.getTeachers();
            },
            handleCurrentChange1(val) {
                this.page1 = `${val}`;
                this.getTeachers();
            },
            getStudents() {  //获取学生列表数据
                let data = {
                    'rows':this.rows2,
                    'page':this.page2,
                    'name':this.serchStuForm.name,
                    'phone':this.serchStuForm.phone,
                    'inClass':this.serchStuForm.state,
                };
                classStudent(data).then(res => {
                    if(res.code == 0) {
                        this.records2 = res.data.jqGirdPage.records;
                        this.stuTable = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                            this.pageValue2 = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange2(val) {
                // console.log(`每页 ${val} 条`);
                this.rows2 = `${val}`;
                this.currentPage2 = 1;
                this.page2 = 1;
                this.getStudents();
            },
            handleCurrentChange2(val) {
                this.page2 = `${val}`;
                this.getStudents();
            },
            submitAddForm(formName) {   //新增
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.tagsForm.dynamicTags.length == 0) {  //如果没选择老师
                            this.$message({
                                message: '请添加老师数据',
                                type: 'warning'
                            });
                        } else if(this.tagsStuForm.dynamicTags.length == 0) {
                            this.$message({
                                message: '请添加学生数据',
                                type: 'warning'
                            });
                        } else {
                            let teacherArr = '';
                            for(var i = 0; i < this.tagsForm.dynamicTags.length; i++) {
                                teacherArr += this.tagsForm.dynamicTags[i].id + ',';
                            }
                            teacherArr = teacherArr.substring(0,teacherArr.length-1);
                            let studentArr = '';
                            for(var j = 0; j < this.tagsStuForm.dynamicTags.length; j++) {
                                studentArr += this.tagsStuForm.dynamicTags[j].id + ',';
                            }
                            studentArr = studentArr.substring(0,studentArr.length-1);
                            let data;
                            if(this.edit == 2) {    //修改
                                data = {
                                    'name':this.ruleForm.className,
                                    'startDate':this.ruleForm.classTime,
                                    'teachers':teacherArr,
                                    'students':studentArr,
                                    'classId':this.$route.query.classId * 1
                                };
                                saveEditClass(data).then(res => {
                                    if(res.code == 0) {
                                        this.$message({
                                            type: 'success',
                                            message: '修改班级成功，即将返回上一页！'
                                        });
                                        setTimeout(function () {
                                            history.back(-1);
                                        },1500);
                                    } else {
                                        this.$message.error('网络异常，请稍后再试');
                                    }
                                }).catch((e) => {});
                            } else {
                                data = {
                                    'name':this.ruleForm.className,
                                    'startDate':this.ruleForm.classTime,
                                    'teachers':teacherArr,
                                    'students':studentArr
                                };
                                addClass(data).then(res => {
                                    if(res.code == 0) {
                                        this.$message({
                                            type: 'success',
                                            message: '新建班级成功，即将返回上一页！'
                                        });
                                        setTimeout(function () {
                                            history.back(-1);
                                        },1500);
                                    } else {
                                        this.$message.error('网络异常，请稍后再试');
                                    }
                                }).catch((e) => {});
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetAddForm(formName) {  //新增取消
                this.$confirm('此操作将返回上一页, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    history.back(-1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            studentReset() {  //重置查询学生
                this.$refs['serchStuForm'].resetFields();
                let data = {
                    'page':1,
                    'rows':5
                };
                this.rows2 = 5;
                this.currentPage2 = 1;
                this.page2 = 1;
                classStudent(data).then(res => {
                    if(res.code == 0) {
                        this.records2 = res.data.jqGirdPage.records;
                        this.stuTable = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                            this.pageValue2 = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            teacherReset() {  //重置查询老师
                this.$refs['serchTeacherForm'].resetFields();
                let data = {
                    'page':1,
                    'rows':5
                };
                this.rows1 = 5;
                this.currentPage1 = 1;
                this.page1 = 1;
                classTeachers(data).then(res => {
                    if(res.code == 0) {
                        this.records1 = res.data.jqGirdPage.records;
                        this.teacherTable = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                            this.pageValue1 = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            submitserchTeacherForm(formName) {  //弹窗查询老师
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.serchTeacherForm.name == '' && this.serchTeacherForm.phone == '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            let data = {
                                'name':this.serchTeacherForm.name,
                                'phone':this.serchTeacherForm.phone,
                                'page':1,
                                'rows':5
                            };
                            this.rows1 = 5;
                            this.currentPage1 = 1;
                            this.page1 = 1;
                            classTeachers(data).then(res => {
                                if(res.code == 0) {
                                    this.records1 = res.data.jqGirdPage.records;
                                    this.teacherTable = res.data.jqGirdPage.rows;
                                    if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                                        this.pageValue1 = true;
                                    }
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClose(tag) {  //删除老师标签
                this.delTagsArr.push(tag);  //删除掉的保存
                this.tagsForm.dynamicTags.splice(this.tagsForm.dynamicTags.indexOf(tag), 1);
            },
            changeTeacher(row) {  //选择老师
                let teachers = {
                    'id':row.id,
                    'name':row.name,
                    'mobile':row.mobile,
                    'deptName':row.deptName
                };
                this.tagsForm.dynamicTags.push(teachers);
                //去重
                var obj = {};
                this.tagsForm.dynamicTags = this.tagsForm.dynamicTags.reduce(function(item, next) {
                    obj[next.id] ? '' : obj[next.id] = true && item.push(next);
                    return item;
                }, []);
            },
            clickAddTeacher() {  //点击添加老师
                this.addTeacherVisible = true;
                // console.log(this.tagsForm.dynamicTags,'点击添加老师');
            },
            resetTeacherForm(formName) {  //重置选择老师弹窗
                this.addTeacherVisible = false;
            },
            mergeArray(arr1,arr2) {
                var _arr = new Array();
                for(var i=0;i<arr1.length;i++){
                    _arr.push(arr1[i]);
                }
                for(var i=0;i<arr2.length;i++){
                    var flag = true;
                    for(var j=0;j<arr1.length;j++){
                        if(arr2[i]==arr1[j]){
                            flag=false;
                            break;
                        }
                    }
                    if(flag){
                        _arr.push(arr2[i]);
                    }
                }
                return _arr;
            },
            submitserchStuForm(formName) {  //查询弹窗 学生
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.serchStuForm.name == '' && this.serchStuForm.phone == '' && this.serchStuForm.state == '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            let data = {
                                'name':this.serchStuForm.name,
                                'phone':this.serchStuForm.phone,
                                'inClass':this.serchStuForm.state,
                                'page':1,
                                'rows':5
                            };
                            this.rows2 = 5;
                            this.currentPage2 = 1;
                            this.page2 = 1;
                            classStudent(data).then(res => {
                                if(res.code == 0) {
                                    this.records2 = res.data.jqGirdPage.records;
                                    this.stuTable = res.data.jqGirdPage.rows;
                                    if(res.data.jqGirdPage.records <= 5) {  //小于10条时 隐藏分页
                                        this.pageValue2 = true;
                                    }
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleStuClose(tag) {  //删除学生标签
                this.delTagsArr.push(tag);  //删除掉的保存
                this.tagsStuForm.dynamicTags.splice(this.tagsStuForm.dynamicTags.indexOf(tag), 1);
            },
            changeStuTeacher(row) {  //选择学生
                let students = {
                    'id':row.kidId,
                    'studentName':row.studentName,
                    'birthDay':row.birthDay,
                    'phone':row.phone,
                    'gender':row.gender,
                    'parentName':row.parentName,
                };
                this.tagsStuForm.dynamicTags.push(students);
                //去重
                var obj = {};
                this.tagsStuForm.dynamicTags = this.tagsStuForm.dynamicTags.reduce(function(item, next) {
                    obj[next.id] ? '' : obj[next.id] = true && item.push(next);
                    return item;
                }, []);

                // let teacherName = row.name;
                // let tagNum = JSON.stringify(this.tagsStuForm.dynamicTags).indexOf(JSON.stringify(teacherName));
                // if(tagNum == -1) {  //不存在则添加数组
                //     this.tagsStuForm.dynamicTags.push(row);
                // }
            },
            resetStuForm(formName) {  //重置选择老师弹窗
                this.addStuVisible = false;
                // this.$refs[formName].resetFields();
                // this.ruleForm.addStuData = this.tagsStuForm.dynamicTags = [];
            },
            submitStuForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        // this.$refs[formName].resetFields();
                        this.addStuVisible = false;
                        //添加成功，则push进去
                        // this.ruleForm.addStuData = this.tagsStuForm.dynamicTags;
                        let newArr = this.mergeArray(this.ruleForm.addStuData, this.tagsStuForm.dynamicTags);
                        this.ruleForm.addStuData = newArr;
                        if(this.delTagsArr.length > 0) {
                            for(var i = 0; i < this.ruleForm.addStuData.length; i++) {
                                for(var j = 0; j < this.delTagsArr.length; j++) {
                                    if(this.ruleForm.addStuData[i].name == this.delTagsArr[j].name) {
                                        this.ruleForm.addStuData.splice(i,1);
                                    }
                                }
                            }
                        }
                        this.delTagsArr = [];
                    } else {
                        console.log('error submit!!');
                        this.tagsForm.dynamicTags = [];
                        this.ruleForm.addTeacherData = [];
                        this.delTagsArr = [];
                        this.$message({
                            message: '请选择学生',
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
                        let data = {

                        };
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.addSubjctVisible = false;
                        console.log(this.addSubjectForm);
                        this.ruleForm.addSubjectData.push(this.addSubjectForm);
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
            submitCCForm(formName) {   //换班弹窗
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            'sourceClassId':this.sourceClassId,
                            'kidId':this.kidId,
                            'targetClassId':this.changeClassForm.className
                        };
                        saveChangeClass(data).then(res => {
                            if(res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '换班成功，即将刷新页面'
                                });
                                setTimeout(function () {
                                    window.location.reload();
                                },1500)
                            } else {
                                this.$message.error('网络异常，请稍后再试');
                            }
                        }).catch((e) => {});
                    } else {
                        this.$message({
                            message: '请选择班级',
                            type: 'warning'
                        });
                        this.changeClassVisible = true;
                        return false;
                    }
                });
            },
            resetCCForm(formName) {  //重置换班弹窗
                this.changeClassVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            deleteRow(index, rows, id) {  //删除table一行
                for(var i = 0; i < this.tagsForm.dynamicTags.length; i++) {
                    if(this.tagsForm.dynamicTags[i].id == id) {
                        this.tagsForm.dynamicTags.splice(i,1);
                    }
                }
                console.log(this.tagsForm.dynamicTags,'外层删除');
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            },
            deleteRowStu(index, rows, name) {  //删除table一行
                for(var i = 0; i < this.tagsStuForm.dynamicTags.length; i++) {
                    if(this.tagsStuForm.dynamicTags[i].name == name) {
                        this.tagsStuForm.dynamicTags.splice(i,1)
                    }
                }
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            },
            deleteSubjectRow(index, rows, name) {  //删除table一行
                rows.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            },
            //检查手机号
            isCellPhone(val) {
                if (!/^1[3456789]\d{9}$/.test(val)) {
                    return false;
                } else {
                    return true;
                }
            },
            dateFormat(row, column, cellValue, index){  //表格日期格式化
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD");
            },
            showEditClass() {  //修改班级回显
                let data = {
                    'classId':this.$route.query.classId,
                };
                editClass(data).then(res => {
                    if(res.code == 0) {
                        this.ruleForm.className = res.data.name;
                        this.ruleForm.classTime = res.data.startDate.substring(0, 10);
                        this.ruleForm.addSubjectData = res.data.keSubjectResults;
                        let teachers = {};
                        let teacherArr = [];
                        for(var i = 0; i < res.data.classTeacher.length; i++) {
                            teachers = {
                                'id':res.data.classTeacher[i].personId,
                                'name':res.data.classTeacher[i].personName,
                                'mobile':res.data.classTeacher[i].mobile,
                                'deptName':res.data.classTeacher[i].deptName
                            };
                            teacherArr.push(teachers);
                        }
                        this.tagsForm.dynamicTags = teacherArr;
                        let students = {};
                        let studentsArr = [];
                        for(var i = 0; i < res.data.classStudent.length; i++) {
                            students = {
                                'id':res.data.classStudent[i].personId,
                                'studentName':res.data.classStudent[i].personName,
                                'birthDay':res.data.classStudent[i].birthday,
                                'gender':res.data.classStudent[i].gender,
                                'parentName':res.data.classStudent[i].parentName,
                                'phone':res.data.classStudent[i].mobile,
                                'name':res.data.classStudent[i].personName,
                                'sourceClassId':res.data.classStudent[i].classId,
                            };
                            studentsArr.push(students);
                        }
                        this.tagsStuForm.dynamicTags = studentsArr;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            changeClass(kidId,sourceClassId) {  //换班
                this.sourceClassId = sourceClassId;
                this.kidId = kidId;
                this.changeClassVisible = true;
                let data = {
                    'kidId':kidId
                };
                changeClassList(data).then(res => {
                    if(res.code == 0) {
                        this.classList = res.data;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleCloseClass(done) {
                this.$refs['changeClassForm'].resetFields();
                this.changeClassVisible = false;
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