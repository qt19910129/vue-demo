import request from "./request";
import global from "../global/global";
/**
 * 获取科目设置 数据列表
 */
export function getSubjectList(query) {
    return request.post(global.domainUrl + "/school/dictionary/list", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 新增科目设置
 */
export function addSubject(query) {
    return request.post(global.domainUrl + "/school/dictionary/save", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 编辑科目 回显
 */
export function editShow(query) {
    return request.post(global.domainUrl + "/school/dictionary/edit_page", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 编辑科目 保存
 */
export function editSave(query) {
    return request.post(global.domainUrl + "/school/dictionary/edit", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}