<template>
    <div class="schoolNotice">
        <!--搜索-->
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-form-inline">
            <el-row>
                <el-col :span="6">
                    <el-form-item prop="noticeName">
                        <el-input v-model="ruleForm.noticeName" placeholder="请输入公告标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--新增及表格-->
        <div class="schoolNoticeMain">
            <!--新增-->
            <div class="noticeAddBox">
                <el-button type="primary" @click="noticeVisible = true">发布</el-button>
            </div>
            <!--数据表格-->
            <el-table :data="noticeData" height="650" border style="width: 100%;border: 2px solid #ccc;font-size: 14px;" :header-cell-style="{background:'#53A1E8',color:'#fff'}" class="signTable">
                <el-table-column prop="num" label="序号" width="100px" align="center"></el-table-column>
                <el-table-column prop="noticeName" label="公告标题" width="160" align="center"></el-table-column>
                <el-table-column prop="noticeTime" label="发布时间" width="" align="center"></el-table-column>
                <el-table-column prop="noticePeople" label="指定群体" width="" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新增弹窗-->
        <el-dialog title="新增公告" :visible.sync="noticeVisible">
            <el-form :model="addNoticeForm" :rules="addNoticeRules" ref="addNoticeForm" label-width="100px">
                <el-form-item label="指定群体" prop="group">
                    <el-checkbox-group v-model="addNoticeForm.group">
                        <el-checkbox label="老师端" name="type"></el-checkbox>
                        <el-checkbox label="学生端" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="addNoticeForm.title"></el-input>
                </el-form-item>
                <el-form-item label="详细介绍" prop="content">
                    <el-card style=" width: 100%;height: 300px;">
                        <quill-editor v-model="addNoticeForm.content" ref="addNoticeForm.content" style="height:170px;width: 100%;" :options="editorOption">
                            <!-- 自定义toolar -->
                            <div id="toolbar" slot="toolbar">
                                <!-- Add a bold button -->
                                <button class="ql-bold" title="加粗">Bold</button>
                                <button class="ql-italic" title="斜体">Italic</button>
                                <button class="ql-underline" title="下划线">underline</button>
                                <button class="ql-strike" title="删除线">strike</button>
                                <button class="ql-blockquote" title="引用"></button>
                                <button class="ql-code-block" title="代码"></button>
                                <button class="ql-header" value="1" title="标题1"></button>
                                <button class="ql-header" value="2" title="标题2"></button>
                                <!--Add list -->
                                <button class="ql-list" value="ordered" title="有序列表"></button>
                                <button class="ql-list" value="bullet" title="无序列表"></button>
                                <!-- Add font size dropdown -->
                                <select class="ql-header" title="段落格式">
                                    <option selected>段落</option>
                                    <option value="1">标题1</option>
                                    <option value="2">标题2</option>
                                    <option value="3">标题3</option>
                                    <option value="4">标题4</option>
                                    <option value="5">标题5</option>
                                    <option value="6">标题6</option>
                                </select>
                                <select class="ql-size" title="字体大小">
                                    <option value="10px">10px</option>
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px" selected>16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                </select>
                                <select class="ql-font" title="字体">
                                    <option value="SimSun">宋体</option>
                                    <option value="SimHei">黑体</option>
                                    <option value="Microsoft-YaHei">微软雅黑</option>
                                    <option value="KaiTi">楷体</option>
                                    <option value="FangSong">仿宋</option>
                                    <option value="Arial">Arial</option>
                                </select>
                                <!-- Add subscript and superscript buttons -->
                                <select class="ql-color" value="color" title="字体颜色"></select>
                                <select class="ql-background" value="background" title="背景颜色"></select>
                                <select class="ql-align" value="align" title="对齐"></select>
                                <button class="ql-clean" title="还原"></button>
                                <!-- You can also add your own -->
                            </div>
                        </quill-editor>
                    </el-card>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="reNoticeForm('addNoticeForm')" class="btns">取 消</el-button>
                <el-button type="primary" @click="submitNoticeForm('addNoticeForm')" class="btns">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        Quill,
        quillEditor
    } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import '../../assets/font.css'
    // 自定义字体大小
    let Size = Quill.import('attributors/style/size')
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
    Quill.register(Size, true);
    // 自定义字体类型
    var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
        '宋体', '黑体'
    ]
    var Font = Quill.import('formats/font')
    Font.whitelist = fonts
    Quill.register(Font, true)
    export default {
        data() {
            return {
                ruleForm: {
                    noticeName: '',
                },
                rules: {
                    noticeName: [
                        { required: true, message: '请输入公告标题', trigger: 'blur' },
                    ],
                },
                noticeData:[
                    {
                        num:1,
                        noticeName:'一直变智障吧',
                        noticeTime:'2019-03-06',
                        noticePeople:'小学生',
                    },
                ],
                noticeVisible: false,  //新增弹窗
                addNoticeForm: {
                    group:[],
                    title:'',
                    content:''
                },
                addNoticeRules: {
                    group: [
                        { type: 'array', required: true, message: '请至少选择一个指定群体', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入公告标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入公告详情', trigger: 'blur' }
                    ],
                },
                editorOption: {
                    placeholder: "请输入",
                    theme: "snow", // or 'bubble'
                    modules: {
                        toolbar: {
                            container: '#toolbar'
                        }
                    }
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
            reNoticeForm(formName) {   //添加课时弹窗取消
                this.noticeVisible = false;
                this.$refs[formName].resetFields();
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            },
            submitNoticeForm(formName) {   //签约保存
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        });
                        this.$refs[formName].resetFields();
                        this.noticeVisible = false;
                    } else {
                        console.log('error submit!!');
                        this.noticeVisible = true;
                        return false;
                    }
                });
            },
        },
        components: {
            quillEditor
        },
    }
</script>

<style scoped lang="less">
    .schoolNotice{
        .noticeAddBox{
            margin: 20px 0;
        }
    }
</style>
