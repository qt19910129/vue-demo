import request from "./request";
import global from "../global/global";

/**
 * 获取教室 数据列表
 */
export function getClassRoomList(query) {
    return request.post(global.domainUrl + "/school/classRoom/list", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 新增教室
 */
export function addClassRoom(query) {
    return request.post(global.domainUrl + "/school/classRoom/saveClassRoom", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 教室编辑回显
 */
export function editClassRoom(query) {
    return request.post(global.domainUrl + "/school/classRoom/selectClassRoomById", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 教室编辑保存
 */
export function saveEdit(query) {
    return request.post(global.domainUrl + "/school/classRoom/updateClassRoom", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}