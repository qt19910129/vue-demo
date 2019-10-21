<template>
    <div class="signSet">
        <!--搜索from表单-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="5">
                    <el-form-item prop="phoneNum" class="signSetStyle">
                        <el-input v-model="ruleForm.phoneNum" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="stuName" class="signSetStyle">
                        <el-input v-model="ruleForm.stuName" placeholder="请输入孩子姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">至</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 20px;">搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="signSetMain">
            <!--新增-->
            <div class="signAddBox">
                <el-button type="primary" @click="addSignVisible = true">新增</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="signSetData" height="480" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="60px" align="center"></el-table-column>
                <el-table-column prop="studentName" label="孩子姓名" width="120" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="120" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" width="60" align="center"></el-table-column>
                <el-table-column prop="phoneNum" label="联系电话" width="" align="center"></el-table-column>
                <el-table-column prop="address" label="家庭地址" width="" align="center"></el-table-column>
                <el-table-column prop="signDate" label="报名时间" width="" align="center"></el-table-column>
                <el-table-column label="沟通记录" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="recordVisible = true">记录</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-document-checked" @click="payVisible = true">签约</el-button>
                        <el-button type="text" icon="el-icon-document-delete" @click="openNoPay()">未签约</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--新增弹窗-->
        <el-dialog title="新增用户" :visible.sync="addSignVisible" class="add">
            <el-form :model="addForm" :rules="addRules" ref="addForm">
                <el-form-item label="学生姓名" prop="stuName" :label-width="formLabelWidth">
                    <el-input v-model="addForm.stuName" autocomplete="off" placeholder="请输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="stuDate" :label-width="formLabelWidth">
                    <el-date-picker v-model="addForm.stuDate" type="date" placeholder="选择出生日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="addForm.phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="所在区域" prop="address" :label-width="formLabelWidth">
                    <el-cascader
                            v-model="addForm.address"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="家庭住址" prop="home" :label-width="formLabelWidth">
                    <el-input v-model="addForm.home" autocomplete="off" placeholder="请输入家庭住址"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                    <el-select v-model="addForm.sex" placeholder="请选择性别">
                        <el-option label="男" value="nan"></el-option>
                        <el-option label="女" value="nv"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetAddForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--记录弹窗-->
        <el-dialog title="沟通记录" :visible.sync="recordVisible">
            <el-form :model="recordForm" :rules="recordRules" ref="recordForm">
                <el-form-item label="" prop="record" :label-width="formLabelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入沟通记录" v-model="recordForm.record"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetRecordForm('recordForm')">取 消</el-button>
                <el-button type="primary" @click="submitRecordForm('recordForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--签约弹窗-->
        <el-dialog title="缴费信息" :visible.sync="payVisible" class="pay">
            <el-form :model="payForm" :rules="payRules" ref="payForm">
                <el-form-item label="缴费日期" prop="payDate" :label-width="formLabelWidth">
                    <el-date-picker v-model="payForm.payDate" type="date" placeholder="选择缴费日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="课时数" prop="payNum" :label-width="formLabelWidth">
                    <el-input v-model="payForm.payNum" autocomplete="off" placeholder="请输入课时数"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetPayForm('payForm')">取 消</el-button>
                <el-button type="primary" @click="submitPayForm('payForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }],
                ruleForm: {
                    phoneNum: '',
                    stuName: '',
                    date1: '',
                    date2: '',
                },
                rules: {
                    phoneNum: [
                        { required: true, message: '请输入用户手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    stuName: [
                        { required: true, message: '请输入孩子姓名', trigger: 'blur' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                },
                addRules:{
                    stuName: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' }
                    ],
                    stuDate: [
                        { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的11位手机号码', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请选择所在区域', trigger: 'blur' }
                    ],
                    home: [
                        { required: true, message: '请输入家庭住址', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                },
                signSetData:[
                    {
                        num:1,
                        studentName:'哇啦啦',
                        birthday:'2011-12-21',
                        sex:'女',
                        phoneNum:'14311324422',
                        address:'中关村南大街',
                        signDate:'2019-02-04 22:32:02'
                    }
                ],
                addSignVisible:false, //新增弹窗
                addForm:{
                    stuName:'',
                    stuDate:'',
                    phone:'',
                    address:[],
                    home:'',
                    sex:'',
                },
                formLabelWidth:'100px',
                recordVisible:false,  //沟通弹窗
                recordForm:{
                    record:''
                },
                recordRules:{
                    record: [
                        { required: true, message: '请输入沟通记录', trigger: 'blur' }
                    ],
                },
                payVisible:false, //签约弹窗
                payForm:{
                    payDate:'',
                    payNum:''
                },
                payRules:{
                    payDate: [
                        { type: 'date', required: true, message: '请选择缴费日期', trigger: 'change' }
                    ],
                    payNum: [
                        { required: true, message: '请输入课时数', trigger: 'blur' },
                        { type: 'number', message: '请输入正确的课时数'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {  //搜索
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitAddForm(formName) {   //新增
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.$refs[formName].resetFields();
                        this.addSignVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.addSignVisible = true;
                        return false;
                    }
                });
            },
            resetAddForm(formName) {  //新增取消
                this.addSignVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            handleChange(value) {  //城市联动
                console.log(value);
            },
            resetRecordForm(formName) {  //沟通记录取消
                this.recordVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitRecordForm(formName) {   //沟通记录保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.$refs[formName].resetFields();
                        this.recordVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.recordVisible = true;
                        return false;
                    }
                });
            },
            resetPayForm(formName) {   //签约弹窗取消
                this.payVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitPayForm(formName) {   //签约保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.payVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.payVisible = true;
                        return false;
                    }
                });
            },
            openNoPay() {  //未签约用户
                this.$confirm('此操作将设定用户未签约, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .signSet{
        .signAddBox{
            margin: 20px 0;
        }
    }
</style>
