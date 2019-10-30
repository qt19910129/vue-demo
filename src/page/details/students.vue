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
                <el-col :span="6">托马斯学习馆</el-col>
                <el-col :span="6" class="tableName">所在班级</el-col>
                <el-col :span="6">黄埔一期</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">班级老师</el-col>
                <el-col :span="6">李老师</el-col>
                <el-col :span="6" class="tableName">老师电话</el-col>
                <el-col :span="6">15622335544</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">缴费日期</el-col>
                <el-col :span="6">2018-02-03</el-col>
                <el-col :span="6" class="tableName">购课信息</el-col>
                <el-col :span="6">初级班</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">宝宝(学生)姓名</el-col>
                <el-col :span="6">
                    娃哈哈
                    <el-button type="text" icon="el-icon-setting" @click="openEditName">修改</el-button>
                </el-col>
                <el-col :span="6" class="tableName">英文名</el-col>
                <el-col :span="6">
                    jack
                    <el-button type="text" icon="el-icon-setting" @click="openEnglishName">修改</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">出生日期</el-col>
                <el-col :span="6">2003-02-06</el-col>
                <el-col :span="6" class="tableName">宝宝性别</el-col>
                <el-col :span="6">女</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家长姓名</el-col>
                <el-col :span="6">屁屁</el-col>
                <el-col :span="6" class="tableName">家长身份</el-col>
                <el-col :span="6">妈妈</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家长电话</el-col>
                <el-col :span="6">156899665456</el-col>
                <el-col :span="6" class="tableName">所在区域</el-col>
                <el-col :span="6">北京市</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">家庭住址</el-col>
                <el-col :span="18">北京市丰台区</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="tableName">用户积分</el-col>
                <el-col :span="6">50</el-col>
                <el-col :span="6" class="tableName">学习奖励</el-col>
                <el-col :span="6">
                    {{starNum}}星
                    <el-button type="text" icon="el-icon-star-off" @click="openChangeStar()">兑换</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="tit">上课信息<el-button type="text" icon="el-icon-download" class="fr">导出</el-button></div>
        <!--数据表格-->
        <el-table :data="studentClassData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="subject" label="科目" align="center"></el-table-column>
            <el-table-column prop="num" label="课时" align="center"></el-table-column>
            <el-table-column prop="readyNum" label="课耗" align="center"></el-table-column>
            <el-table-column prop="leaveNum" label="剩余课时" align="center"></el-table-column>
        </el-table>
        <!--学习分析-->
        <div class="tit">学习分析</div>
        <div id="studentEcharts"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                studentId: -1, //学生id
                studentClassData:[
                    {
                        subject:'数学',
                        num:20,
                        readyNum:10,
                        leaveNum:10,
                    },
                ],
                starNum:50,  //星星数量（模拟）
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
            }
        },
        mounted() {
            window.scrollTo(0,0); //每次路由进入 页面滚动到顶部
            this.studentId = this.$route.params.studentId;  //获取学生id
            //基于准备好的dom 初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('studentEcharts'),'dark');
            myChart.setOption(this.option);
        },
        methods: {
            openEditName() {
                this.$prompt('请输入宝宝(学生)姓名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入宝宝(学生)姓名'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
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
                    inputPattern: /\S/,
                    inputErrorMessage: '请输入英文名'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
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
                        this.$message({
                            type: 'success',
                            message: '兑换成功'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
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
