<template>
    <div class="classRoomSet">
        <!--新增-->
        <div class="classRoomAddBox">
            <el-button type="primary" @click="addRoom()">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="classRoomSetData" border style="width: 100%;border: 1px solid #eee;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column type="index" label="ID" align="center"></el-table-column>
            <el-table-column prop="crName" label="教室名称" align="center"></el-table-column>
            <el-table-column prop="crEquipment" label="教室设备" align="center"></el-table-column>
            <el-table-column prop="accommodate" label="容纳人数" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.accommodate}}</span>人
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="editRoom(scope.row.crId)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
            <el-pagination
                    align="right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="records"
                    background
                    :hide-on-single-page="pageValue"
                    class="pages">
            </el-pagination>
        </template>
        <!--新增，编辑弹窗-->
        <el-dialog :title="editTitle" :visible.sync="roomVisible" class="roomAlert" :before-close="handleClose">
            <el-form :model="roomForm" :rules="roomRules" ref="roomForm">
                <el-form-item label="教室名称" prop="name">
                    <el-input v-model="roomForm.name" placeholder="请输入教室名称"></el-input>
                </el-form-item>
                <el-form-item label="教室设备" prop="equipment">
                    <el-input v-model="roomForm.equipment" placeholder="请输入教室设备"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNum">
                    <el-input v-model.number="roomForm.peopleNum" placeholder="请输入容纳人数"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="editForm('roomForm')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('roomForm')">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getClassRoomList,
        addClassRoom,
        editClassRoom,
        saveEdit
    } from "../../axios/classRoomSet";
    export default {
        data() {
            return {
                classRoomSetData:[],  //数据
                roomVisible:false,  //新增编辑弹窗
                roomForm: {
                    name:'',
                    equipment:'',
                    peopleNum:''
                },
                roomRules: {
                    name: [
                        { required: true, message: '请输入教室名称', trigger: 'blur' },
                    ],
                    equipment: [
                        { required: true, message: '请输入教室设备', trigger: 'blur' },
                    ],
                    peopleNum: [
                        { required: true, message: '请输入容纳人数', trigger: 'blur' },
                        { type: 'number', message: '容纳人数必须为数字值'},
                        {
                            validator(rule, value, callback) {
                                if(value < 0) {
                                    callback(new Error('容纳人数不能为负数'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                },
                currentPage:1,  //分页默认选中哪页
                records:0,  //总页数
                rows:10,  //默认每页条数
                page:1,  //默认打开第一页
                pageValue:false,  //当只有一页时 分页隐藏
                editTitle:'',   //弹出框title
                crId:'',   //保存编辑时的id
            }
        },
        mounted() {
            this.getList();  //列表数据
        },
        methods: {
            editForm(formName) {   //添加科目弹窗取消
                this.roomVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitEditForm(formName) {   //签约保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.editTitle == '新增教室') {
                            let data = {
                                'crName':this.roomForm.name,
                                'crEquipment':this.roomForm.equipment,
                                'accommodate':this.roomForm.peopleNum,
                            };
                            addClassRoom(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.roomVisible = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        } else if(this.editTitle == '编辑教室') {
                            let data = {
                                'crName':this.roomForm.name,
                                'crEquipment':this.roomForm.equipment,
                                'accommodate':this.roomForm.peopleNum,
                                'crId':this.crId
                            };
                            saveEdit(data).then(res => {
                                if(res.code == 0) {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    });
                                    this.$refs[formName].resetFields();
                                    this.roomVisible = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    },1000);
                                } else {
                                    this.$message.error('网络异常，请稍后再试');
                                }
                            }).catch((e) => {});
                        }
                    } else {
                        console.log('error submit!!');
                        this.roomVisible = true;
                        return false;
                    }
                });
            },
            getList() {  //获取列表
                let data = {
                    'rows':this.rows,
                    'page':this.page,
                };
                getClassRoomList(data).then(res => {
                    if(res.code == 0) {
                        this.records = res.data.jqGirdPage.records;
                        this.classRoomSetData = res.data.jqGirdPage.rows;
                        if(res.data.jqGirdPage.records <= 10) {  //小于10条时 隐藏分页
                            this.pageValue = true;
                        }
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            addRoom() {  //新增按钮
                this.roomVisible = true;
                this.editTitle = '新增教室';
            },
            editRoom(crId) {  //编辑回显
                this.roomVisible = true;
                this.editTitle = '编辑教室';
                this.crId = crId;
                let data = {
                    'crId':crId
                };
                editClassRoom(data).then(res => {
                    if(res.code == 0) {
                        this.roomForm.name = res.data.crName;
                        this.roomForm.equipment = res.data.crEquipment;
                        this.roomForm.peopleNum = res.data.accommodate * 1;
                    } else {
                        this.$message.error('网络异常，请稍后再试');
                    }
                }).catch((e) => {});
            },
            handleClose(done) {
                this.$refs['roomForm'].resetFields();
                this.roomVisible = false;
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.rows = `${val}`;
                this.currentPage = 1;
                this.page = 1;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = `${val}`;
                this.getList();
            },
        }
    }
</script>

<style scoped lang="less">
    .classRoomSet{
        .classRoomAddBox{
            margin: 20px 0;
        }
    }
</style>
