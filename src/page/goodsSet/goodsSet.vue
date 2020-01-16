<template>
    <div class="goodsSet">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="state">
                        <el-select v-model="ruleForm.state" placeholder="请选择物品分类">
                            <el-option label="文具类" value="1"></el-option>
                            <el-option label="玩具类" value="2"></el-option>
                            <el-option label="教具类" value="3"></el-option>
                            <el-option label="教材类" value="4"></el-option>
                            <el-option label="课外书籍" value="5"></el-option>
                            <el-option label="其他" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入物品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="goodsMain">
            <!--新增-->
            <div class="classAddBox">
                <el-button type="primary" @click="addGoods()">新增</el-button>
            </div>
            <!--表格-->
            <el-table :data="goodsData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}">
                <el-table-column type="index" label="ID" width="" align="center"></el-table-column>
                <el-table-column prop="name" label="物品名称" align="center"></el-table-column>
                <el-table-column prop="state" label="物品分类" align="center"></el-table-column>
                <el-table-column prop="goodsNum" label="物品总数" align="center"></el-table-column>
                <el-table-column prop="goodsHave" label="物品库存" align="center"></el-table-column>
                <el-table-column prop="buyPrice" label="采购价格" align="center"></el-table-column>
                <el-table-column prop="onePrice" label="零售价格" align="center"></el-table-column>
                <el-table-column prop="used" label="已消耗" align="center"></el-table-column>
                <el-table-column label="可使用积分" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.exchange == true">是</span>
                        <span v-if="scope.row.exchange == false">否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="exchangeNum" label="所需积分数" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.exchange == true">{{scope.row.exchangeNum}}</span>
                        <span v-if="scope.row.exchange == false">无</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-finished" @click="collarUse()">领用</el-button>
                        <el-button type="text" icon="el-icon-view" @click="goGoodsDetail(scope.row.goodsId)">查看</el-button>
                        <el-button type="text" icon="el-icon-folder-add" @click="goodsSave()">续存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增编辑弹窗-->
        <el-dialog title="添加物品" :visible.sync="addGoodsVisible" append-to-body class="addGoodsProp">
            <el-form :inline="true" :model="goodsForm" ref="goodsForm" :rules="goodsRules" class="demo-form-inline">
                <div>
                    <el-form-item>
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :file-list="goodsImg"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :class="{hide:hideUpload}"
                                :on-success="handleAvatarSuccess"
                                accept="image/*"
                                :limit="1">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" append-to-body class="showImg">
                            <img width="100%" :src="showImg" alt="">
                        </el-dialog>
                    </el-form-item>
                </div>
                <el-form-item prop="state">
                    <el-select v-model="goodsForm.state" placeholder="请选择物品分类">
                        <el-option label="文具类" value="1"></el-option>
                        <el-option label="玩具类" value="2"></el-option>
                        <el-option label="教具类" value="3"></el-option>
                        <el-option label="教材类" value="4"></el-option>
                        <el-option label="课外书籍" value="5"></el-option>
                        <el-option label="其他" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="goodsForm.name" placeholder="请输入物品名称"></el-input>
                </el-form-item>
                <el-form-item prop="price">
                    <el-input v-model.number="goodsForm.price" placeholder="请输入采购价格"></el-input>
                </el-form-item>
                <el-form-item prop="retailPrice">
                    <el-input v-model.number="goodsForm.retailPrice" placeholder="请输入零售价格"></el-input>
                </el-form-item>
                <el-form-item prop="stock">
                    <el-input v-model.number="goodsForm.stock" placeholder="请输入物品库存"></el-input>
                </el-form-item>
                <el-form-item prop="points" v-if="goodsForm.exchange == true">
                    <el-input v-model.number="goodsForm.points" placeholder="请输入使用积分数"></el-input>
                </el-form-item>
                <div class="exchange">
                    <el-form-item label="支持积分兑换" prop="exchange">
                        <el-switch v-model="goodsForm.exchange"></el-switch>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetgoodsForm('goodsForm')">取 消</el-button>
                <el-button type="primary" @click="submitgoodsForm('goodsForm')">保 存</el-button>
            </div>
        </el-dialog>
        <!--领用弹窗-->
        <el-dialog title="物品领用" :visible.sync="collarUseVisible" append-to-body class="collarForm">
            <el-form :model="collarForm" ref="collarForm" :rules="collarRules" class="demo-form-inline">
                <el-form-item prop="useNum">
                    <el-input v-model.number="collarForm.useNum" placeholder="请输入领用数量"></el-input>
                </el-form-item>
                <el-form-item prop="teacherClass">
                    <el-radio-group v-model="collarForm.teacherClass">
                        <el-radio label="老师"></el-radio>
                        <el-radio label="班级"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="changeTeacher" v-if="collarForm.teacherClass == '老师'">
                    <el-select v-model="collarForm.changeTeacher" placeholder="请选择老师">
                        <el-option label="王老师" value="shanghai"></el-option>
                        <el-option label="李老师" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="changeClass" v-if="collarForm.teacherClass == '班级'">
                    <el-select v-model="collarForm.changeClass" placeholder="请选择班级">
                        <el-option label="A班级" value="a"></el-option>
                        <el-option label="B班级" value="b"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetcollarForm('collarForm')">取 消</el-button>
                <el-button type="primary" @click="submitcollarForm('collarForm')">保 存</el-button>
            </div>
        </el-dialog>
        <!--续存弹窗-->
        <el-dialog title="物品续存" :visible.sync="goodsSaveVisible" append-to-body class="goodsSaveForm">
            <el-form :model="saveForm" ref="saveForm" :rules="saveRules" class="demo-form-inline">
                <el-form-item prop="num">
                    <el-input v-model.number="saveForm.num" placeholder="请输入续存物品数量"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetsaveForm('saveForm')">取 消</el-button>
                <el-button type="primary" @click="submitsaveForm('saveForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {  //查询
                    state: '',
                    name: '',
                },
                rules: {   //查询规则
                    state: [
                        { required: true, message: '请选择物品分类', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入物品名称', trigger: 'blur' },
                    ],
                },
                addGoodsVisible:false,  //新增弹窗
                goodsForm: {  //新增
                    goodsImg:'',
                    state:'',
                    name:'',
                    price:'',
                    retailPrice:'',
                    stock:'',
                    exchange:false,
                    points:''
                },
                goodsRules: {  //新增规则
                    goodsImg: [
                        { required: true, message: '请上传物品图片', trigger: 'change' },
                    ],
                    state: [
                        { required: true, message: '请选择物品分类', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入物品名称', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入采购价格'},
                        { type: 'number', message: '采购价格必须为数字值'}
                    ],
                    retailPrice: [
                        { required: true, message: '请输入零售价格'},
                        { type: 'number', message: '零售价格必须为数字值'}
                    ],
                    stock: [
                        { required: true, message: '请输入物品库存'},
                        { type: 'number', message: '物品库存必须为数字值'}
                    ],
                    points: [
                        { required: true, message: '请输入使用积分数'},
                        { type: 'number', message: '使用积分数必须为数字值'}
                    ]
                },
                dialogVisible: false,  //上传图片预览窗
                goodsImg:[],
                imageUrl:[],  //盛放图片的容器
                showImg:'',  //点击放大图片
                goodsData: [
                    {
                        name:'铅笔',
                        state:'文具类',
                        goodsNum:'100',
                        goodsHave:'50',
                        buyPrice:'200',
                        onePrice:'10',
                        used:'50',
                        exchange:true,
                        exchangeNum:'10',
                        goodsId:22
                    },
                    {
                        name:'电脑',
                        state:'文具类',
                        goodsNum:'100',
                        goodsHave:'50',
                        buyPrice:'200',
                        onePrice:'10',
                        used:'50',
                        exchange:false,
                        exchangeNum:'10',
                        goodsId:33
                    }
                ],
                collarUseVisible:false,  //物品领用弹窗
                collarForm: {  //领用form
                    useNum:'',
                    teacherClass:'老师',
                    changeTeacher:'',
                    changeClass:''
                },
                collarRules: {   //领用规则
                    useNum: [
                        { required: true, message: '请输入领用数量'},
                        { type: 'number', message: '领用数量必须为数字值'}
                    ],
                    teacherClass: [
                        { required: true, message: '请选择老师或者班级', trigger: 'change' }
                    ],
                    changeTeacher: [
                        { required: true, message: '请选择老师', trigger: 'change' }
                    ],
                    changeClass: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                },
                goodsSaveVisible:false,  //物品续存弹窗
                saveForm: {
                    num:''
                },
                saveRules: {
                    num: [
                        { required: true, message: '请输入续存物品数量'},
                        { type: 'number', message: '续存物品数量必须为数字值'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addGoods() {  //新增物品按钮
                this.addGoodsVisible = true;  //展开弹窗
            },
            handleRemove(file, fileList) {
                for(var i = 0; i < this.imageUrl.length; i++) {
                    if(file.url == this.imageUrl[i]) {
                        this.imageUrl.splice(i,1);
                    }
                }
            },
            handlePictureCardPreview(file) {
                this.showImg = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl.push(file.url);
            },
            resetgoodsForm(formName) {   //新增弹窗取消
                this.addGoodsVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitgoodsForm(formName) {   //新增保存
                if(this.imageUrl.length == 0) {
                    this.$message({
                        message: '请上传物品图片',
                        type: 'warning'
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            this.$refs[formName].resetFields();
                            this.addGoodsVisible = false;
                        } else {
                            console.log('error submit!!');
                            this.addGoodsVisible = true;
                            return false;
                        }
                    });
                }
            },
            collarUse() {  //领用弹窗
                this.collarUseVisible = true;
            },
            resetcollarForm(formName) {  //领用弹窗取消
                this.collarUseVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitcollarForm(formName) {  //领用弹窗提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.collarUseVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.collarUseVisible = true;
                        return false;
                    }
                });
            },
            goodsSave() {
                this.goodsSaveVisible = true;  //续存物品弹窗
            },
            resetsaveForm(formName) {
                this.goodsSaveVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitsaveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.goodsSaveVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.goodsSaveVisible = true;
                        return false;
                    }
                });
            },
            goGoodsDetail(goodsId) {  //跳转查看物品详情页
                this.$router.push({
                    path: `/content/goodsSet/seeGoods/${goodsId}`,
                })
            }
        },
        computed: {
            hideUpload:function () {
                if(this.imageUrl.length >0) {
                    return true
                } else {
                    return false
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .goodsSet{
        .classAddBox{
            margin: 20px 0;
        }
    }
</style>