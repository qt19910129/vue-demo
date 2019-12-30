<template>
    <div class="foods">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:history.go(-1)">每日食谱</a></el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 1">添加食谱</el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 2">编辑食谱</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 20px;" class="foodFrom">
            <el-form-item label="食谱日期">
                <div class="tableBox">{{dates}}</div>
            </el-form-item>
            <el-form-item
                    v-for="(foodName, index) in ruleForm.foodName"
                    :label="'今日菜谱-' + (index*1+1)"
                    :key="foodName.key"
                    :prop="'foodName.' + index + '.value'"
                    :rules="{
      required: true, message: '请输入今日菜谱', trigger: 'blur'
    }"
            >
                <el-input v-model="foodName.value" placeholder="请输入今日菜谱"></el-input><el-button @click.prevent="removeFoods(foodName)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <!--新增-->
                <el-button type="primary" v-if="edit == 1" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button type="primary" v-if="edit == 2" @click="submitForm('ruleForm')">保存菜谱</el-button>
                <el-button @click="addFoods">新增菜谱</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        foodSava,
        foodEditData
    } from "../../axios/dayFoos";
    export default {
        data() {
            return {
                ruleForm: {
                    foodName: [{
                        value: ''
                    }],
                },
                rules: {

                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
                dates:this.$route.query.dates,  //编辑日期
                mId:'',  //食谱id
            }
        },
        mounted() {
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
            if(this.edit == 2) {
                this.mId = this.$route.query.mId;
                let data = {
                    'mId':this.$route.query.mId
                };
                foodEditData(data).then(res => {
                    let mName = res.data.menuResult.mName;
                    let foodArr = mName.split(',');
                    this.ruleForm.foodName.shift();  //删除第一项
                    let foods;
                    let that = this;
                    for(var i = 0; i < foodArr.length; i++) {
                        foods = {
                            'value':foodArr[i]
                        };
                        that.ruleForm.foodName.push(foods)
                    }
                }).catch((e) => {});
            }
        },
        methods:{
            removeFoods(item) {
                var index = this.ruleForm.foodName.indexOf(item);
                if (index !== -1) {
                    this.ruleForm.foodName.splice(index, 1);
                }
            },
            addFoods() {
                this.ruleForm.foodName.push({
                    value: '',
                    // key: Date.now()
                });
            },
            submitForm(formName) {  //提交保存按钮
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let foodArr = [];
                        for(var i = 0; i < this.ruleForm.foodName.length; i++) {
                            foodArr.push(this.ruleForm.foodName[i].value);
                        }
                        let foodStr = foodArr.join(",");
                        let data;
                        if(this.edit == 1) {  //新增
                            data = {
                                'mDate':this.dates,
                                'mName':foodStr
                            };
                        } else if(this.edit == 2) {  //编辑
                            data = {
                                'mId':this.mId,
                                'mName':foodStr
                            };
                        }
                        foodSava(data).then(res => {
                            if(res.code == 0) {
                                this.success();
                                setTimeout(function () {
                                    history.back(-1);
                                },1000);
                            } else {
                                this.error();
                            }
                        }).catch((e) => {});
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {  //取消 返回上一页
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
            error() {  //创建失败
                this.$message.error('网络异常，请稍后再试');
            },
            success() {  //创建成功
                this.$message({
                    message: '添加食谱成功，将自动返回上一页',
                    type: 'success'
                });
            },
            cancel() {  //取消输入
                this.$message('已取消输入');
            },
        }
    }
</script>

<style scoped lang="less">
    .foods{
        .foodFrom{
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            min-height: 550px;
        }
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