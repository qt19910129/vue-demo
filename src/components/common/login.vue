<template>
    <div class="login">
        <div class="main">
            <div class="fl">
                <img src="../../static/img/common/loginImg.png" class="loginImg">
            </div>
            <div class="fr">
                <div class="loginTitle">托马斯校区管理系统</div>
                <el-row type="flex" justify="center">
                    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
                        <el-form-item prop="name">
                            <el-input v-model="user.name" placeholder="请输入用户名" class="user"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass">
                            <el-input v-model="user.pass" type="password" placeholder="请输入密码" class="password"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="user.code" placeholder="请输入验证码" class="code"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-upload" @click="login" class="land">立即登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div class="tips">忘记密码请联系总部管理员</div>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loginForm: {
                    name:'',
                    pass:'',
                    code:''
                },
                user: {},
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            login () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        if (this.user.name === 'admin' && this.user.pass === '123' && this.user.code === '123') {
                            this.$notify({
                                type: 'success',
                                message: '欢迎你,' + this.user.name + '!',
                                duration: 3000
                            });
                            this.$router.replace('/')
                        } else if(this.user.name != 'admin' || this.user.pass != '123') {
                            this.$message({
                                type: 'error',
                                message: '用户名或密码错误',
                                showClose: true
                            })
                        } else if(this.user.code != '123') {
                            this.$message({
                                type: 'error',
                                message: '验证码填写错误',
                                showClose: true
                            })
                        } else {

                        }
                    }
                    else {
                        return false
                    }
                })
            }
        },
    }
</script>

<style scoped lang="less">
    .login{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #3787F5;
        .main{
            width: 1200px;
            height: 620px;
            background: #fff;
            border-radius: 10px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -310px;
            margin-left: -600px;
            box-shadow: 0px 0px 20px 10px #305EB1;
            >div{
                width: 50%;
                height: 100%;
                overflow: hidden;
            }
            .loginImg{
                margin: 70px 0 0 60px;
                width: 450px;
            }
            .loginTitle{
                margin: 70px 0 50px 0;
                width: 100%;
                text-align: center;
                font-size: 28px;
                line-height: 28px;
            }
            .land{
                width: 440px;
                height: 50px;
                font-size: 16px;
            }
            .tips{
                width: 440px;
                text-align: center;
                color: orangered;
            }
        }
    }
</style>