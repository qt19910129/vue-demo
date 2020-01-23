import request from "./request";
import global from "../global/global";

/**
 * 获取校区公告列表
 */
export function getSchoolNoticeList(query) {
    return request.post(global.domainUrl + "/school/schoolNotice/list", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 发布校区公告
 */
export function saveSchoolNotice(query) {
    return request.post(global.domainUrl + "/school/schoolNotice/saveSchoolNotice", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 删除校区公告
 */
export function deleteSchoolNotice(query) {
    return request.post(global.domainUrl + "/school/schoolNotice/removeSchoolNotice", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}