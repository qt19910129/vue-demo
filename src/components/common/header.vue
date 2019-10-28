<template>
    <div class="header">
        <div class="logo">
            <div class="left"></div>
            <div class="right">托马斯教育管理平台</div>
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
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--更改密码弹窗-->
        <el-dialog title="修改密码" :visible.sync="passwordVisible" :modal-append-to-body="false">
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
    export default {
        data() {
            var validatePass1 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入原密码'));
                } else if(value != this.firstPass) {
                    callback(new Error('原密码输入错误，请重新输入'));
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
                firstPass:'123456',
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
                }
            };

        },
        methods: {
            submitForm(formName) {
                console.log(this.passwordForm);
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loginOut() {
                this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '您已退出登录!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .header{
        height: 50px;
        background: #fff;
        padding: 10px 40px;
        line-height: 50px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
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
