import request from "./request";
import global from "../global/global";
/**
 * 获取排课管理列表
 */
export function getTimeTableSetList(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/list", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 跳转至排课新增页面 默认展示
 */
export function getTimeTableSetList_add(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/curriculumArrangement_add", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 排课管理新增保存
 */
export function getTimeTableSetList_save(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/save", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 编辑排课 回显
 */
export function getTimeTableSetList_edit(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/curriculumArrangement_edit", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 删除排课信息
 */
export function removeClass(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/delete",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 批量排课 回显
 */
export function curriculumArrangement_plAdd(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/curriculumArrangement_plAdd",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 批量排课 保存
 */
export function plSave(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/plSave",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 科目级别列表联动
 */
export function rankChange(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/rankList",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 科目级别列表联动
 */
export function lessonChange(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/currNameList",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 批量排课验证接口
 */
export function selectRepeatPL(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/selectRepeatPL",query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}