<template>
    <div class="addTimeTable">
        <!--返回首页-->
        <el-page-header @back="goBack" content="添加排课" title="返回首页" v-if="edit==1"></el-page-header>
        <el-page-header @back="goBack" content="编辑排课" title="返回首页" v-if="edit==2"></el-page-header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 20px;">
            <el-form-item label="排课日期" prop="classTime">
                <el-date-picker type="date" placeholder="请选择排课日期" v-model="ruleForm.classTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="选择班级" prop="changeClass">
                <el-select v-model="ruleForm.changeClass" placeholder="请选选择班级">
                    <el-option label="a班级" value="a"></el-option>
                    <el-option label="b班级" value="b"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker placeholder="请选择开始时间" v-model="ruleForm.startTime"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker placeholder="请选择结束时间" v-model="ruleForm.endTime"></el-time-picker>
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
                    classTime: '',
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
                    classTime: [
                        { type: 'date', required: true, message: '请选择排课日期', trigger: 'change' }
                    ],
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
            goBack() {  //返回首页
                this.$router.push({
                    path: '/content/pageIndex',
                })
            },
        }
    }
</script>

<style scoped lang="less">

</style>