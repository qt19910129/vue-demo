import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;

/**
 * 获取教师管理 数据列表
 */
export function getCourseList(query) {
    return request.post(domainUrl + "/school/curriculum/list", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 新增保存课程
 */
export function addCourse(query) {
    return request.post(domainUrl + "/school/curriculum/save", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 编辑课程回显
 */
export function editCourse(query) {
    return request.post(domainUrl + "/school/curriculum/edit_page", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 编辑课程保存
 */
export function editSave(query) {
    return request.post(domainUrl + "/school/curriculum/edit", query
        , {
            headers:{
                token:token
            }
        }
    );
}