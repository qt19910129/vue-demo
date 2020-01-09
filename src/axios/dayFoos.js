import request from "./request";
import global from "../global/global";

/**
 * 获取每日食谱 数据列表
 */
export function getDayFoodList(query) {
    return request.post(global.domainUrl + "/school/menu/list_page", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 新增菜谱
 */
export function foodSava(query) {
    return request.post(global.domainUrl + "/school/menu/save", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 菜谱列表 显示隐藏
 */
export function foodShowHide(query) {
    return request.post(global.domainUrl + "/school/menu/status", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 菜谱编辑回显
 */
export function foodEditData(query) {
    return request.post(global.domainUrl + "/school/menu/menu_edit", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}