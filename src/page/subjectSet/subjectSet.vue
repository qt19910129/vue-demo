<template>
    <div class="subjectSet">
        <!--新增-->
        <div class="subjectAddBox">
            <el-button type="primary" @click="">新增</el-button>
        </div>
        <!--数据表格-->
        <el-table :data="subjectSetData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 16px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
            <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
            <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
            <el-table-column prop="subjectExplain" label="课程级别" align="center"></el-table-column>
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
                subjectSetData:[
                    {
                        num:1,
                        subjectName:'语文',
                        subjectExplain:'快速成为智障',
                        isAll:1
                    },
                    {
                        num:2,
                        subjectName:'语文',
                        subjectExplain:'快速成为智障',
                        isAll:2
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .subjectSet{
        .subjectAddBox{
            margin: 20px 0;
        }
    }
</style>
