<template>
    <div class="seeGoods">
        <!--返回首页-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/content/pageIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>物品管理</el-breadcrumb-item>
            <el-breadcrumb-item>物品详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <div class="tit">物品信息</div>
            <div class="goods">
                <el-row style="height: auto;">
                    <el-col :span="6" class="tableName" style="height: 200px;line-height: 200px;">物品图片</el-col>
                    <el-col :span="6" style="height: 200px;">
                        <el-popover
                                placement="right"
                                title=""
                                trigger="click">
                            <el-image slot="reference" :src="url" :alt="url" style="height: 180px;width: 180px;margin-top: 10px;cursor: pointer;"></el-image>
                            <el-image :src="url"></el-image>
                        </el-popover>
                    </el-col>
                    <el-col :span="6" class="tableName" style="height: 200px;line-height: 200px;">物品名称</el-col>
                    <el-col :span="6" style="height: 200px;line-height: 200px;">笔袋</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">物品分类</el-col>
                    <el-col :span="6">文具</el-col>
                    <el-col :span="6" class="tableName">物品总数</el-col>
                    <el-col :span="6">1000</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">物品库存</el-col>
                    <el-col :span="6">200</el-col>
                    <el-col :span="6" class="tableName">已消耗数</el-col>
                    <el-col :span="6">800</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">采购价格</el-col>
                    <el-col :span="6">100</el-col>
                    <el-col :span="6" class="tableName">零售价格</el-col>
                    <el-col :span="6">200</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tableName">是否积分</el-col>
                    <el-col :span="6">是</el-col>
                    <el-col :span="6" class="tableName">所需积分</el-col>
                    <el-col :span="6">30</el-col>
                </el-row>
            </div>
            <div class="tit">领用信息</div>
            <!--数据表格-->
            <el-table :data="goodsDetailData" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="user" label="领取用户" align="center"></el-table-column>
                <el-table-column prop="state" label="领取类型" align="center"></el-table-column>
                <el-table-column prop="num" label="领取数量" align="center"></el-table-column>
                <el-table-column prop="point" label="使用积分数" align="center"></el-table-column>
                <el-table-column prop="time" label="领取时间" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url:'http://i1.sinaimg.cn/ent/d/2008-06-04/U105P28T3D2048907F326DT20080604225106.jpg',
                goodsDetailData: [
                    {
                        user:'王老师',
                        state:'领取',
                        num:'30',
                        point:'0',
                        time:'2019-06-06'
                    }
                ]
            }
        },
    }
</script>

<style scoped lang="less">
    .seeGoods{
        .main{
            padding: 20px;
            background: #fff;
            margin-top: 20px;
            .tit{
                font-size: 18px;
                line-height: 18px;
                margin: 20px 0;
            }
            .tableName{
                background: #E8EEF3;
            }
            .el-col-6,.el-col-18{
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #ddd;
                button{
                    margin-left: 10px;
                }
            }
        }
    }
</style>