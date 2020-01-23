<template>
    <div class="courseSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" class="demo-form-inline">
            <el-row>
                <el-col :span="5">
                    <el-form-item>
                        <el-input v-model="ruleForm.courseName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-select v-model="ruleForm.subject" placeholder="请选择科目">
                            <el-option v-for="list in kmList" :label="list.name" :value="list.name" :key="list.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        <el-select v-model="ruleForm.level" placeholder="请选择级别">
                            <el-option v-for="list in jbList" :label="list.name" :value="list.name" :key="list.id"></el-option>
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
                <el-button type="primary" @click="saveData()">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="courseSetData" border style="width: 100%;border: 1px solid #eee;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="subject" label="科目" align="center"></el-table-column>
                <el-table-column prop="rank" label="课程级别" align="center"></el-table-column>
                <el-table-column prop="currName" label="课程名称" width="" align="center"></el-table-column>
                <el-table-column prop="currExplain" label="课程说明" width="" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.currExplain == ''" class="color999">暂无课程说明</span>
                        <span v-else>{{scope.row.currExplain}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editCrouse(scope.row.currId)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template>
                <el-pagination
                        align="right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
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
        <!--新增，编辑弹窗-->
        <el-dialog title="新增课程" :visible.sync="courseVisible" class="courseAlert" :before-close="handleClose">
            <el-form :model="courseForm" :rules="courseRules" ref="courseForm">
                <el-form-item label="选择科目" prop="subject">
                    <el-select v-model="courseForm.subject" placeholder="请选择科目">
                        <el-option v-for="list in kmList" :label="list.name" :value="list.name" :key="list.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择级别" prop="level">
                    <el-select v-model="courseForm.level" placeholder="请选择级别">
                        <el-option v-for="list in jbList" :label="list.name" :value="list.name" :key="list.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名称" prop="name">
                    <el-input v-model="courseForm.name" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程说明" prop="explain">
                    <el-input  v-model="courseForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入课程说明" :maxlength="120"></el-input>
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
    import {
        getCourseList,
        addCourse,
        editCourse,
        editSave
    } from "../../axios/courseSet";
    export default {
        data() {
            return {
                ruleForm: {  //搜索数据
                    courseName: '',
                    subject: '',
                    level:'',
                },
                courseSetData:[],  //数据
                kmList:[], //科目列表
                jbList:[],  //级别列表
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
                },
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                edit:-1,  //1新增  2编辑
                currId:0,  //课程id
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
                getCourseList(data).then(res => {
                    if(res.code == 0) {
                        this.courseSetData = res.data.jQGirdPage.rows;
                        this.kmList = res.data.kmList;
                        this.jbList = res.data.jbList;
                        this.records = res.data.jQGirdPage.records;
                        if(res.data.jQGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.courseName == '' && this.ruleForm.level == '' && this.ruleForm.subject == '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            let data = {
                                'currName':this.ruleForm.courseName,
                                'rank':this.ruleForm.level,
                                'subject':this.ruleForm.subject,
                                'page':this.page,
                                'rows':this.rows
                            };
                            getCourseList(data).then(res => {
                                if(res.code == 0) {
                                    this.courseSetData = res.data.jQGirdPage.rows;
                                    this.records = res.data.jQGirdPage.records;
                                    if(res.data.jQGirdPage.records <= 10) {  //小于10条时 隐藏分页
                                        this.pageValue = true;
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
                        if(this.edit == 1) {  //新增
                            console.log(this.courseForm,'新增');
                            let data = {
                                'subject':this.courseForm.subject,
                                'rank':this.courseForm.level,
                                'currName':this.courseForm.name,
                                'currExplain':this.courseForm.explain
                            };
                            addCourse(data).then(res => {
                                if(res.code == 0) {
                                    this.$refs[formName].resetFields();
                                    this.courseVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '新增成功'
                                    });
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        } else if(this.edit == 2) {  //编辑
                            let data = {
                                'currId':this.currId,
                                'subject':this.courseForm.subject,
                                'rank':this.courseForm.level,
                                'currName':this.courseForm.name,
                                'currExplain':this.courseForm.explain
                            };
                            editSave(data).then(res => {
                                if(res.code == 0) {
                                    this.$refs[formName].resetFields();
                                    this.courseVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    });
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
                        this.courseVisible = true;
                        return false;
                    }
                });
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.rows = `${val}`;
                this.currentPage = 1;
                this.page = 1;
                let data = {
                    'page':this.page,
                    'rows':this.rows
                };
                getCourseList(data).then(res => {
                    if(res.code == 0) {
                        this.courseSetData = res.data.jQGirdPage.rows;
                        this.records = res.data.jQGirdPage.records;
                        if(res.data.jQGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                let data = {
                    'page':this.page,
                    'rows':this.rows
                };
                getCourseList(data).then(res => {
                    if(res.code == 0) {
                        this.courseSetData = res.data.jQGirdPage.rows;
                        this.records = res.data.jQGirdPage.records;
                        if(res.data.jQGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            saveData() {  //新增按钮
                this.courseVisible = true;
                this.edit = 1;
            },
            editCrouse(currId) {  //编辑按钮
                this.courseVisible = true;
                this.edit = 2;
                this.currId = currId;
                let data = {
                    'currId':currId
                };
                editCourse(data).then(res => {
                    if(res.code == 0) {
                        this.courseForm.subject = res.data.cmResult.subject;
                        this.courseForm.level = res.data.cmResult.rank;
                        this.courseForm.name = res.data.cmResult.currName;
                        this.courseForm.explain = res.data.cmResult.currExplain;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleClose(done) {
                this.$refs['courseForm'].resetFields();
                this.courseVisible = false;
            }
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
