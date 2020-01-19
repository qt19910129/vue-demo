<template>
    <div class="students">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">学生管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>学生详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="tit">学生信息</div>
        <div class="studentsMain">
            <el-row>
                <el-col :span="6" class="tableName">所在校区</el-col>
                <el-col :span="6">{{studentInfo.classSchoolName}}</el-col>
                <el-col :span="6" class="tableName">所在班级</el-col>
                <el-col :span="6" :title="studentInfo.className">
                    {{studentInfo.className|ellipsis}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">班级老师</el-col>
                <el-col :span="6">{{studentInfo.chargeinTeacherName}}</el-col>
                <el-col :span="6" class="tableName">老师电话</el-col>
                <el-col :span="6">{{studentInfo.teacherMobile}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">缴费日期</el-col>
                <el-col :span="6" v-if="studentInfo.renewTime">{{studentInfo.renewTime.substring(0,10)}}</el-col>
                <el-col :span="6" v-else></el-col>
                <el-col :span="6" class="tableName">购课信息</el-col>
                <el-col :span="6">{{studentInfo.buyClassCount}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">宝宝(学生)姓名</el-col>
                <el-col :span="6">
                    {{studentInfo.kidName}}
                    <el-button type="text" icon="el-icon-setting" @click="openEditName">修改</el-button>
                </el-col>
                <el-col :span="6" class="tableName">英文名</el-col>
                <el-col :span="6">
                    {{studentInfo.englishName}}
                    <el-button type="text" icon="el-icon-setting" @click="openEnglishName">修改</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">出生日期</el-col>
                <el-col :span="6">{{studentInfo.birthday}}</el-col>
                <el-col :span="6" class="tableName">宝宝性别</el-col>
                <el-col :span="6">
                    <span v-if="studentInfo.birthday == 1">男</span>
                    <span v-if="studentInfo.birthday == 2">女</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家长姓名</el-col>
                <el-col :span="6">{{studentInfo.parentName}}</el-col>
                <el-col :span="6" class="tableName">家长身份</el-col>
                <el-col :span="6">{{studentInfo.parentIdentity}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家长电话</el-col>
                <el-col :span="6">{{studentInfo.mobile}}</el-col>
                <el-col :span="6" class="tableName">所在区域</el-col>
                <el-col :span="6">{{studentInfo.region}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家庭住址</el-col>
                <el-col :span="18">{{studentInfo.address}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">用户积分</el-col>
                <el-col :span="6">{{studentInfo.bonusPoint}}</el-col>
                <el-col :span="6" class="tableName">学习奖励</el-col>
                <el-col :span="6">
                    <span v-if="studentInfo.learningAwards == null" class="color999">
                        暂无
                    </span>
                    <span v-else>
                        {{studentInfo.learningAwards}}星
                        <el-button type="text" icon="el-icon-star-off" @click="openChangeStar()">兑换</el-button>
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="tit">上课信息<el-button type="text" icon="el-icon-download" class="fr" @click="load()">导出</el-button></div>
        <!--数据表格-->
        <el-table :data="studentClassData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="subject" label="科目" align="center"></el-table-column>
            <el-table-column prop="zk" label="课时" align="center"></el-table-column>
            <el-table-column prop="kh" label="课耗" align="center"></el-table-column>
            <el-table-column prop="sy" label="剩余课时" align="center"></el-table-column>
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
        <!--学习分析-->
        <!--<div class="tit">学习分析</div>-->
        <!--<div id="studentEcharts"></div>-->
    </div>
</template>

<script>
    import {
        getStudent,
        editStudentName,
        getClassList,
        changeStars
    } from "../../axios/studentSet";
    export default {
        data() {
            return {
                studentInfo:{},  //学生信息
                studentId: -1, //学生id
                studentClassData:[
                    // {
                    //     subject:'数学',
                    //     num:20,
                    //     readyNum:10,
                    //     leaveNum:10,
                    // },
                ],
                starNum:-1,  //星星数量（模拟）
                option:{
                    backgroundColor: '#F6FAFF',
                    textStyle: {
                        color: '#333'
                    },
                    title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center',
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bolder',
                            color: '#333'          // 主标题文字颜色
                        },
                        subtextStyle: {
                            color: '#333'          // 副标题文字颜色
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                        textStyle: {
                            fontSize: 14,
                            color: '#333'          // 主标题文字颜色
                        },
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            this.getInfo();  //数据
            this.getClass();  //上课信息
            //基于准备好的dom 初始化echarts实例
            // var myChart = this.$echarts.init(document.getElementById('studentEcharts'),'dark');
            // myChart.setOption(this.option);
        },
        methods: {
            getInfo() {
                let data = {
                    'id':this.$route.params.studentId,
                };
                getStudent(data).then(res => {
                    if(res.code == 0) {
                        this.studentInfo = res.data;
                        this.starNum = res.data.learningAwards;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            getClass() {
                let data = {
                    'id':this.$route.params.studentId,
                    'rows':this.rows,
                    'page':this.page,
                };
                getClassList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.total;
                        this.studentClassData = res.data.list;
                        if(res.data.total <= 10) {  //小于10条时 隐藏分页
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
                this.getClass();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.getClass();
            },
            openEditName() {
                this.$prompt('请输入宝宝(学生)姓名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:this.studentInfo.kidName,
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入宝宝(学生)姓名'
                }).then(({ value }) => {
                    this.studentInfo.kidName = value;
                    let data = {
                        'id':this.$route.params.studentId,
                        'name':value,
                        'nameType':1
                    };
                    editStudentName(data).then(res => {
                        if(res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            openEnglishName() {
                this.$prompt('请输入英文名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:this.studentInfo.englishName,
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入英文名'
                }).then(({ value }) => {
                    this.studentInfo.englishName = value;
                    let data = {
                        'id':this.$route.params.studentId,
                        'name':value,
                        'nameType':2
                    };
                    editStudentName(data).then(res => {
                        if(res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            openChangeStar() {
                this.$prompt('请输入要兑换的星星数量', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入要兑换的星星数量'
                }).then(({ value }) => {
                    if(this.starNum * 1 < value * 1) {
                        this.$message({
                            type: 'error',
                            message: '兑换失败，您输入的星星数量大于已有的星星数量'
                        });
                    } else {
                        let data = {
                            'id':this.$route.params.studentId,
                            'learningAwards':value
                        };
                        changeStars(data).then(res => {
                            if(res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '兑换成功'
                                });
                                this.studentInfo.learningAwards = this.studentInfo.learningAwards * 1 - value;
                            } else {
                                this.$message.error('网络异常，请稍后再试');
                            }
                        }).catch((e) => {});
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            load() {  //导出
                window.location.href = 'http://47.104.251.161:8080/school/student/export?id=' + this.$route.params.studentId;


            }
        },
        filters: {
            ellipsis (value) {
                if(value) {
                    let len=value.length;
                    if (!value) return ''
                    if (value.length > 20) {
                        return value.substring(0,15) + '...'
                    }
                    return value
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .students{
        .studentsMain{
            background: #fff;
            border-radius: 10px;
            font-size: 14px;
            .tableName{
                background: #E8EEF3;
            }
            .el-col-6,.el-col-18{
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #ddd;
                button{
                    margin-left: 10px;
                }
            }
        }
        .tit{
            font-size: 18px;
            margin: 20px 0;
            button{
                padding: 0;
            }
        }
        #studentEcharts{
            height: 600px;
            width: 600px;
            margin: 20px auto;
        }
    }
</style>
