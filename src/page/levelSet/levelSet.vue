<template>
    <div class="levelSet">
        <!--新增-->
        <div class="levelAddBox">
            <el-button type="primary" @click="">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="levelSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="subjectLevel" label="课程级别" align="center"></el-table-column>
            <el-table-column prop="levelExplain" label="级别说明" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.levelExplain == ''" class="color999">暂无级别说明</span>
                    <span v-else>{{scope.row.levelExplain}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="" align="center" prop="isAll">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" v-if="scope.row.isAll == 1">编辑</el-button>
                    <span class="color999" type="text" icon="el-icon-edit" v-if="scope.row.isAll == 2">编辑</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                levelSetData:[
                    {
                        num:1,
                        subjectLevel:'高级',
                        levelExplain:'为了成为高级智障',
                        isAll:1
                    },
                    {
                        num:2,
                        subjectLevel:'初级',
                        levelExplain:'',
                        isAll:2
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .levelSet{
        .levelAddBox{
            margin: 20px 0;
        }
    }
</style>
