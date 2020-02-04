<template>
    <div class="classSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="className">
                        <el-input v-model="ruleForm.className" placeholder="请输入班级名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="classState">
                        <el-select v-model="ruleForm.classState" placeholder="请选择班级状态">
                            <el-option v-for="list in statusValue" :label="list.statusValue" :value="list.statusKey" :key="list.statusKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                        <el-button @click="dataReset()">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="classSetMain">
            <!--新增-->
            <div class="classAddBox">
                <el-button type="primary" @click="goEditClass(1)">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="classSetData" border style="width: 100%;border: 1px solid #eee;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="name" label="班级名称" align="center"></el-table-column>
                <el-table-column prop="leadingTeacherName" label="班主任" width="" align="center"></el-table-column>
                <el-table-column prop="studentCount" label="学生人数" width="" align="center"></el-table-column>
                <el-table-column prop="classStatusStr" label="状态" width="" align="center">
                    <!--<template slot-scope="scope">-->
                        <!--<span type="text" v-if="scope.row.classState == 1" class="greenText">上课中</span>-->
                        <!--<span type="text" v-if="scope.row.classState == 2">已结课</span>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goSeeClass(scope.row.id)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="goEditClass(2,scope.row.id)">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="classOver(scope.row.id)" v-if="scope.row.classStatusStr == '进行中'">结课</el-button>
                        <el-button type="text" icon="el-icon-school" @click="classOn(scope.row.id)" v-if="scope.row.classStatusStr == '已结课'">开课</el-button>
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
    </div>
</template>

<script>
    import {
        getSchoolClassList,
        getClassState,
        classOver,
        classOnIt
    } from "../../axios/classSet";
    export default {
        data() {
            return {
                ruleForm: {
                    className: '',
                    classState: '',
                },
                rules: {
                    className: [],
                    classState: [],
                },
                classSetData:[],
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                statusValue:[],  //班级状态数据
            }
        },
        mounted() {
            this.getList();  //列表数据
            this.classState();  //获取班级状态
        },
        methods: {
            dataReset() {  //重置搜索
                this.$refs['ruleForm'].resetFields();
                let data = {
                    'rows':10,
                    'page':1
                };
                this.rows = 10;
                this.currentPage = 1;
                this.page = 1;
                getSchoolClassList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.classSetData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            getList() {  //获取数据列表
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                };
                getSchoolClassList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.classSetData = res.data.jqGirdPage.rows;
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
                this.rows = `${val}`;
                this.currentPage = 1;
                this.page = 1;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.getList();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.className === '' && this.ruleForm.classState === '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            this.rows = 10;
                            this.currentPage = 1;
                            this.page = 1;
                            let data = {
                                'className':this.ruleForm.className,
                                'classStatus':this.ruleForm.classState,
                                'page':1,
                                'rows':10
                            };
                            getSchoolClassList(data).then(res => {
                                if(res.code == 0) {
                                    this.records = res.data.jqGirdPage.records;
                                    this.classSetData = res.data.jqGirdPage.rows;
                                    if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
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
            goSeeClass(classId) {   //跳转查看班级
                this.$router.push({ path: `/content/details/seeClass`, query: { classId: classId }});
            },
            goEditClass(edit,classId) {  //跳转编辑班级
                this.$router.push({ path: `/content/details/editClass/${edit}`, query: { classId: classId }});
            },
            classOver(id) {  //结课弹窗
                console.log(id);
                this.$confirm('此操作将为该学员结课, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        'classId':id
                    };
                    classOver(data).then(res => {
                        if(res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '结课成功!'
                            });
                            setTimeout(function () {
                                window.location.reload();
                            },1000);
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消结课'
                    });
                });
            },
            classOn(id) {
                this.$confirm('此操作将为该学员开课, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        'classId':id
                    };
                    classOnIt(data).then(res => {
                        if(res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '开课成功!'
                            });
                            setTimeout(function () {
                                window.location.reload();
                            },1000);
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消开课'
                    });
                });
            },
            classState() {
                getClassState('').then(res => {
                    if(res.code == 0) {
                        this.statusValue = res.data;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            }
        }
    }
</script>

<style scoped lang="less">
    .classSet{
        .classAddBox{
            margin: 20px 0;
        }
    }
</style>
