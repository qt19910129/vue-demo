<template>
    <div class="header">
        <div class="logo">
            <div class="left">
                <img src="../../static/img/pageIndex/logo.png" class="logoImg">
            </div>
            <div class="right">校区教务管理系统</div>
        </div>
        <div class="user">
            <el-dropdown>
                <div class="el-dropdown-link">
                    <span style="position: relative;top: 1px;">用户名</span>
                    <img src="../../static/img/common/triangle-icon.png" class="triangle-icon">
                    <img src="../../static/img/common/user-icon.png">
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-tools" @click.native="passwordVisible = true">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-back" @click.native="loginOut()">退出登录</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-user-solid" @click.native="loginIn()" v-if="haveToken == ''">登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--更改密码弹窗-->
        <el-dialog title="修改密码" :visible.sync="passwordVisible" :modal-append-to-body="false" :before-close="handleClose">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm">
                <el-form-item label="原密码" prop="originalPass">
                    <el-input type="password" v-model="passwordForm.originalPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="passwordForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="primary" @click="submitForm('passwordForm')">确定</el-button>
                    <el-button @click="resetForm('passwordForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {
        modifyPassWord,
        loginOuts
    } from "../../axios/header";
    export default {
        inject:['reload'],
        data() {
            var validatePass1 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if(value.length < 6 || value.length > 18) {
                    callback(new Error('请输入6~18位密码'));
                } else {
                    if (this.passwordForm.checkPass !== '') {
                        this.$refs.passwordForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passwordVisible:false,  //更改密码弹窗
                passwordForm: {
                    originalPass :'',
                    pass:'',
                    checkPass:''
                },
                passwordRules: {
                    originalPass: [
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                haveToken:'',
            };

        },
        mounted() {
            this.$nextTick(() => {
                this.haveToken = localStorage.getItem("token");
            });
        },
        methods: {
            submitForm(formName) {
                console.log(this.passwordForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            'oldPassword':this.passwordForm.originalPass,
                            'password':this.passwordForm.pass,
                            'passwordConfirm':this.passwordForm.checkPass,
                        };
                        modifyPassWord(data).then(res => {
                            if(res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '密码修改成功，请重新登陆'
                                });
                                localStorage.removeItem("token");
                                let that = this;
                                setTimeout(function () {
                                    window.location.href = that.GLOBAL.domain + "/#/login";
                                },1000);
                            } else if(res.code == 20004) {
                                this.$message.error('抱歉，您输入的旧密码错误，请重新输入');
                            } else {
                                this.$message.error('网络异常，请稍后再试');
                            }
                        }).catch((e) => {});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loginOut() {  //退出登录
                this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    loginOuts('').then(res => {
                        if(res.code == 0) {
                            localStorage.clear();
                            this.$message({
                                type: 'success',
                                message: '您已退出登录!'
                            });
                            let that = this;
                            console.log(that.GLOBAL.domain);
                            setTimeout(function () {
                                console.log(that.GLOBAL.domain);
                                window.location.href = that.GLOBAL.domain + "/#/login";
                            },1000);
                        } else {
                            this.$message.error('网络异常，请稍后再试');
                        }
                    }).catch((e) => {});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            loginIn() {  //登录
                this.$router.push({
                    path: `/login`,
                })
            },
            handleClose(done) {
                this.$refs['passwordForm'].resetFields();
                this.passwordVisible = false;
            },
        }
    }
</script>

<style scoped lang="less">
    .header{
        height: 50px;
        background: #fff;
        padding: 10px 40px 10px 20px;
        line-height: 50px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        box-shadow: 0px 20px 20px -20px #ccc;
        .logo{
            width: 450px;
            height: 100%;
            background: linear-gradient(94deg, #1C89E8, #55A2E8);
            border-radius: 35px;
            .left{
                width: 160px;
                height: 100%;
                float: left;
                background: #fbfaff;
                border: 1px solid #1C89E8;
                border-radius: 35px;
            }
            .right{
                color: #fff;
                font-size: 24px;
                text-align: center;
            }
            .logoImg{
                width: 80%;
                margin-left: 10%;
            }
        }
        .user{
            width: 160px;
            height: 100%;
            line-height: 100%;
            background: #edf4fa;
            border-radius: 35px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            .triangle-icon{
                margin: 0 10px;
            }
        }
    }
</style>
