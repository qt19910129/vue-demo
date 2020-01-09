<template>
    <div class="classFeedback">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="请选择日期" v-model="ruleForm.date" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="teacher">
                        <el-select v-model="ruleForm.teacher" placeholder="请选择主讲老师">
                            <el-option v-for="list in teacherList" :label="list.name" :value="list.id" :key="list.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--数据表格-->
        <el-table :data="feedBackData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="content" label="评论内容" align="center"></el-table-column>
            <el-table-column prop="studentName" label="学员姓名" align="center"></el-table-column>
            <el-table-column prop="teacherName" label="主讲老师" align="center"></el-table-column>
            <el-table-column prop="createTime" label="评论时间" align="center" :formatter="dateFormat"></el-table-column>
            <el-table-column label="操作" width="" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" @click.native.prevent="deleteRowStu(scope.$index,feedBackData,scope.row.ftsId)">删除</el-button>
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
        <!--全选删除-->
        <div class="editBox">
            <el-button type="primary" @click="removeAll()">删除</el-button>
        </div>
    </div>
</template>

<script>
    import {
        getClassFeedbackList,
        getClassTeacher,
        deleteOneFeedback,
        deleteMoreFeedback
    } from "../../axios/classFeedback";
    import moment from 'moment';
    export default {
        data() {
            return {
                ruleForm: {
                    date: '',
                    teacher: '',
                },
                rules: {
                    date: [],
                    teacher: [],
                },
                feedBackData: [],  //数据
                multipleSelection:[],
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                teacherList:[],   //老师列表
            }
        },
        mounted() {
            this.getList();  //列表数据
            this.getTeacher();  //老师列表
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.date == '' && this.ruleForm.teacher == '') {
                            this.$message({
                                message: '请输入您要搜索的内容',
                                type: 'warning'
                            });
                        } else {
                            let data = {
                                'dateTime':this.ruleForm.date,
                                'teacherId':this.ruleForm.teacher,
                                'page':1,
                                'rows':10
                            };
                            getClassFeedbackList(data).then(res => {
                                if(res.code == 0) {
                                    this.records = res.data.jqGirdPage.records;
                                    this.feedBackData = res.data.jqGirdPage.rows;
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
            deleteRowStu(index, rows, ftsId) {  //删除table一行
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {
                        'ftsId':ftsId,
                    };
                    deleteOneFeedback(data).then(res => {
                        if(res.code == 0) {
                            // rows.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功'
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
                        message: '已取消删除'
                    });
                });
            },
            removeAll() {
                if(this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请选择要删除的数据',
                        type: 'warning'
                    });
                } else {
                    this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // console.log(this.multipleSelection);
                        // 传输id 逗号隔开
                        let ftsIdStr = [];
                        for(var i = 0; i < this.multipleSelection.length; i++) {
                            ftsIdStr += this.multipleSelection[i].ftsId+ ","
                        }
                        if (ftsIdStr.length > 0) {
                            ftsIdStr = ftsIdStr.substr(0, ftsIdStr.length - 1);
                        }
                        let data = {
                            'ftsIds':ftsIdStr,
                        };
                        deleteMoreFeedback(data).then(res => {
                            if(res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
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
                            message: '已取消删除'
                        });
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getList() {  //获取列表
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                };
                getClassFeedbackList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.feedBackData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            getTeacher() {  //获取老师列表
                getClassTeacher('').then(res => {
                    if(res.code == 0) {
                        this.teacherList = res.data;
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
            dateFormat(row, column, cellValue, index){  //表格日期格式化
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD");
            },
        }
    }
</script>

<style scoped lang="less">
    .classFeedback{
        .editBox{
            margin: 20px 0;
        }
    }
</style>