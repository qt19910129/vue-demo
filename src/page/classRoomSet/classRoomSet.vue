<template>
    <div class="classRoomSet">
        <!--新增-->
        <div class="classRoomAddBox">
            <el-button type="primary" @click="">新增</el-button>
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
                <el-button type="text" icon="el-icon-edit">编辑</el-button>
            </el-table-column>
        </el-table>
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
                ]
            }
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
