import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;
/**
 * 获取科目设置 数据列表
 */
export function getSubjectList(query) {
    return request.post(domainUrl + "/school/dictionary/list", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 新增科目设置
 */
export function addSubject(query) {
    return request.post(domainUrl + "/school/dictionary/save", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 编辑科目 回显
 */
export function editShow(query) {
    return request.post(domainUrl + "/school/dictionary/edit_page", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 编辑科目 保存
 */
export function editSave(query) {
    return request.post(domainUrl + "/school/dictionary/edit", query
        , {
            headers:{
                token:token
            }
        }
    );
}