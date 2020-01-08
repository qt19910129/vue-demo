import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;

/**
 * 获取教师管理 数据列表
 */
export function getTeacherList(query) {
    return request.post(domainUrl + "/school/teacher/list", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理 新增
 */
export function addTeacher(query) {
    return request.post(domainUrl + "/school/teacher/add", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理 跳转查看 编辑
 */
export function editTeacher(query) {
    return request.post(domainUrl + "/school/teacher/edit_page", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理 编辑保存
 */
export function saveEdit(query) {
    return request.post(domainUrl + "/school/teacher/edit", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理 重置密码
 */
export function resetPassword(query) {
    return request.post(domainUrl + "/school/teacher/password_reset", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理详情页 课程列表
 */
export function getClassList(query) {
    return request.post(domainUrl + "/school/teacher/teachingClass", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 教师管理详情页 授课班级详情
 */
export function getTeacheringDetail(query) {
    return request.post(domainUrl + "/school/teacher/teachingClassDetail", query
        , {
            headers:{
                token:token
            }
        }
    );
}