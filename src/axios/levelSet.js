import request from "./request";
import global from "../global/global";


/**
 * 获取级别设置 数据列表
 */
export function getLevelList(query) {
    return request.post(global.domainUrl + "/school/dictionary/list", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 新建 级别
 */
export function saveLevel(query) {
    return request.post(global.domainUrl + "/school/dictionary/save", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 修改 级别 回显
 */
export function showLevel(query) {
    return request.post(global.domainUrl + "/school/dictionary/edit_page", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 修改 级别 保存
 */
export function saveEdit(query) {
    return request.post(global.domainUrl + "/school/dictionary/edit", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}