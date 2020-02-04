<template>
    <!--每日食谱-->
    <div class="dayFood">
        <div class="switch">
            <span>提供每日食谱 : </span>
            <el-switch v-model="showHide" active-text="开启" inactive-text="关闭" @change="foodSwitch()"></el-switch>
        </div>
        <!--开启食谱 显示日历表格-->
        <el-calendar v-model="value">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-for="a in dayFoodList" v-if="data.day == a.mDate && dayFoodList.child != [] && data.type == 'current-month'">
                    <div v-for="b in a.child">
                        <span class="foodStyle" @click="goFoods(2,a.mDate,b.mId,b.menuEndtime)">{{b.mName}}</span>
                    </div>
                </div>
                <!--{{data}}-->
                <span class="addFood" v-if="data.type == 'current-month'" @click="goFoods(1,data.day,-1,data.day)">+</span>
            </template>
        </el-calendar>
    </div>
</template>

<script>
    import {
        getDayFoodList,
        foodShowHide
    } from "../../axios/dayFoos";
    export default {
        data() {
            return {
                showHide: false,
                dayFoodList:[],
                value: new Date(),
                year:'',
                mounth:'',
                dates:'',
            }
        },
        mounted() {

        },
        methods:{
            getremarksList(val) {  //数据列表
                let date;
                if (val) {
                    date = new Date(val)
                } else {
                    date = new Date()
                }
                this.year = date.getFullYear();
                this.mounth = date.getMonth() + 1;
                if(this.mounth < 10) {
                    this.mounth = '0' + this.mounth;
                }
                this.dates = date.getDate();
                let m_date = this.year + '-' + this.mounth;
                let data = {
                    'm_date':m_date
                };
                //获取排课日期数据列表
                getDayFoodList(data).then(res => {
                    // console.log(res.data);
                    this.dayFoodList = res.data.mList;
                    if(res.data.show == 1) {  //隐藏
                        this.showHide = false;
                    } else if(res.data.show == 0) {
                        this.showHide = true;
                    }
                }).catch((e) => {});
            },
            goFoods(edit,today,mId,menuEndtime) {   //跳转新增修改食谱，1为新增 2为修改
                let nowTime = new Date().getTime();
                if(menuEndtime.length == 10) {
                    menuEndtime = menuEndtime + ' 23:59'
                }
                let startTime = new Date(menuEndtime).getTime();
                if(startTime > nowTime) {
                    if(edit == 1) {
                        this.$router.push({
                            path: `/content/details/foods/${edit}`, query: { dates: today },
                        });
                    } else if(edit == 2) {
                        this.$router.push({
                            path: `/content/details/foods/${edit}`, query: { dates: today,mId: mId },
                        });
                    }
                } else {
                    this.$message({
                        message: '当前时间大于您需要添加/修改的时间，不能执行此操作',
                        type: 'warning'
                    });
                }
            },
            foodSwitch() {  //控制显示隐藏
                foodShowHide().then(res => {
                    if(res.code == 0) {
                        if(res.data == 1) {
                            this.success1();
                        } else if(res.data == 0) {
                            this.success2();
                        }
                    } else {
                        this.error();
                    }
                }).catch((e) => {});
            },
            error() {  //创建失败
                this.$message.error('网络异常，请稍后再试');
            },
            success1() {  //隐藏成功
                this.$message({
                    message: '已关闭食谱',
                    type: 'success'
                });
            },
            success2() {  //显示成功
                this.$message({
                    message: '已开启食谱',
                    type: 'success'
                });
            },
        },
        created() {
            this.getremarksList();
        },
        watch: {
            value: function(val, oldVal) {
                let time = new Date(val);
                let time2 = new Date(oldVal);
                if (time2.getMonth() != time.getMonth()) {
                    this.getremarksList(val);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .dayFood{
        border: 1px solid #ddd;
        border-radius: 10px;
        background: #fff;
        padding: 20px;
        .switch{
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 20px;
        }
        .addFood{
            position: absolute;
            right: 20px;
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            color: #fff;
            background: #409EFF;
            cursor: pointer;
            top: 20px;
        }
        .addFood:hover{
            background: #1989FA;
            transition: 0.4s;
        }
        .foodStyle{
            display: inline-block;
            border: 1px solid #1C89E8;
            background: none;
            color: #1C89E8;
            border-radius: 20px;
            padding: 8px 10px;
            margin: 10px auto 0 auto;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            font-size: 12px;
            line-height: 12px;
            cursor: pointer;
            word-break: break-word;
        }
    }
</style>
