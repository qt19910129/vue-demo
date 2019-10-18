<template>
    <!--每日食谱-->
    <div class="dayFood">
        <div class="switch">
            <span>提供每日食谱 : </span>
            <el-switch v-model="value2" active-text="开启" inactive-text="关闭"></el-switch>
        </div>
        <!--开启食谱 显示日历表格-->
        <el-calendar v-if="this.value2 == true">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-for="a in aa" v-if="data.day == a.day && aa.child != [] && data.type == 'current-month'">
                    <div v-for="b in a.child">
                        <span class="foodStyle" @click="goFoods(2)">{{b.food}}</span>
                    </div>
                </div>
                <!--{{data}}-->
                <span class="addFood" v-if="data.type == 'current-month'" @click="goFoods(1)">+</span>
            </template>
        </el-calendar>
        <!--关闭食谱 显示空展位图-->
        <div v-else class="foodClose">
            <span class="emptyData">我是个占位图</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value1: true,
                value2: false,
                aa:[
                    {
                        day:'2019-10-11',
                        num:1,
                        name:'hha',
                        child:[
                            {
                                food:'炒白菜',
                            },
                            {
                                food:'炒土豆',
                            },
                            {
                                food:'炒菠菜',
                            },
                            {
                                food:'白菜汤'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            goFoods(edit) {   //跳转新增修改食谱，1为新增 2为修改
                this.$router.push({
                    path: `/content/details/foods/${edit}`,
                })
            }
        },
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
        }
        .foodClose{
            min-height: 550px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: space-around;
            border-top: 1px solid #ddd;
        }
    }
</style>
