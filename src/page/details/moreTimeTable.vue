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
                <el-select v-model="ruleForm.changeClass" placeholder="请选选择班级" @change="pickClass" filterable clearable>
                    <el-option v-for="list in addClass" :label="list.name" :value="list.id" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="changeMonth">
                <el-date-picker type="date" placeholder="请选择排课日期" v-model="ruleForm.changeMonth"></el-date-picker>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-time-picker placeholder="请选择开始时间" v-model="ruleForm.startTime" format="HH:mm" value-format="HH:mm"
                                :picker-options="{selectableRange:`00:00:00 -${ruleForm.endTime ? ruleForm.endTime+':00' : '23:59:00'}`}"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-time-picker placeholder="请选择结束时间" v-model="ruleForm.endTime" format="HH:mm" value-format="HH:mm"
                                :picker-options="{selectableRange:`${ruleForm.startTime ? ruleForm.startTime+':00' : '00:00:00'}-23:59:00`}"></el-time-picker>
            </el-form-item>
            <el-form-item label="周期规律" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="每周一" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周二" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周三" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周四" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周五" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周六" name="type" border size="small"></el-checkbox>
                    <el-checkbox label="每周日" name="type" border size="small"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择助教" prop="changeTeacher2">
                <el-select v-model="ruleForm.changeTeacher2" placeholder="请选选择助教" @change="pickT2" filterable clearable>
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.id" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择讲师" prop="changeTeacher1">
                <el-select v-model="ruleForm.changeTeacher1" placeholder="请选选择讲师" @change="pickT1" filterable clearable>
                    <el-option v-for="list in addTeacher" :label="list.name" :value="list.id" :key="list.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择教室" prop="changeClassRoom">
                <el-select v-model="ruleForm.changeClassRoom" placeholder="请选选择教室" @change="pickClassRoom" filterable clearable>
                    <el-option v-for="list in addClassRoom" :label="list.crName" :value="list.crId" :key="list.crId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择科目" prop="changeSubject">
                <el-select v-model="ruleForm.changeSubject" placeholder="请选选择科目" @change="pickChangeSubject" filterable clearable>
                    <el-option v-for="list in addSubject" :label="list.subject" :value="list.subject" :key="list.currId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目级别" prop="changeLevel">
                <el-select v-model="ruleForm.changeLevel" placeholder="请选选择科目级别" @change="pickChangeLevel" filterable clearable>
                    <el-option v-for="list in addLevel" :label="list.rank" :value="list.rank" :key="list.currId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择课程" prop="changeLesson">
                <el-select v-model="ruleForm.changeLesson" placeholder="请选选择课程" @change="pickChangeLesson" filterable clearable>
                    <el-option v-for="list in addLesson" :label="list.currName" :value="list.currName" :key="list.currId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排课次数" prop="timeNum">
                <el-input v-model.number.trim="ruleForm.timeNum"></el-input>
            </el-form-item>
            <el-form-item label="消耗课时" prop="classNum">
                <el-input v-model.trim="ruleForm.classNum"></el-input>
            </el-form-item>
            <el-form-item>
                <!--新增-->
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        curriculumArrangement_plAdd,
        plSave,
        lessonChange,
        rankChange,
        selectRepeatPL
    } from "../../axios/timeTableSet";
    export default {
        data() {
            var checkNum = (rule, value, callback) => {
                if (value == null || value == '' || value == undefined) {
                    callback(new Error("请输入消耗课时"));
                } else if(isNaN(value)) {
                    callback(new Error("请输入正确的消耗课时"));
                } else if (value * 1 < 0) {//引入methods中封装的检查手机格式的方法
                    callback(new Error("消耗课时数不能小于0"));
                } else if (value * 1 > 10.5) {//引入methods中封装的检查手机格式的方法
                    callback(new Error("消耗课时数不能大于10.5"));
                }  else {
                    callback();
                }
            };
            return {
                addClass:[],  //选择班级数据
                addTeacher:[],  //选择主教数据
                addClassRoom:[],  //选择教室数据
                addSubject:[], //选择科目数据
                addLevel:[],  //选择级别数据
                addLesson:[],  //选择课程数据
                pickSub:'',  //选中的科目全数据
                pickTheClass:{},  //选中班级的数据
                pickTeacher1:{},  //选中主教
                pickTeacher2:{},  //选中助教
                pickRoom:{},  //选中教室
                ruleForm: {
                    changeClass:'',
                    changeMonth:'',
                    startTime:'',
                    endTime:'',
                    changeTeacher1:'',
                    changeTeacher2:'',
                    changeClassRoom:'',
                    changeSubject:'',
                    changeLevel:'',
                    changeLesson:'',
                    type:[],
                    timeNum:'',
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
                        { type: 'number', message: '请输入正确的排课次数'}
                    ],
                    classNum: [
                        { required: true, validator: checkNum, trigger: 'change' },

                    ],
                },
                currId:-1,
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            curriculumArrangement_plAdd().then(res => {
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
                        //批量排课 传输数据接口
                        let key = this.ruleForm.classNum.split("");
                        key = key.filter(s => {
                            return s == ".";
                        });
                        if (key.length == 1) {
                            this.ruleForm.classNum = Math.round(this.ruleForm.classNum* 10) / 10;
                        }
                        let data = {
                            'curriculum_timeStart':this.formatDate(this.ruleForm.changeMonth),
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
                            'subject':this.ruleForm.changeSubject,
                            'rank':this.ruleForm.changeLevel,
                            'currId':this.currId,
                            'currName':this.ruleForm.changeLesson,
                            'curriculumCount':this.ruleForm.timeNum,
                            'period':this.weekChange(this.ruleForm.type),
                            'consumptionHours':this.ruleForm.classNum
                        };
                        // console.log(data);
                        let that = this;
                        //验证
                        selectRepeatPL(data).then(res => {
                            if(res.code == 0) {
                                //保存 提交
                                plSave(data).then(res => {
                                    if(res.code == 0) {
                                        that.success();
                                        that.$refs[formName].resetFields();
                                        that.addLevel = '';
                                        that.addLesson = '';
                                        setTimeout(function () {
                                            history.back(-1);
                                        },1000);
                                    } else {
                                        this.error();
                                    }
                                }).catch((e) => {});
                            } else if(res.code == 1) {
                                this.$message({
                                    message: '此段时间班级已被占用，请重新选择时间',
                                    type: 'warning'
                                });
                            } else {
                                this.error();
                            }
                        }).catch((e) => {});
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {  //取消
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
                this.ruleForm.changeLevel = '';
                this.ruleForm.changeLesson = '';
                let data = {
                    'subject':this.ruleForm.changeSubject
                };
                rankChange(data).then(res => {
                    if(res.code == 0) {
                        this.addLevel = res.data.curriculumResults;
                    } else {
                        this.error();
                    }
                }).catch((e) => {});
            },
            pickChangeLevel(vId) {
                this.ruleForm.changeLesson = '';
                let data = {
                    'subject':this.ruleForm.changeSubject,
                    'rank':vId
                };
                lessonChange(data).then(res => {
                    if(res.code == 0) {
                        this.addLesson = res.data.curriculumResults;
                    } else {
                        this.error();
                    }
                }).catch((e) => {});
            },
            pickChangeLesson(vId) {
                let obj = {};
                obj = this.addLesson.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.currName == vId) {
                        this.currId = item.currId;
                    }
                    return item.currName === vId;//筛选出匹配数据
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
                    if(item.id == vId) {
                        this.pickTeacher1 = item;
                    }
                });
            },
            pickT2(vId) {  //选择助教
                let obj = {};
                obj = this.addTeacher.find((item)=>{//这里的userList就是上面遍历的数据源
                    if(item.id == vId) {
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
            success() {  //保存成功
                this.$message({
                    message: '批量排课信息添加成功，将自动返回上一页',
                    type: 'success'
                });
            },
            error() {  //创建失败
                this.$message.error('网络异常，请稍后再试');
            },
            formatDate(value) {  //日期格式化
                var d = new Date(value);
                var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                return datetime;
            },
            weekChange(value) {  //周期格式化
                for(var i = 0; i < value.length; i++) {
                    if(value[i] == '每周一') {
                        value[i] = 1;
                    } else if(value[i] == '每周二') {
                        value[i] = 2;
                    } else if(value[i] == '每周三') {
                        value[i] = 3;
                    } else if(value[i] == '每周四') {
                        value[i] = 4;
                    } else if(value[i] == '每周五') {
                        value[i] = 5;
                    } else if(value[i] == '每周六') {
                        value[i] = 6;
                    } else if(value[i] == '每周日') {
                        value[i] = 7;
                    }
                }
                var returnStr = value.join(",");
                return returnStr;
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