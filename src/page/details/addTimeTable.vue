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
                <el-select v-model="ruleForm.changeClass" placeholder="请选选择班级" @change="pickClass">
                    <el-option v-for="list in addClass" :label="list.name" :value="list.id" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker placeholder="请选择开始时间" v-model="ruleForm.startTime" format="HH:mm" value-format="HH:mm"
                                :picker-options="{selectableRange:`00:00:00 -${ruleForm.endTime ? ruleForm.endTime+':00' : '23:59:00'}`}"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker placeholder="请选择结束时间" v-model="ruleForm.endTime" format="HH:mm" value-format="HH:mm"
                                :picker-options="{selectableRange:`${ruleForm.startTime ? ruleForm.startTime+':00' : '00:00:00'}-23:59:00`}"></el-time-picker>
            </el-form-item>
            <el-form-item label="选择讲师" prop="changeTeacher1">
                <el-select v-model="ruleForm.changeTeacher1" placeholder="请选选择讲师" @change="pickT1">
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.name" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择助教" prop="changeTeacher2">
                <el-select v-model="ruleForm.changeTeacher2" placeholder="请选选择助教" @change="pickT2">
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.name" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择教室" prop="changeClassRoom">
                <el-select v-model="ruleForm.changeClassRoom" placeholder="请选选择教室" @change="pickClassRoom">
                    <el-option v-for="list in addClassRoom" :label="list.crName" :value="list.crId" :key="list.crId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择科目" prop="changeSubject">
                <el-select v-model="ruleForm.changeSubject" placeholder="请选选择科目" @change="pickChangeSubject">
                    <el-option v-for="list in addSubject" :label="list.subject" :value="list.subject" :key="list.currId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目级别" style="padding-left: 10px;">
                <div class="tableBox">{{addLevel}}</div>
            </el-form-item>
            <el-form-item label="选择课程" style="padding-left: 10px;">
                <div class="tableBox">{{addLesson}}</div>
            </el-form-item>
            <el-form-item label="消耗课时" prop="classNum">
                <el-input v-model.number="ruleForm.classNum"></el-input>
            </el-form-item>
            <el-form-item>
                <!--新增-->
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <!--编辑-->
                <el-button type="danger" @click="removeClass" v-if="edit == 2">删除</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        getTimeTableSetList_add,
        getTimeTableSetList_save,
        getTimeTableSetList_edit,
        removeClass
    } from "../../axios/timeTableSet";
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
                pickTheClass:{},  //选中班级的数据
                pickTeacher1:{},  //选中主教
                pickTeacher2:{},  //选中助教
                pickRoom:{},  //选中教室
                pickSub:{}, //选中科目
                editCaId:-1,  //编辑时 传的id
                editDatas:{},  //编辑时 数据
                ruleForm: {
                    changeClass:'',
                    startTime:'',
                    endTime:'',
                    changeTeacher1:'',
                    changeTeacher2:'',
                    changeClassRoom:'',
                    changeSubject:'',
                    classNum:''
                },
                rules:{
                    changeClass: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    startTime: [
                        { type: 'string', required: true, message: '请选择开始时间', trigger: 'change' }
                    ],
                    endTime: [
                        { type: 'string', required: true, message: '请选择结束时间', trigger: 'change' }
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
                    classNum: [
                        { required: true, message: '请输入单次消耗课时数', trigger: 'blur' },
                        { type: 'number', message: '请输入正确的消耗课时'}
                    ],
                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
            if(this.edit == 1) {  //新增
                let dates = this.$route.query.dates;
                let data = {
                    'arrange_date':dates
                };
                getTimeTableSetList_add(data).then(res => {
                    this.addDate = res.data.arrangeDate;
                    this.addClass = res.data.keClassResults;
                    this.addTeacher = res.data.keTeacherResults;
                    this.addClassRoom = res.data.classroomResults;
                    this.addSubject = res.data.curriculumResults;
                }).catch((e) => {});
            } else if(this.edit == 2) {  //编辑
                let data = {
                    'caId':this.$route.query.caId
                };
                getTimeTableSetList_edit(data).then(res => {
                    this.addClass = res.data.keClassResults;
                    this.addTeacher = res.data.keTeacherResults;
                    this.addClassRoom = res.data.classroomResults;
                    this.addSubject = res.data.curriculumResults;
                    this.editDatas = res.data.curriculumArrangement;
                    //回显
                    let showData = res.data.curriculumArrangement;
                    let startTime = showData.arrangeBegintime + ':' + showData.arrangeBeginmin;
                    let endTime = showData.arrangeEndtime + ':' + showData.arrangeEndmin;
                    this.editCaId = showData.caId;
                    this.addDate = this.formatDate(showData.arrangeDate);
                    this.ruleForm.changeClass = showData.classId;
                    this.ruleForm.changeClassRoom = showData.crId;
                    this.ruleForm.startTime = startTime;
                    this.ruleForm.endTime = endTime;
                    this.ruleForm.changeTeacher1 = showData.teacherName;
                    this.ruleForm.changeTeacher2 = showData.assistantName;
                    this.ruleForm.changeSubject = showData.subject;
                    this.addLevel = showData.rank;
                    this.addLesson = showData.currName;
                    this.ruleForm.classNum = showData.consumptionHours;
                }).catch((e) => {});
            }

        },
        methods: {
            submitForm(formName) {  //提交保存按钮
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {};
                        if(this.edit == 1) {
                            //传输的数据
                            data = { //新增
                                'arrangeDate':this.$route.query.dates,
                                'arrangeBegintime':this.ruleForm.startTime,
                                'arrangeEndtime':this.ruleForm.endTime,
                                'className':this.pickTheClass.name,
                                'classId':this.pickTheClass.id,
                                'teacherId':this.pickTeacher1.id,
                                'teacherName':this.pickTeacher1.name,
                                'assistantId':this.pickTeacher2.id,
                                'assistantName':this.pickTeacher2.name,
                                'crId':this.pickRoom.crId,
                                'crName':this.pickRoom.crName,
                                'subject':this.pickSub.subject,
                                'rank':this.pickSub.rank,
                                'currId':this.pickSub.currId,
                                'currName':this.pickSub.currName,
                                'consumptionHours':this.ruleForm.classNum
                            };
                        } else if(this.edit == 2) {  //编辑
                            if(this.pickTheClass.name == undefined) {
                                this.pickTheClass.name = this.editDatas.className;
                            }
                            if(this.pickTheClass.id == undefined) {
                                this.pickTheClass.id = this.editDatas.classId;
                            }
                            if(this.pickTeacher1.id == undefined) {
                                this.pickTeacher1.id = this.editDatas.teacherId;
                            }
                            if(this.pickTeacher1.name == undefined) {
                                this.pickTeacher1.name = this.editDatas.teacherName;
                            }
                            if(this.pickTeacher2.id == undefined) {
                                this.pickTeacher2.id = this.editDatas.assistantId;
                            }
                            if(this.pickTeacher2.name == undefined) {
                                this.pickTeacher2.name = this.editDatas.assistantName;
                            }
                            if(this.pickRoom.crId == undefined) {
                                this.pickRoom.crId = this.editDatas.crId;
                            }
                            if(this.pickRoom.crName == undefined) {
                                this.pickRoom.crName = this.editDatas.crName;
                            }
                            if(this.pickSub.subject == undefined) {
                                this.pickSub.subject = this.editDatas.subject;
                            }
                            if(this.pickSub.rank == undefined) {
                                this.pickSub.rank = this.editDatas.rank;
                            }
                            if(this.pickSub.currId == undefined) {
                                this.pickSub.currId = this.editDatas.currId;
                            }
                            if(this.pickSub.currName == undefined) {
                                this.pickSub.currName = this.editDatas.currName;
                            }

                            //传输的数据
                            data = {
                                'arrangeDate':this.addDate,
                                'arrangeBegintime':this.ruleForm.startTime,
                                'arrangeEndtime':this.ruleForm.endTime,
                                'className':this.pickTheClass.name,
                                'classId':this.pickTheClass.id,
                                'teacherId':this.pickTeacher1.id,
                                'teacherName':this.pickTeacher1.name,
                                'assistantId':this.pickTeacher2.id,
                                'assistantName':this.pickTeacher2.name,
                                'crId':this.pickRoom.crId,
                                'crName':this.pickRoom.crName,
                                'subject':this.pickSub.subject,
                                'rank':this.pickSub.rank,
                                'currId':this.pickSub.currId,
                                'currName':this.pickSub.currName,
                                'caId':this.editCaId,
                                'consumptionHours':this.editDatas.classNum
                            };
                        }
                        // console.log(data,'传输数据');
                        let that = this;
                        getTimeTableSetList_save(data).then(res => {
                            if(res.code == 0) {
                                this.editSuccess();
                                that.$refs[formName].resetFields();
                                this.addLevel = '';
                                this.addLesson = '';
                                setTimeout(function () {
                                    history.back(-1);
                                },1000);
                            } else {
                                this.error();
                            }
                        }).catch((e) => {});
                    } else {
                        this.error();
                        return false;
                    }
                });
            },
            resetForm() {  //取消 新增为重置 编辑为返回上一页
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
            pickChangeSubject(vId) {  //获取选择科目后面的数据
                let obj = {};
                obj = this.addSubject.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.subject == vId) {
                        this.addLevel = item.rank;
                        this.addLesson = item.currName;
                        this.pickSub = item;
                    }
                    return item.subject === vId;//筛选出匹配数据
                });
            },
            pickClass(vId) {  //选择班级
                let obj = {};
                obj = this.addClass.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.id == vId) {
                        this.pickTheClass = item;
                    }
                });
            },
            pickT1(vId) {  //选择主教
                let obj = {};
                obj = this.addTeacher.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.name == vId) {
                        this.pickTeacher1 = item;
                    }
                });
            },
            pickT2(vId) {  //选择助教
                let obj = {};
                obj = this.addTeacher.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.name == vId) {
                        this.pickTeacher2 = item;
                    }
                });
            },
            pickClassRoom(vId) {
                let obj = {};
                obj = this.addClassRoom.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.crId == vId) {
                        this.pickRoom = item;
                    }
                });
            },
            cancel() {  //取消输入
                this.$message('已取消输入');
            },
            success() {  //创建成功
                this.$message({
                    message: '创建排课信息成功，将自动返回上一页',
                    type: 'success'
                });
            },
            removeSuccess() {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            removeError() {
                this.$message.error('删除失败，请稍后再试');
            },
            error() {  //创建失败
                this.$message.error('网络异常，请稍后再试');
            },
            editCancel() {  //编辑取消输入
                this.$message('已取消修改,将自动返回上一页');
            },
            editSuccess() {  //修改成功
                this.$message({
                    message: '修改排课信息成功，将自动返回上一页',
                    type: 'success'
                });
            },
            formatDate(value) {  //日期格式化
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + MM + '-' + d;
            },
            removeClass() {  //删除排课信息
                let data = {
                    'caId':this.$route.query.caId
                };
                this.$confirm('此操作将删除此排课信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeClass(data).then(res => {
                        if(res.code == 0) {
                            this.removeSuccess();
                            setTimeout(function () {
                                history.back(-1);
                            },1000);
                        } else {
                            this.removeError();
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