<template>
    <div class="schoolIntroduce">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学校主图" prop="name">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="联系人" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNum">
                <el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="详细介绍" prop="ueditor">
                <Uediter :value="ruleForm.ueditor.value" :config="ruleForm.ueditor.config" ref="ue"></Uediter>
                <!--<button @click="returnContent">显示编辑器内容</el-button>-->
                <div>{{dat.content}}</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Uediter from '../../components/UE/UE.vue';
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    phoneNum: '',
                    address:'',
                    ueditor: {
                        value: '',
                        config: {
                            initialFrameWidth: '80%',
                            initialFrameHeight: 320
                        }
                    },
                },
                rules: {
                    name: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                    ],
                    phoneNum: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ]
                },
                fileList: [],

                dat: {
                    content: ''
                },
                imageUrl: []
            }
        },
        methods: {
            handleRemove(file, fileList) {
                for(var i = 0; i < this.imageUrl.length; i++) {
                    if(file.url == this.imageUrl[i]) {
                        this.imageUrl.splice(i,1);
                    }
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl.push(file.url);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPng) {
                    this.$message.error('图片只能是 JPG/PNG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false;
                }
                // return (isJPG || isPng) && isLt2M;

            },
            submitForm(formName) {
                //获取UE编辑内容
                this.dat.content = this.$refs.ue.getUEContent();

                if(this.imageUrl.length < 1) {
                    this.imgEmpty();
                } else if(this.dat.content == '') {
                    this.ueEmpty();
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            alert('submit!');
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            ueEmpty() {
                this.$message({
                    message: '请输入详细介绍',
                    type: 'warning'
                });
            },
            imgEmpty() {
                this.$message({
                    message: '请选择学校主图',
                    type: 'warning'
                });
            },
        },
        components: {
            Uediter
        },
    }
</script>

<style scoped lang="less">
    .schoolIntroduce{

    }
</style>
