<template>
    <!--排课管理-->
    <div class="timeTableSet">
        <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <div v-for="a in timeTableList" v-if="data.day == a.day && timeTableList.child != [] && data.type == 'current-month'">
                    <div v-for="b in a.child">
                        <el-dropdown>
                            <el-button type="primary">
                                {{b.className}}
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    班级名称 : {{b.className}}
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    上课时间 : {{b.time}}
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    课程名称 : {{b.subName}}
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    上课老师 : {{b.teacher1}} 、 {{b.teacher2}}
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    上课教室 : {{b.classRoom}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <!--{{data}}-->
                <span class="addClass" v-if="data.type == 'current-month'">+</span>
            </template>
        </el-calendar>
        <div class="moreAddClass">
            <el-button type="primary">批量排课</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timeTableList:[
                    {
                        day:'2019-10-11',
                        num:1,
                        name:'hha',
                        child:[
                            {
                                className:'数学',
                                time:'2019-10-11 08:00 -- 2019-10-11-12:00',
                                classRoom:'在线教育部A教室',
                                subName:'智障培训',
                                subject:'第一节课',
                                teacher1:'王老师',
                                teacher2:'李老师'
                            },
                            {
                                className:'语文',
                                time:'2019-10-11 08:00 -- 2019-10-11-12:00',
                                classRoom:'在线教育部A教室',
                                subName:'智障培训',
                                subject:'第一节课',
                                teacher1:'王老师1',
                                teacher2:'李老师1'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    .timeTableSet{
        border: 1px solid #ddd;
        border-radius: 10px;
        background: #fff;
        .is-selected {
            color: #1989FA;
        }
        .addClass{
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
        .addClass:hover{
            background: #1989FA;
            transition: 0.4s;
        }
        .moreAddClass{
            margin: 0px 0 30px 20px;
        }
    }
</style>
