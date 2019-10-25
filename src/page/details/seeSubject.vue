<template>
    <div class="seeSubject">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            <el-breadcrumb-item>班级详情</el-breadcrumb-item>
            <el-breadcrumb-item>班级科目表详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="main">
            <!--科目列表-->
            <el-table :data="subjectData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column prop="name" label="科目名称" width="" align="center"></el-table-column>
                <el-table-column prop="stuNum" label="学生数" width="" align="center"></el-table-column>
                <el-table-column prop="allNum" label="课时" width="" align="center"></el-table-column>
                <el-table-column prop="consume" label="课耗" width="" align="center"></el-table-column>
                <el-table-column prop="noConsume" label="未消耗课时" width="" align="center"></el-table-column>
            </el-table>
            <div class="tit">
                <span>科目课表</span>
                <el-button type="text" icon="el-icon-document-add" @click="classTimeVisible = true" class="addAll">批量添加课时</el-button>
                <el-button type="text" icon="el-icon-download" class="fr">导出</el-button>
            </div>
            <el-table :data="detailData" border style="width: 100%;border: 1px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="classTime" label="上课时间" width="200" align="center"></el-table-column>
                <el-table-column prop="teacher1" label="讲师" width="" align="center"></el-table-column>
                <el-table-column prop="teacher2" label="助教" width="" align="center"></el-table-column>
                <el-table-column prop="classRoom" label="教室" width="" align="center"></el-table-column>
                <el-table-column prop="noSign" label="未签人数" width="" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="text" class="win100">{{scope.row.noSign.length}}</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <div v-for="a in scope.row.noSign">
                                    <el-dropdown-item>{{a.name}}</el-dropdown-item>
                                </div>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <el-table-column prop="className" label="课程名称" width="" align="center"></el-table-column>
                <el-table-column label="操作" width="140" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" class="down">导出明细</el-button>
        </div>

        <!--添加课时弹窗-->
        <el-dialog title="添加课时" :visible.sync="classTimeVisible">
            <el-form :model="addClassTimeForm" :rules="addClassTimeRules" ref="addClassTimeForm">
                <el-form-item label="开始月份" prop="startMonth">
                    <el-date-picker v-model="addClassTimeForm.startMonth" type="month" placeholder="请选择开始月份"></el-date-picker>
                </el-form-item>
                <el-form-item label="周期规律" prop="weeks">
                    <el-checkbox-group v-model="addClassTimeForm.weeks">
                        <el-checkbox label="每周一" name="type"></el-checkbox>
                        <el-checkbox label="每周二" name="type"></el-checkbox>
                        <el-checkbox label="每周三" name="type"></el-checkbox>
                        <el-checkbox label="每周四" name="type"></el-checkbox>
                        <el-checkbox label="每周五" name="type"></el-checkbox>
                        <el-checkbox label="每周六" name="type"></el-checkbox>
                        <el-checkbox label="每周日" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="选择讲师" prop="teacher1">
                    <el-select v-model="addClassTimeForm.teacher1" placeholder="请选择讲师">
                        <el-option label="老师1" value="1"></el-option>
                        <el-option label="老师2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择助教" prop="teacher2">
                    <el-select v-model="addClassTimeForm.teacher2" placeholder="请选择助教">
                        <el-option label="助教1" value="1"></el-option>
                        <el-option label="助教2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择教室" prop="classRoom">
                    <el-select v-model="addClassTimeForm.classRoom" placeholder="请选择教室">
                        <el-option label="教室1" value="1"></el-option>
                        <el-option label="教室2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程级别" prop="level">
                    <el-select v-model="addClassTimeForm.level" placeholder="请选择课程级别">
                        <el-option label="级别1" value="1"></el-option>
                        <el-option label="级别2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择课程" prop="lesson">
                    <el-select v-model="addClassTimeForm.lesson" placeholder="请选择课程">
                        <el-option label="课程1" value="1"></el-option>
                        <el-option label="课程2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排课次数" prop="classNum">
                    <el-input v-model="addClassTimeForm.classNum" placeholder="请输入排课次数"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="reClassTimeForm('addClassTimeForm')" class="btns">取 消</el-button>
                <el-button type="primary" @click="submitClassTimeForm('addClassTimeForm')" class="btns">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subjectData: [  //科目列表数据
                    {
                        name: '数学',
                        readyNum:4,
                        stuNum:20,
                        allNum:40,
                        consume:30,
                        noConsume:10
                    }
                ],
                detailData: [
                    {
                        classTime:'2019-01-05   09:00-10:00',
                        teacher1:'王老师',
                        teacher2:'李老师',
                        classRoom:'A教室',
                        noSign:[
                            {name:'学生1'},
                            {name:'学生2'},
                            {name:'学生3'},
                            {name:'学生4'},
                            {name:'学生5'}
                        ],
                        className:'语文',
                    },
                    {
                        classTime:'2019-01-05   09:00-10:00',
                        teacher1:'王老师',
                        teacher2:'李老师',
                        classRoom:'A教室',
                        noSign:[
                            {name:'学生6'},
                            {name:'学生7'},
                            {name:'学生8'},
                            {name:'学生9'},
                            {name:'学生0'}
                        ],
                        className:'语文',
                    }
                ],
                classTimeVisible:false,  //添加课时弹窗
                addClassTimeForm: {  //添加课时form
                    startMonth:'',
                    weeks:[],
                    teacher1:'',
                    teacher2:'',
                    classRoom:'',
                    level:'',
                    lesson:'',
                    classNum:''
                },
                addClassTimeRules: {  //添加课时rule
                    startMonth: [
                        { type: 'date', required: true, message: '请选择开始月份', trigger: 'change' }
                    ],
                    weeks: [
                        { type: 'array', required: true, message: '请选择周期规律', trigger: 'change' }
                    ],
                    teacher1: [
                        { required: true, message: '请选择讲师', trigger: 'change' },
                    ],
                    teacher2: [
                        { required: true, message: '请选择助教', trigger: 'change' },
                    ],
                    classRoom: [
                        { required: true, message: '请选择教室', trigger: 'change' },
                    ],
                    level: [
                        { required: true, message: '请选择课程级别', trigger: 'change' },
                    ],
                    lesson: [
                        { required: true, message: '请选择课程', trigger: 'change' },
                    ],
                    classNum: [
                        { required: true, message: '请输入排课次数', trigger: 'blur' },
                    ],
                }
            }
        },
        methods:{
            reClassTimeForm(formName) {   //添加课时弹窗取消
                this.classTimeVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitClassTimeForm(formName) {   //签约保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.classTimeVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.classTimeVisible = true;
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .seeSubject{
        .main{
            background: #fff;
            padding: 20px;
            margin-top: 20px;
        }
        .tit{
            font-size: 18px;
            line-height: 18px;
            margin: 20px 0;
        }
        .el-button{
            padding: 0;
        }
        .addAll{
            position: relative;
            top: -2px;
            margin-left: 10px;
        }
        .down{
            padding: 12px 20px;
            margin-top: 20px;
        }
        .el-dropdown{
            width: 100%;
        }
        .win100{
            width: 100%;
        }
        .btns{
            padding: 12px 20px;
        }
    }
</style>