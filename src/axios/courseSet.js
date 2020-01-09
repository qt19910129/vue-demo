import request from "./request";
import global from "../global/global";

/**
 * 获取教师管理 数据列表
 */
export function getCourseList(query) {
    return request.post(global.domainUrl + "/school/curriculum/list", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 新增保存课程
 */
export function addCourse(query) {
    return request.post(global.domainUrl + "/school/curriculum/save", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 编辑课程回显
 */
export function editCourse(query) {
    return request.post(global.domainUrl + "/school/curriculum/edit_page", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 编辑课程保存
 */
export function editSave(query) {
    return request.post(global.domainUrl + "/school/curriculum/edit", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}