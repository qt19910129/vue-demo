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
                        <div>{{indexData.usersCount}}</div>
                        <div>在校学生</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-2">
                        <img src="../../static/img/pageIndex/onClass.png">
                        <div>{{indexData.classCount}}</div>
                        <div>上课班级</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-3">
                        <img src="../../static/img/pageIndex/teacherNum.png">
                        <div>{{indexData.teacherCount}}</div>
                        <div>在校教师</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="columnFour columnFour-4">
                        <img src="../../static/img/pageIndex/signNum.png">
                        <div>{{indexData.member}}</div>
                        <div>报名人数</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="columnTwo">
                <el-col :span="12">
                    <div class="columnTwo-1">
                        <div>{{indexData.schoolAllCourseTime}}</div>
                        <div>课时总数</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="columnTwo-2">
                        <div>{{indexData.schoolConsumeCourseTime}}</div>
                        <div>消耗课时</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--续费学员-->
        <div class="renewStudent">
            <div class="renewTitle">续费学员</div>
            <el-table :data="renewTableData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="renewTable">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="studentName" label="学生姓名" align="center"></el-table-column>
                <el-table-column prop="renewTime" label="续费截止日期" width="120" align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" width="" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="" align="center"></el-table-column>
                <el-table-column prop="className" label="所在班级" width="" align="center"></el-table-column>
                <el-table-column prop="statusStr" label="学生状态" width="" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="130" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="goDetail(scope.row.id)">查看</el-button>
                        <!--<router-link to="/content/details/students">-->
                            <!---->
                        <!--</router-link>-->
                        <el-button type="text" icon="el-icon-money" @click="renew(scope.row.id)">续费</el-button>
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
        <!--续费弹窗-->
        <el-dialog title="续费" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="续费课时" :label-width="formLabelWidth" prop="renewNum">
                    <el-input v-model.number="form.renewNum" autocomplete="off" placeholder="请输入续费课时" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="续费日期" :label-width="formLabelWidth" prop="renewDay">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.renewDay" value-format="yyyy-MM-dd" style="width: 80%;"></el-date-picker>
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
            <el-table :data="signTableData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="className" label="班级名称" width="" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="主讲" width="" align="center"></el-table-column>
                <el-table-column prop="assistantName" label="助教" width="" align="center"></el-table-column>
                <el-table-column prop="subject" label="课程名称" width="" align="center"></el-table-column>
                <el-table-column prop="arrangeDate" label="上课时间" width="120" align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="studentCount" label="总人数" width="" align="center"></el-table-column>
                <el-table-column prop="attendanceCount" label="已签到" width="" align="center"></el-table-column>
                <!--<el-table-column prop="noSignNum" label="未签到" width="" align="center"></el-table-column>-->
                <el-table-column label="未签到" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-user" @click="noSign(scope.row.classId,scope.row.className)">{{scope.row.unAttendanceCount}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="attendance" label="出勤率" width="" align="center">
                    <template slot-scope="scope">
                        <span type="text" class="attendance">{{scope.row.attendance}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--未签到表格-->
            <el-dialog :title="noSignTitle" :visible.sync="dialogTableVisible">
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
                <template>
                    <el-pagination
                            align="right"
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="currentPage1"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="records1"
                            background
                            :hide-on-single-page="pageValue1"
                            class="pages">
                    </el-pagination>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        allData,
        renewData,
        signInData,
        noSignData
    } from "../../axios/pageIndex";
    import {
        studentRenew,
    } from "../../axios/studentSet";
    import moment from 'moment';
    export default {
        data() {
            return {
                renewTableData: [], //续费学员列表
                signTableData: [],  //今日签到信息
                dialogFormVisible: false,
                form: {
                    renewNum: '',
                    renewDay: '',
                },
                formLabelWidth: '120px',
                rules: {
                    renewNum: [
                        { required: true, message: '请输入续费课时数', trigger: 'blur' },
                        { type: 'number', message: '请输入正确的续费课时数'}
                    ],
                    renewDay: [
                        { required: true, message: '请选择续费日期', trigger: 'blur' }
                    ],
                },
                gridData: [],  //未签到信息表
                dialogTableVisible: false,
                indexData:{},  //总数据
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                ids:-1,  //续费id
                noSignTitle:'',  //未签到title
                currentPage1:1,  //分页默认选中哪页
                records1:0,  //总页数
                rows1:10,  //默认每页条数
                page1:1,  //默认打开第一页
                pageValue1:false,  //当只有一页时 分页隐藏
            }
        },
        mounted() {
            this.allDatas();
            this.renewList();
            this.signInList();
        },
        methods: {
            allDatas() {  //总数据
                allData('').then(res => {
                    if(res.code == 0) {
                        this.indexData = res.data;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            renewList() {   //续费列表数据
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                };
                renewData(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.renewTableData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            signInList() {  //今日签到信息列表
                signInData('').then(res => {
                    if(res.code == 0) {
                        this.signTableData = res.data.list;
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
                this.renewList();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.renewList();
            },
            goDetail(studentId) {  //跳转差看学生详情页
                this.$router.push({
                    path: `/content/details/students/${studentId}`,
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            'ids':this.ids,
                            'renewTime':this.form.renewDay,
                            'buyClassCount':this.form.renewNum
                        };
                        studentRenew(data).then(res => {
                            if(res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                });
                                this.$refs[formName].resetFields();
                                this.dialogFormVisible = false;
                                setTimeout(function () {
                                    window.location.reload();
                                },1000);
                            } else {
                                this.$message.error('网络异常，请稍后再试');
                            }
                        }).catch((e) => {});
                    } else {
                        console.log('error submit!!');
                        this.dialogFormVisible = true;
                        return false;
                    }
                });
            },
            resetForm(formName) {  //续费取消
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
            },
            dateFormat(row, column, cellValue, index){  //表格日期格式化
                var date = row[column.property];
                if(date == undefined){return ''};
                return moment(date).format("YYYY-MM-DD");
            },
            renew(ids) {
                this.dialogFormVisible = true;
                this.ids = ids;
            },
            handleClose(done) {
                this.$refs['form'].resetFields();
                this.dialogFormVisible = false;
            },
            noSign(classId,className) {  //点击未签到
                this.dialogTableVisible = true;
                this.noSignTitle = className + " 签到表";
                let data = {
                    'classId':classId,
                    'className':className,
                    'page1':this.page1,
                    'rows1':this.rows1
                };
                noSignData(data).then(res => {
                    if(res.code == 0) {
                        this.records1 = res.data.jqGirdPage.records;
                        this.gridData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records1 <= 10) {  //小于10条时 隐藏分页
                            this.pageValue1 = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleSizeChange1(val) {
                // console.log(`每页 ${val} 条`);
                this.rows1 = `${val}`;
                this.currentPage1 = 1;
                this.page1 = 1;
                this.noSign();
            },
            handleCurrentChange1(val) {
                this.page1 = `${val}`;
                this.noSign();
            },
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
