<template>
    <div class="levelSet">
        <!--新增-->
        <div class="levelAddBox">
            <el-button type="primary" @click="addLevel()">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="levelSetData" border style="width: 100%;border: 1px solid #eee;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column type="index" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="课程级别" align="center"></el-table-column>
            <el-table-column prop="describe" label="级别说明" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center" prop="isAll">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="editLevel(scope.row.id)">编辑</el-button>
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
        <el-dialog :title="editTitle" :visible.sync="levelVisible" class="levelAlert" :before-close="handleClose">
            <el-form :model="levelForm" :rules="levelRules" ref="levelForm">
                <el-form-item label="级别名称" prop="name">
                    <el-input v-model="levelForm.name" placeholder="请输入级别名称"></el-input>
                </el-form-item>
                <el-form-item label="级别编号" prop="num">
                    <el-input v-model="levelForm.num" placeholder="请输入级别编号"></el-input>
                </el-form-item>
                <el-form-item label="级别说明" prop="explain">
                    <el-input  v-model="levelForm.explain" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入级别说明" :maxlength="120"></el-input>
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
    import {
        getLevelList,
        saveLevel,
        showLevel,
        saveEdit
    } from "../../axios/levelSet";
    export default {
        data() {
            return {
                levelSetData:[],  //数据
                levelVisible:false,   //新增编辑弹窗
                levelForm: {
                    name:'',
                    num:'',
                    explain:''
                },
                levelRules: {
                    name: [
                        { required: true, message: '请输入级别名称', trigger: 'blur', pattern: '[^ \x22]+' },
                    ],
                    num: [
                        { required: true, message: '请输入级别编号', trigger: 'blur', pattern: '[^ \x22]+' },
                    ],
                    explain: [
                        { required: true, message: '请输入级别说明', trigger: 'blur', pattern: '[^ \x22]+' },
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
                        if(this.editTitle == '新增级别') {
                            let data = {
                                'name':this.levelForm.name,
                                'pNumber':'dj',
                                'describe':this.levelForm.explain,
                                'number':this.levelForm.num,
                            };
                            saveLevel(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.levelVisible = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        } else if(this.editTitle == '编辑级别') {
                            let data = {
                                'name':this.levelForm.name,
                                'id':this.id,
                                'describe':this.levelForm.explain,
                                'number':this.levelForm.num,
                            };
                            saveEdit(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.levelVisible = false;
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
                        this.levelVisible = true;
                        return false;
                    }
                });
            },
            getList() {  //获取数据列表
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                    'number':'dj'
                };
                getLevelList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.levelSetData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.page = 1;
                this.rows = `${val}`;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.getList();
            },
            addLevel() {  //新增
                this.levelVisible = true;
                this.editTitle = '新增级别';
            },
            editLevel(id) {  //修改 回显
                this.id = id;
                this.levelVisible = true;
                this.editTitle = '编辑级别';
                let data = {
                    'id':id
                };
                showLevel(data).then(res => {
                    if(res.code == 0) {
                        this.levelForm.name = res.data.name;
                        this.levelForm.num = res.data.number;
                        this.levelForm.explain = res.data.describe;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleClose(done) {
                this.$refs['levelForm'].resetFields();
                this.levelVisible = false;
            }
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
