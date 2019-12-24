
import request from "./request";
let domainUrl = "http://192.168.0.191:8080";
/**
 * 获取排课管理列表
 */
export function getTimeTableSetList(query) {
    return request.post(domainUrl + "/school/curriculumArrangement/list", query
        , {
            headers:{
                token:9999
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
                token:9999
            }
        }
    );
}
// export function aaa() {
//     return request.post("http://47.104.251.161:8007/m/area/getAllArea");
// }
