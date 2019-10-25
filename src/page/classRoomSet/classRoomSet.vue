<template>
    <div class="classRoomSet">
        <!--新增-->
        <div class="classRoomAddBox">
            <el-button type="primary" @click="roomVisible = true">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="classRoomSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="classRoomName" label="教室名称" align="center"></el-table-column>
            <el-table-column prop="equipment" label="教室设备" align="center"></el-table-column>
            <el-table-column prop="peoples" label="容纳人数" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.peoples}}</span>人
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center">
                <el-button type="text" icon="el-icon-edit" @click="roomVisible = true">编辑</el-button>
            </el-table-column>
        </el-table>
        <!--新增，编辑弹窗-->
        <el-dialog title="新增教室" :visible.sync="roomVisible" class="roomAlert">
            <el-form :model="roomForm" :rules="roomRules" ref="roomForm">
                <el-form-item label="教室名称" prop="name">
                    <el-input v-model="roomForm.name" placeholder="请输入教室名称"></el-input>
                </el-form-item>
                <el-form-item label="教室设备" prop="equipment">
                    <el-input v-model="roomForm.equipment" placeholder="请输入教室设备"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNum">
                    <el-input v-model="roomForm.peopleNum" placeholder="请输入容纳人数"></el-input>
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
    export default {
        data() {
            return {
                classRoomSetData:[
                    {
                        num:1,
                        classRoomName:'A教室',
                        equipment:'电视机',
                        peoples:'22',
                    },
                    {
                        num:2,
                        classRoomName:'B教室',
                        equipment:'电视机',
                        peoples:'123',
                    }
                ],
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
                    ],
                }
            }
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
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.roomVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.roomVisible = true;
                        return false;
                    }
                });
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
