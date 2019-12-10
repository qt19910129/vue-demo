<template>
    <div class="addTimeTable">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">排课管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>批量排课</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 20px;">
            <el-form-item label="选择班级" prop="changeClass">
                <el-select v-model="ruleForm.changeClass" placeholder="请选选择班级">
                    <el-option label="a班级" value="a"></el-option>
                    <el-option label="b班级" value="b"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="changeMonth">
                <el-date-picker type="date" placeholder="请选择排课日期" v-model="ruleForm.changeMonth"></el-date-picker>
            </el-form-item>
            <el-form-item label="周期规律" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="每周一" name="type"></el-checkbox>
                    <el-checkbox label="每周二" name="type"></el-checkbox>
                    <el-checkbox label="每周三" name="type"></el-checkbox>
                    <el-checkbox label="每周四" name="type"></el-checkbox>
                    <el-checkbox label="每周五" name="type"></el-checkbox>
                    <el-checkbox label="每周六" name="type"></el-checkbox>
                    <el-checkbox label="每周日" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择讲师" prop="changeTeacher1">
                <el-select v-model="ruleForm.changeTeacher1" placeholder="请选选择讲师">
                    <el-option label="a老师" value="c"></el-option>
                    <el-option label="b老师" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择助教" prop="changeTeacher2">
                <el-select v-model="ruleForm.changeTeacher2" placeholder="请选选择助教">
                    <el-option label="a老师" value="c"></el-option>
                    <el-option label="b老师" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择教室" prop="changeClassRoom">
                <el-select v-model="ruleForm.changeClassRoom" placeholder="请选选择教室">
                    <el-option label="a教室" value="c"></el-option>
                    <el-option label="b教室" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择科目" prop="changeSubject">
                <el-select v-model="ruleForm.changeSubject" placeholder="请选选择科目">
                    <el-option label="a科目" value="c"></el-option>
                    <el-option label="b科目" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目级别" prop="changeLevel">
                <el-select v-model="ruleForm.changeLevel" placeholder="请选选择级别">
                    <el-option label="a级别" value="c"></el-option>
                    <el-option label="b级别" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择课程" prop="changeLesson">
                <el-select v-model="ruleForm.changeLesson" placeholder="请选选择课程">
                    <el-option label="a课程" value="c"></el-option>
                    <el-option label="b课程" value="d"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排课次数" prop="timeNum">
                <el-input v-model="ruleForm.timeNum"></el-input>
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
    export default {
        data() {
            return {
                ruleForm: {
                    changeClass:'',
                    changeMonth:'',
                    changeTeacher1:'',
                    changeTeacher2:'',
                    changeClassRoom:'',
                    changeSubject:'',
                    changeLevel:'',
                    changeLesson:'',
                    type:[],
                    timeNum:'',
                },
                rules:{
                    changeClass: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    changeMonth: [
                        { type: 'date', required: true, message: '请选择开始月份', trigger: 'change' }
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
                    type: [
                        { type: 'array', required: true, message: '请选择周期规律', trigger: 'change' }
                    ],
                    timeNum: [
                        { required: true, message: '请输入排课次数', trigger: 'blur' },
                    ],
                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
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
        }
    }
</script>

<style scoped lang="less">

</style>