
import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;
/**
 * 获取排课管理列表
 */
export function getTimeTableSetList(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/list", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 跳转至排课新增页面 默认展示
 */
export function getTimeTableSetList_add(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/curriculumArrangement_add", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 排课管理新增保存
 */
export function getTimeTableSetList_save(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/save", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 编辑排课 回显
 */
export function getTimeTableSetList_edit(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/curriculumArrangement_edit", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 删除排课信息
 */
export function removeClass(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/delete",query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 批量排课 回显
 */
export function curriculumArrangement_plAdd(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/curriculumArrangement_plAdd",query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 批量排课 保存
 */
export function plSave(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/plSave",query
        , {
            headers:{
                token:token
            }
        }
    );
}
// export function aaa() {
//     return request.get("http://192.168.0.183:8080/school/menu/list_page", {
//         headers:{
//             token:token
//         }
//     });
// }
