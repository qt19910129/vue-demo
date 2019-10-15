<template>
    <div class="students">
        <!--返回首页-->
        <el-page-header @back="goBack" content="学生详情" title="返回首页"></el-page-header>
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
                    50星
                    <el-button type="text" icon="el-icon-star-off">兑换</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="tit">上课信息<el-button type="text" icon="el-icon-download" class="fr">导出</el-button></div>
        <!--数据表格-->
        <el-table :data="studentClassData" border style="width: 100%;border: 2px solid #ccc;font-size: 16px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="subject" label="科目" align="center"></el-table-column>
            <el-table-column prop="num" label="课时" align="center"></el-table-column>
            <el-table-column prop="readyNum" label="课耗" align="center"></el-table-column>
            <el-table-column prop="leaveNum" label="剩余课时" align="center"></el-table-column>
        </el-table>
        <!--学习分析-->
        <div class="tit">学习分析</div>
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
                        leaveNum:10
                    },
                ]
            }
        },
        mounted() {
            this.studentId = this.$route.params.studentId;  //获取学生id
        },
        methods: {
            goBack() {  //返回首页
                this.$router.push({
                    path: '/content/pageIndex',
                })
            },
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
            }
        }
    }
</script>

<style scoped lang="less">
    .students{
        .studentsMain{
            background: #fff;
            border-radius: 10px;
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
    }
</style>