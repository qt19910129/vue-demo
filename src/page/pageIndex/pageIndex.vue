<template>
    <!--首页-->
    <div class="pageIndex">
        <!--面包屑-->
        <!--<div class="routeBack">-->
            <!--<router-link to="/content/pageIndex">首页</router-link>-->
        <!--</div>-->
        <!--首页内容-->
        <div class="columnData">
            <el-row :gutter="20" style="height: 440px;">
                <el-col :span="6">
                    <div class="columnFour columnFour-1">
                        <img src="../../static/img/pageIndex/stuNum.png">
                        <div>1234</div>
                        <div>在校学生</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-2">
                        <img src="../../static/img/pageIndex/onClass.png">
                        <div>1234</div>
                        <div>上课班级</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-3">
                        <img src="../../static/img/pageIndex/teacherNum.png">
                        <div>1234</div>
                        <div>在校教师</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-4">
                        <img src="../../static/img/pageIndex/signNum.png">
                        <div>1234</div>
                        <div>报名人数</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="columnTwo">
                <el-col :span="12">
                    <div class="columnTwo-1">
                        <div>1234</div>
                        <div>课时总数</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="columnTwo-2">
                        <div>1234</div>
                        <div>消耗课时</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--续费学员-->
        <div class="renewStudent">
            <div class="renewTitle">续费学员</div>
            <el-table :data="renewTableData" height="380" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="renewTable">
                <el-table-column prop="num" label="ID" align="center"></el-table-column>
                <el-table-column prop="studentName" label="学生姓名" width="160" align="center"></el-table-column>
                <el-table-column prop="renewDate" label="续费截止日期" width="" align="center"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phoneNumber" label="联系电话" width="" align="center"></el-table-column>
                <el-table-column prop="class" label="所在班级" width="" align="center"></el-table-column>
                <el-table-column prop="studentState" label="学生状态" width="" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="130" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goDetail(scope.row.studentId)">查看</el-button>
                        <!--<router-link to="/content/details/students">-->
                            <!---->
                        <!--</router-link>-->
                        <el-button type="text" icon="el-icon-money" @click="dialogFormVisible = true">续费</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--续费弹窗-->
        <el-dialog title="续费" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="续费课时" :label-width="formLabelWidth" prop="renewNum">
                    <el-input v-model="form.renewNum" autocomplete="off" placeholder="请输入续费课时"></el-input>
                </el-form-item>
                <el-form-item label="续费日期" :label-width="formLabelWidth" prop="renewDay">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.renewDay" style="width: 80%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!--今日签到信息-->
        <div class="signMessage">
            <div class="signTitle">今日签到信息</div>
            <el-table :data="signTableData" height="380" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="ID" align="center"></el-table-column>
                <el-table-column prop="className" label="班级名称" width="160" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="主讲" width="" align="center"></el-table-column>
                <el-table-column prop="assistantName" label="助教" width="" align="center"></el-table-column>
                <el-table-column prop="crouseName" label="课程名称" width="" align="center"></el-table-column>
                <el-table-column prop="classTime" label="上课时间" width="" align="center"></el-table-column>
                <el-table-column prop="studentNum" label="总人数" width="" align="center"></el-table-column>
                <el-table-column prop="signNum" label="已签到" width="" align="center"></el-table-column>
                <!--<el-table-column prop="noSignNum" label="未签到" width="" align="center"></el-table-column>-->
                <el-table-column label="未签到" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-user" @click="dialogTableVisible = true">{{scope.row.noSignNum}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="attendance" label="出勤率" width="" align="center">
                    <template slot-scope="scope">
                        <span type="text" class="attendance">{{scope.row.attendance}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--未签到表格-->
            <el-dialog title="二年级三班签到表" :visible.sync="dialogTableVisible">
                <el-table :data="gridData" border style="font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                    <el-table-column property="num" label="ID" align="center"></el-table-column>
                    <el-table-column property="name" label="学生姓名" width="200" align="center"></el-table-column>
                    <el-table-column property="edit" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-document" @click="signIn">签到</el-button>
                            <el-button type="text" icon="el-icon-pie-chart" @click="signOut">请假</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                renewTableData: [{
                    num : '1',
                    studentName: '哈哈哈',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '上课中',
                    studentId:11,
                }, {
                    num : '2',
                    studentName: '哈哈哈',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '上课中',
                    studentId:22,
                }, {
                    num : '3',
                    studentName: '休息下',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '休学',
                    studentId:33,
                }, {
                    num : '4',
                    studentName: '对得起',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '退学',
                    studentId:44,
                }, {
                    num : '5',
                    studentName: '发送到',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '退学',
                    studentId:55,
                }, {
                    num : '6',
                    studentName: '发送到',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '退学',
                    studentId:66,
                }, {
                    num : '7',
                    studentName: '发送到',
                    renewDate: '2016-05-03',
                    parentName: '隔壁老王',
                    phoneNumber: '15911003912',
                    class: '智障一班',
                    studentState: '退学',
                    studentId:77,
                }],
                //今日签到信息
                signTableData: [{
                    num : '1',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '2',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '3',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '4',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '5',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '6',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }, {
                    num : '7',
                    teacherName: '王小虎',
                    classTime: '2016-05-03',
                    assistantName: '隔壁老王',
                    studentNum: '44',
                    className: '智障一班',
                    crouseName: '如何不及格',
                    signNum: '33',
                    noSignNum: '11',
                    attendance: '10%'
                }],
                dialogFormVisible: false,
                form: {
                    renewNum: '',
                    renewDay: '',
                },
                formLabelWidth: '120px',
                rules: {
                    renewNum: [
                        { required: true, message: '请输入续费课时数', trigger: 'blur' },
                    ],
                    renewDay: [
                        { required: true, message: '请选择续费日期', trigger: 'blur' }
                    ],
                },
                gridData: [{
                    num: '1',
                    name: '王小虎',
                }, {
                    num: '2',
                    name: '王小虎',
                }, {
                    num: '3',
                    name: '王小虎',
                }, {
                    num: '4',
                    name: '王小虎',
                }],
                dialogTableVisible: false,
            }
        },
        methods: {
            goDetail(studentId) {  //跳转差看学生详情页
                this.$router.push({
                    path: `/content/details/students/${studentId}`,
                })
            },
            openrenew() {  //打开续费弹窗

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$refs[formName].resetFields();
                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.dialogFormVisible = true;
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            signIn() {
                this.dialogTableVisible = false;
                this.$message({
                    type: 'success',
                    message: '签到成功'
                });
            },
            signOut() {
                this.dialogTableVisible = false;
                this.$message({
                    type: 'success',
                    message: '请假成功'
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .pageIndex{
        width: 100%;
        .columnFour{
            height: 100%;
            box-shadow: 0 2px 12px 0 #999;
            text-align: center;
            min-width: 130px;
            animation:rotaY 2s 1;
            -webkit-animation:rotaY 2s 1;
            border-radius: 10px;
            img{
                width: 80px;
                height: 80px;
                margin: 80px 0 50px 0;
            }
            div{
                margin-top: 40px;
                font-weight: bold;
                line-height: 30px;
                color: #fff;
                font-size: 30px;
            }
        }
        .columnFour-1{
            /*background: linear-gradient(94deg, #D61CB4, #ED46D1);*/
            background: url("../../static/img/pageIndex/bg1.png") no-repeat 100% 100%;
        }
        .columnFour-2{
            /*background: linear-gradient(94deg, #F2CB3E, #F2D871);*/
            background: url("../../static/img/pageIndex/bg2.png") no-repeat 100% 100%;
        }
        .columnFour-3{
            /*background: linear-gradient(94deg, #1298D6, #3EB7F0);*/
            background: url("../../static/img/pageIndex/bg3.png") no-repeat 100% 100%;
        }
        .columnFour-4{
            /*background: linear-gradient(94deg, #ED9064, #FAA77E);*/
            background: url("../../static/img/pageIndex/bg4.png") no-repeat 100% 100%;
        }
        .columnTwo{
            margin-top: 20px;
            height: 180px;
            .columnTwo-1,.columnTwo-2{
                box-shadow: 0 2px 12px 0 #999;
                font-weight: bold;
                color: #fff;
                font-size: 30px;
                text-align: center;
                height: 130px;
                padding-top: 50px;
                animation:rotaX 2s 1;
                -webkit-animation:rotaX 2s 1;
                border-radius: 10px;
                div{
                    line-height: 30px;
                    margin-bottom: 30px;
                }
            }
        }
        .columnTwo-1{
            /*background: linear-gradient(94deg, #8150F0, #9B6FF7);*/
            background: url("../../static/img/pageIndex/bg5.png") no-repeat 90% 40%;
            background-size: 160%;

        }
        .columnTwo-2{
            /*background: linear-gradient(94deg, #F21F55, #FA5A81);*/
            background: url("../../static/img/pageIndex/bg6.png") no-repeat 90% 40%;
            background-size: 160%;
        }
        @-webkit-keyframes rotaY{
            from{-webkit-transform:rotateY(0deg) }
            to{-webkit-transform:rotateY(-360deg) }
        }
        @-webkit-keyframes rotaX{
            from{-webkit-transform:rotateX(0deg)}
            to{-webkit-transform:rotateX(-360deg)}
        }
        .renewTitle,.signTitle{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            padding-top: 50px;
        }
        .renewTable,.signTable{
            margin: 20px 0 0 0;
        }
        .renewTable th{
            padding: 10px 0 !important;
        }
        .renewTable td{
            padding: 8px 0 !important;
        }
        .attendance{
            color: #1298D6;
        }
    }
</style>
