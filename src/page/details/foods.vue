<template>
    <div class="foods">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>每日食谱</el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 1">添加食谱</el-breadcrumb-item>
            <el-breadcrumb-item v-if="edit == 2">编辑食谱</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 20px;" class="foodFrom">
            <el-form-item label="食谱日期" prop="foodTime">
                <el-date-picker type="date" placeholder="请选择食谱日期" v-model="ruleForm.foodTime"></el-date-picker>
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
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="addFoods">新增菜谱</el-button>
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
                    foodTime:'',
                    foodName: [{
                        value: ''
                    }],
                },
                rules: {
                    foodTime: [
                        { type: 'date', required: true, message: '请选择食谱日期', trigger: 'change' }
                    ],
                },
                edit:-1, //获取新增或者编辑 1新增 2编辑
            }
        },
        mounted() {
            this.edit = this.$route.params.edit;  //获取新增或者编辑 1新增 2编辑
        },
        methods:{
            removeFoods(item) {
                var index = this.ruleForm.foodName.indexOf(item)
                if (index !== -1) {
                    this.ruleForm.foodName.splice(index, 1)
                }
            },
            addFoods() {
                this.ruleForm.foodName.push({
                    value: '',
                    key: Date.now()
                });
            },
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
    .foods{
        .foodFrom{
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            min-height: 550px;
        }
    }
</style>