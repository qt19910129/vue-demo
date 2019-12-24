<template>
    <div class="addTimeTable">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">排课管理</a></el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 1">添加排课</el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 2">编辑排课</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 20px;">
            <el-form-item label="排课日期" style="padding-left: 10px;">
                <div class="tableBox">{{addDate}}</div>
                <!--<el-date-picker type="date" placeholder="请选择排课日期" v-model="ruleForm.classTime"></el-date-picker>-->
            </el-form-item>
            <el-form-item label="选择班级" prop="changeClass">
                <el-select v-model="ruleForm.changeClass" placeholder="请选选择班级">
                    <el-option v-for="list in addClass" :label="list.name" :value="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker placeholder="请选择开始时间" v-model="ruleForm.startTime" format="HH:mm"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker placeholder="请选择结束时间" v-model="ruleForm.endTime" format="HH:mm"></el-time-picker>
            </el-form-item>
            <el-form-item label="选择讲师" prop="changeTeacher1">
                <el-select v-model="ruleForm.changeTeacher1" placeholder="请选选择讲师">
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择助教" prop="changeTeacher2">
                <el-select v-model="ruleForm.changeTeacher2" placeholder="请选选择助教">
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择教室" prop="changeClassRoom">
                <el-select v-model="ruleForm.changeClassRoom" placeholder="请选选择教室">
                    <el-option v-for="list in addClassRoom" :label="list.crName" :value="list.crId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择科目" prop="changeSubject">
                <el-select v-model="ruleForm.changeSubject" placeholder="请选选择科目" @change="pickChangeSubject">
                    <el-option v-for="list in addSubject" :label="list.subject" :value="list.subject"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目级别" prop="changeLevel">
                <div class="tableBox">{{addLevel}}</div>
                <!--<el-select v-model="ruleForm.changeLevel" placeholder="请选选择级别">-->
                    <!--<el-option v-for="list in addSubject" :label="list.rank" :value="list.rank"></el-option>-->
                <!--</el-select>-->
            </el-form-item>
            <el-form-item label="选择课程" prop="changeLesson">
                <div class="tableBox">{{addLesson}}</div>
                <!--<el-select v-model="ruleForm.changeLesson" placeholder="请选选择课程">-->
                    <!--<el-option v-for="list in addSubject" :label="list.currName" :value="list.currId"></el-option>-->
                <!--</el-select>-->
            </el-form-item>
            <el-form-item>
                <!--新增-->
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <!--编辑-->
                <el-button type="danger" @click="resetForm('ruleForm')" v-if="edit == 2">删除</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        getTimeTableSetList_add
    } from "../../axios/index";
    export default {
        data() {
            return {
                addDate:'',  //排课时间
                addClass:[],  //选择班级数据
                addTeacher:[],// 选择讲师，助教
                addClassRoom:[], //选择教室
                addSubject:[], //选择科目
                addLevel:'', //添加科目级别
                addLesson:'', //添加选择课程
                ruleForm: {
                    changeClass:'',
                    startTime:'',
                    endTime:'',
                    changeTeacher1:'',
                    changeTeacher2:'',
                    changeClassRoom:'',
                    changeSubject:'',
                    changeLevel:'',
                    changeLesson:''
                },
                rules:{
                    changeClass: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    startTime: [
                        { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    changeTeacher1: [
                        { required: true, message: '请选择讲师', trigger: 'change' }
                    ],
                    changeTeacher2: [
                        { required: true, message: '请选择助教', trigger: 'change' }
                    ],
                    changeClassRoom: [
                        { required: true, message: '请选择教室', trigger: 'change' }
                    ],
                    changeSubject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                    changeLevel: [
                        { required: true, message: '请选择科目级别', trigger: 'change' }
                    ],
                    changeLesson: [
                        { required: true, message: '请选择课程', trigger: 'change' }
                    ],
                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
            let dates = this.$route.query.dates;
            let data = {
                'arrange_date':dates
            };
            getTimeTableSetList_add(data).then(res => {
                console.log(res.data);
                this.addDate = res.data.arrangeDate;
                this.addClass = res.data.keClassResults;
                this.addTeacher = res.data.keTeacherResults;
                this.addClassRoom = res.data.classroomResults;
                this.addSubject = res.data.curriculumResults;
            }).catch((e) => {});
        },
        methods: {
            submitForm(formName) {  //提交保存按钮
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {  //取消
                this.$refs[formName].resetFields();
            },
            pickChangeSubject(vId){
                let obj = {};
                obj = this.addSubject.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.subject == vId) {
                        console.log(item);
                        this.addLevel = item.rank;
                        this.addLesson = item.currName;
                    }
                    return item.subject === vId;//筛选出匹配数据
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .addTimeTable{
        .tableBox{
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            float: left;
            padding: 0 15px;
            font-size: 14px;
            color: #606266;
            width: 40%;
            box-sizing: border-box;
            height: 40px;
        }
    }
</style>