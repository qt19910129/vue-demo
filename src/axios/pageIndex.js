import request from "./request";
import global from "../global/global";

/**
 * 首页 总数据
 */
export function allData(query) {
    return request.post(global.domainUrl + "/school/schoolIndex/indexData", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 首页 续费学员列表数据
 */
export function renewData(query) {
    return request.post(global.domainUrl + "/school/student/payStudentList", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 首页 今日签到信息列表
 */
export function signInData(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/queryAttendance", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}
/**
 * 首页 未签到列表
 */
export function noSignData(query) {
    return request.post(global.domainUrl + "/school/curriculumArrangement/queryAttendanceStudentList", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}