<template>
    <div class="subjectSet">
        <!--新增-->
        <div class="subjectAddBox">
            <el-button type="primary" @click="addSub()">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="subjectSetData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column type="index" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="科目" align="center"></el-table-column>
            <el-table-column prop="describe" label="科目说明" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center" prop="isAll">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="editSub(scope.row.id)">编辑</el-button>
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
        <!--新增，编辑弹窗-->
        <el-dialog :title="editTitle" :visible.sync="subjectVisible" class="subjectAlert" :before-close="handleClose">
            <el-form :model="subjectForm" :rules="subjectRules" ref="subjectForm">
                <el-form-item label="科目名称" prop="name">
                    <el-input v-model="subjectForm.name" placeholder="请输入科目名称"></el-input>
                </el-form-item>
                <el-form-item label="科目编号" prop="num">
                    <el-input v-model="subjectForm.num" placeholder="请输入科目编号"></el-input>
                </el-form-item>
                <el-form-item label="科目说明" prop="explain">
                    <el-input  v-model="subjectForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入科目说明" :maxlength="120"></el-input>
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
    import {
        getSubjectList,
        addSubject,
        editShow,
        editSave
    } from "../../axios/subjectSet";
    export default {
        data() {
            return {
                subjectSetData:[],  //数据
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
                },
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                editTitle:'',  //修改或者新增标题
                id:-1,  //编辑的id
            }
        },
        mounted() {
            this.getList();  //列表数据
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
                        if(this.editTitle == '新增科目') {
                            let data = {
                                'name':this.subjectForm.name,
                                'pNumber':'kc',
                                'describe':this.subjectForm.explain,
                                'number':this.subjectForm.num,
                            };
                            addSubject(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.subjectVisible = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        } else if(this.editTitle == '编辑科目') {
                            let data = {
                                'name':this.subjectForm.name,
                                'id':this.id,
                                'describe':this.subjectForm.explain,
                                'number':this.subjectForm.num,
                            };
                            editSave(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.subjectVisible = false;
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
                        this.subjectVisible = true;
                        return false;
                    }
                });
            },
            getList() {   //列表数据
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                    'number':'kc'
                };
                let that = this;
                getSubjectList(data).then(res => {
                    if(res.code == 0) {
                        that.records = res.data.jqGirdPage.records;
                        that.subjectSetData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            that.pageValue = true;
                        }
                    } else {
                        that.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.rows = `${val}`;
                this.currentPage = 1;
                this.page = 1;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.getList();
            },
            addSub() {  //新增
                this.editTitle = '新增科目';
                this.subjectVisible = true;
            },
            editSub(id) {  //编辑科目
                this.editTitle = '编辑科目';
                this.subjectVisible = true;
                this.id = id;
                let data = {
                    'id':id
                };
                editShow(data).then(res => {
                    if(res.code == 0) {
                        this.subjectForm.name = res.data.name;
                        this.subjectForm.num = res.data.number;
                        this.subjectForm.explain = res.data.describe;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleClose(done) {
                this.$refs['subjectForm'].resetFields();
                this.subjectVisible = false;
            }
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
