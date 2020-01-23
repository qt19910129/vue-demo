import request from "./request";
import global from "../global/global";

/**
 * 获取学校简介 数据
 */
export function getSchoolIntroduce(query) {
    return request.post(global.domainUrl + "/school/schoolIntroduce/selectSchoolIntroduce", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}
/**
 * 保存，修改学校简介
 */
export function saveSchoolIntroduce(query) {
    return request.post(global.domainUrl + "/school/schoolIntroduce/saveSchoolIntroduce", query
        , {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );
}