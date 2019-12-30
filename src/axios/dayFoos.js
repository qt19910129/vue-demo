import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
let token = 9999;

/**
 * 获取每日食谱 数据列表
 */
export function getDayFoodList(query) {
    return request.post(domainUrl + "/school/menu/list_page", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 新增菜谱
 */
export function foodSava(query) {
    return request.post(domainUrl + "/school/menu/save", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 菜谱列表 显示隐藏
 */
export function foodShowHide(query) {
    return request.post(domainUrl + "/school/menu/status", query
        , {
            headers:{
                token:token
            }
        }
    );
}
/**
 * 菜谱编辑回显
 */
export function foodEditData(query) {
    return request.post(domainUrl + "/school/menu/menu_edit", query
        , {
            headers:{
                token:token
            }
        }
    );
}