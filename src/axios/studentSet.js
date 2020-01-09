import request from "./request";
import global from "../global/global";


/**
 * 获取学生管理   列表
 */
export function getStudentSetList(query) {
    return request.post(global.domainUrl + "/school/student/list", query
        , {
            headers:{
                token:global.token
            }
        }
    );
}